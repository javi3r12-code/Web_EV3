from django.contrib import admin
from .models import Producto,Compra,ProductoCompra

class AdmProducto(admin.ModelAdmin):
    list_display = ('idProducto', 'nombre', 'descripcion', 'precio', 'imagen')

admin.site.register(Producto, AdmProducto)

