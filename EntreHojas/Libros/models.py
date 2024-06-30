from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Producto (models.Model):
    idProducto = models.AutoField(db_column='idProducto', primary_key=True)
    nombre = models.CharField(max_length=100,null=False)
    descripcion = models.CharField(max_length=200,null=False)
    precio = models.IntegerField(null=False)
    imagen = models.FileField(upload_to='productos/',null=True )
    
    class Meta:      
        ordering = ['idProducto']

class Compra(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    productos = models.ManyToManyField(Producto, through='ProductoCompra')
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fecha_compra = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Compra de {self.usuario.username} - Total: {self.total}'

class ProductoCompra(models.Model):
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def subtotal(self):
        return self.cantidad * self.precio_unitario

    



