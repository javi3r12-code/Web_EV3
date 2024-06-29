from django.shortcuts import render
from .models import Producto
from .forms import ProductoForm, UpdateProductoForm
from django.shortcuts import get_object_or_404, redirect
from django.conf import settings
from django.contrib import messages
from os import path, remove

# Create your views here.

def index(request):
    return render(request, 'index.html') #Entfernen am Ende

def indexp(request):
    return render(request, 'indexp.html')

def categoria(request):
    return render(request, 'categoria.html')

def contactos(request):
    return render(request, 'contactos.html')

def administrar(request):
    return render(request, 'administrar.html')

def registrar(request):
    return render(request, 'registro.html')

def ingresar(request):
    return render(request, 'ingresar.html')

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
    
