from django.contrib import admin
from .models import Producto, Carrito

class AdmProducto(admin.ModelAdmin):
    list_display = ('idProducto', 'nombre', 'descripcion', 'precio', 'imagen')

class AdmCarrito(admin.ModelAdmin):
    list_display = ('id', 'producto_nombre', 'cantidad', 'producto_precio')

    def producto_nombre(self, obj):
        return obj.producto.nombre

    def producto_precio(self, obj):
        return obj.producto.precio

admin.site.register(Producto, AdmProducto)
admin.site.register(Carrito, AdmCarrito)
