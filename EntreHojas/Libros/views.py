from django.shortcuts import render, redirect, get_object_or_404
from .models import Producto , Carrito
from .forms import ProductoForm, UpdateProductoForm
from django.shortcuts import get_object_or_404, redirect
from django.conf import settings
from django.contrib import messages
from os import path, remove

# Create your views here.

def indexp(request):
    productos = Producto.objects.all()
    carritos = Carrito.objects.all()

    # Calcular el total del carrito
    total = sum(carrito.producto.precio * carrito.cantidad for carrito in carritos)

    context = {
        'productos': productos,
        'carritos': carritos,
        'total': total,
    }

    return render(request, 'indexp.html', context)



def agregar_al_carrito(request, producto_id):
    producto = get_object_or_404(Producto, idProducto=producto_id)
    
    if request.method == 'POST':
        cantidad = int(request.POST.get('cantidad', 1))
        
        # Verificar si el producto ya está en el carrito
        carrito_existente = Carrito.objects.filter(producto=producto).first()
        
        if carrito_existente:
            # Si existe, aumentar la cantidad
            carrito_existente.cantidad = cantidad
            carrito_existente.save()
        else:
            # Si no existe, crear un nuevo registro en el carrito
            Carrito.objects.create(producto=producto, cantidad=cantidad)
        
        # Redireccionar a la página de inicio o a donde sea necesario
        return redirect('indexp')
    
    # Si no es un POST, manejar según sea necesario (opcional)
    # Aquí podrías renderizar una página de error o hacer otra acción
    
    return redirect('indexp')

def eliminar_del_carrito(request, carrito_id):
    carrito = get_object_or_404(Carrito, id=carrito_id)
    carrito.delete()
    return redirect('indexp')


def categoria(request):
    return render(request, 'categoria.html')

def contactos(request):
    return render(request, 'contactos.html')

def administrar(request):
    # Manejar el formulario para agregar productos
    if request.method == 'POST':
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Producto agregado exitosamente')
            return redirect('administrar')
    else:
        form = ProductoForm()

    # Obtener todos los productos y el carrito de compras
    productos = Producto.objects.all()
    carritos = Carrito.objects.all()

    # Calcular el total del carrito
    total = sum(carrito.producto.precio * carrito.cantidad for carrito in carritos)

    context = {
        'form': form,
        'productos': productos,
        'carritos': carritos,
        'total': total,
    }

    return render(request, 'administrar.html', context)

def registrar(request):
    return render(request, 'registro.html')

def ingresar(request):
    return render(request, 'ingresar.html')


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
    
