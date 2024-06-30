from django.shortcuts import render, redirect, get_object_or_404
from .models import Producto 
from .forms import ProductoForm, UpdateProductoForm, UserForm, LoginForm
from django.shortcuts import get_object_or_404, redirect
from django.conf import settings
from django.contrib import messages
from os import path, remove
from django.contrib.auth import authenticate, login, logout

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


def indexp(request):
    # Obtener el carrito de la sesión del usuario
    carrito = request.session.get('carrito', {})
    total = sum(item['precio'] * item['cantidad'] for item in carrito.values())
    
    # Obtener todos los productos para mostrar en la página
    productos = Producto.objects.all()
    
    context = {
        'productos': productos,
        'carrito': carrito,
        'total': total,
    }

    return render(request, 'indexp.html', context)

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Producto  # Asegúrate de importar el modelo Producto

def agregar_al_carrito(request, producto_id):
    producto = get_object_or_404(Producto, idProducto=producto_id)
    
    if request.method == 'POST':
        cantidad = int(request.POST.get('cantidad', 1))
        
        # Obtener el carrito de la sesión del usuario
        carrito = request.session.get('carrito', {})
        
        # Verificar si el producto ya está en el carrito
        if str(producto_id) in carrito:
            # Si existe, actualizar la cantidad
            carrito[str(producto_id)]['cantidad'] = cantidad
        else:
            # Si no existe, agregar el producto al carrito
            carrito[str(producto_id)] = {
                'idProducto': producto_id,
                'nombre': producto.nombre,
                'precio': float(producto.precio),
                'cantidad': cantidad,
                'imagen': producto.imagen.url  # Aquí agregamos la URL de la imagen del producto
            }
        
        # Actualizar la sesión del usuario con el nuevo carrito
        request.session['carrito'] = carrito
        messages.success(request, f"{producto.nombre} agregado al carrito")

        return redirect('indexp')
    
    return redirect('indexp')

def eliminar_del_carrito(request, producto_id):
    # Obtener el carrito de la sesión del usuario
    carrito = request.session.get('carrito', {})

    # Verificar si el producto está en el carrito
    if str(producto_id) in carrito:
        # Eliminar el producto del carrito
        del carrito[str(producto_id)]
        request.session['carrito'] = carrito  # Actualizar la sesión

        messages.success(request, f"Producto eliminado del carrito")

    return redirect('indexp')


def categoria(request):
    return render(request, 'categoria.html')

def contactos(request):
    return render(request, 'contactos.html')

def administrar(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Producto agregado exitosamente')
            return redirect('administrar')
    else:
        form = ProductoForm()

    
    
    contexto = {
        'form': form,
         
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
    
