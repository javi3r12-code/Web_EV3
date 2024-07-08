from django.shortcuts import render, redirect, get_object_or_404
from .models import Producto, Compra, ProductoCompra
from .forms import ProductoForm, UpdateProductoForm, UserForm, LoginForm, ContactForm
from django.shortcuts import get_object_or_404, redirect
from django.conf import settings
from django.contrib import messages
from os import path, remove
from django.contrib.auth import authenticate, login, logout
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.http import HttpResponse
from django.urls import reverse
from django.db.models import Q
import requests
# Create your views here.



def registrar(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            # Redirigir a alguna página de éxito o hacer alguna otra acción
            return redirect('registrar')
    else:
        form = UserForm()
    return render(request, 'registro.html', {'form': form})

def ingresar(request):
    if request.method == 'POST':
        form = LoginForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('indexp')  # Redirigir a la página principal después de iniciar sesión
            else:
                form.add_error(None, "Nombre de usuario o contraseña incorrectos.")
    else:
        form = LoginForm()
    return render(request, 'ingresar.html', {'form': form})

def cerrar_sesion(request):
    logout(request)
    messages.success(request, 'Has cerrado sesión correctamente.')
    return redirect('indexp')  # Redirige a la página de inicio u otra página deseada después de cerrar sesión


from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Q
import requests
from .models import Producto

def indexp(request):
    try:
        # Obtener el carrito de la sesión del usuario
        carrito = request.session.get('carrito', {})
        
        # Calcular el total del carrito en CLP
        total_clp = sum(item['precio'] * item['cantidad'] for item in carrito.values())

        # Obtener todos los productos
        productos = Producto.objects.all()

        # Obtener el término de búsqueda si está presente en la solicitud GET
        buscar = request.GET.get('buscar')
        resultados = None  # Definir resultados inicialmente como None

        if buscar:
            resultados = productos.filter(
                Q(nombre__icontains=buscar) |  # Filtrar por nombre que contenga el término de búsqueda
                Q(descripcion__icontains=buscar)  # Filtrar por descripción que contenga el término de búsqueda
            )

        # Consumir la API y obtener los datos
        url = 'https://mindicador.cl/api'
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()  # Convertir la respuesta a JSON

            # Calcular los totales en las diferentes divisas
            tasas = {
                'clp': 1,  # La tasa para CLP es 1 (CLP/CLP)
                'usd': 1 / data['dolar']['valor'],  # Convertir de CLP a USD
                'eur': 1 / data['euro']['valor'],  # Convertir de CLP a EUR
                'uf': data['uf']['valor']  # La tasa para UF es directamente en CLP/UF
            }

            total_usd = total_clp * tasas['usd']
            total_eur = total_clp * tasas['eur']
            total_uf = total_clp / tasas['uf']

            context = {
                'productos': productos,
                'carrito': carrito,
                'total_clp': total_clp,
                'total_usd': total_usd,
                'total_eur': total_eur,
                'total_uf': total_uf,
                'buscar': buscar,  # Pasar el término de búsqueda al contexto
                'resultados': resultados,  # Pasar resultados al contexto
                'tasas': tasas  # Pasar las tasas al contexto
            }

            return render(request, 'indexp.html', context)
        else:
            return HttpResponse(f'Error al obtener datos de la API: {response.status_code}')

    except Exception as e:
        # Manejar otras excepciones si es necesario
        return HttpResponse(f"Error: {str(e)}")


def agregar_al_carrito(request, producto_id):
    producto = get_object_or_404(Producto, idProducto=producto_id)
    
    if request.method == 'POST':
        cantidad = int(request.POST.get('cantidad', 1))
        
        carrito = request.session.get('carrito', {})
        
        if str(producto_id) in carrito:
            carrito[str(producto_id)]['cantidad'] = cantidad
        else:
            carrito[str(producto_id)] = {
                'idProducto': producto_id,
                'nombre': producto.nombre,
                'precio': float(producto.precio),
                'cantidad': cantidad,
                'imagen': producto.imagen.url  
            }
        
        request.session['carrito'] = carrito
        messages.success(request, f"{producto.nombre} agregado al carrito")

        return redirect('indexp')
    
    return redirect('indexp')

def eliminar_del_carrito(request, producto_id):
    carrito = request.session.get('carrito', {})

    if str(producto_id) in carrito:
        del carrito[str(producto_id)]
        request.session['carrito'] = carrito  

        messages.success(request, f"Producto eliminado del carrito")

    return redirect('indexp')


def registrar_compra(request):
    carrito = request.session.get('carrito', {})
    usuario = request.user

    total_compra = sum(item['precio'] * item['cantidad'] for item in carrito.values())

    nueva_compra = Compra.objects.create(usuario=usuario, total=total_compra)

    for item_id, item_info in carrito.items():
        producto_id = item_info['idProducto']
        cantidad = item_info['cantidad']
        precio_unitario = item_info['precio']

        producto = get_object_or_404(Producto, idProducto=producto_id)

        producto_compra = ProductoCompra(compra=nueva_compra, producto=producto, cantidad=cantidad, precio_unitario=precio_unitario)
        producto_compra.save()


    request.session['carrito'] = {}

    messages.success(request, 'Compra realizada con éxito')
    return redirect('indexp')

def contactos(request):
    form = ContactForm
    context= {'form':form }
    return render(request, 'contactos.html', context)

def detalle_compra(request, compra_id):
    compra = get_object_or_404(Compra, id=compra_id)
    productos_compra = ProductoCompra.objects.filter(compra=compra)

    contexto = {
        'compra': compra,
        'productos_compra': productos_compra,
    }

    return render(request, 'detalle_compra.html', contexto)

def administrar(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Producto agregado exitosamente')
            return redirect('administrar')
    else:
        form = ProductoForm()

    productos = Producto.objects.all()
    compras = Compra.objects.all()
    contexto = {
        'form': form,
        'productos': productos,
        'compras':compras,
        
         
    }

    return render(request, 'administrar.html', contexto)

def subir(request):
    if request.method=='POST':
        form = ProductoForm(request.POST,request.FILES)
        if form.is_valid():
            form.save()
            return redirect('subir')
    else:
        form = ProductoForm() 
    return render(request,'administrar.html',{ 'form':form})
 
#fin del def()


def editprod(request, id):
    producto=get_object_or_404(Producto, id=id)
    
    form=UpdateProductoForm(instance=producto)
    datos={
        "form":form,
        "producto":producto
    }
    
    if request.method=="POST":
        form=UpdateProductoForm(data=request.POST, files=request.FILES, instance=producto)
        if form.is_valid():
            form.save()
            messages.warning(request,'Producto modificado exitosamente')
            return redirect(to="catalogo")
        
    return render(request,'aplicacion/editprod.html', datos)
    
def nuevosproductos(request):
    
    form=ProductoForm()
    
    if request.method=="POST":
        form=ProductoForm(data=request.POST, files=request.FILES)
        if form.is_valid():
            form.save()

            messages.success(request,'Producto agregado exitosamente')
            return redirect(to="catalogo")
        
    datos={
        "form":form
    }
    return render(request,'aplicacion/nuevosproductos.html', datos)

def catalogo(request):
    producto=Producto.objects.all()
    
    datos={
        "producto":producto
    }
    return render(request, 'aplicacion/catalogo.html', datos)

def eliminarprod(request, id):
    producto = get_object_or_404(Producto, id=id)
    
    if request.method == "POST":
        # Delete the producto
        producto.delete()
        messages.success(request, 'Producto eliminado exitosamente')
        return redirect(to="catalogo")
    
    datos = {
        "producto": producto
    }
    
    return render(request, 'aplicacion/eliminarprod.html', datos)
    
def contact(request):
    form = ContactForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            destinatarios = form.cleaned_data.get('destinatarios', '')
            name = form.cleaned_data['name']
            subject = 'Solicitud de Contacto'
            razon = form.cleaned_data['razon']

            mensaje = f'Su solicitud de contacto por el motivo de: {razon} \n Ha sido recibida. Nos pondremos en contacto con usted lo antes posible.'

            # Separar los correos electrónicos por comas y eliminar espacios en blanco
            recipient_list = [email.strip() for email in destinatarios.split(',')]

            # Renderizar el template de correo electrónico con los datos del formulario
            template = render_to_string('email-template.html', {
                'name': name,
                'email': destinatarios,
                'subject': subject,
                'message': mensaje
            })

            # Crear el objeto EmailMessage
            email_sender = EmailMessage(
                subject,
                template,
                settings.EMAIL_HOST_USER,
                recipient_list,
            )
            email_sender.content_subtype = 'html'

            try:
                # Enviar el correo electrónico
                email_sender.send()
                messages.success(request, 'El correo electrónico se envió correctamente')
            except Exception as e:
                messages.error(request, f'Hubo un error al enviar el correo electrónico: {e}')

            return redirect('indexp')

    context = {
        'form': form,
    }

    return render(request, 'contactos.html', context)

