from django.db import models

# Create your models here.

class Producto (models.Model):
    idProducto = models.AutoField(db_column='idProducto', primary_key=True)
    nombre = models.CharField(max_length=100,null=False)
    descripcion = models.CharField(max_length=200,null=False)
    precio = models.IntegerField(null=False)
    imagen = models.FileField(upload_to='productos/',null=True )
    
    class Meta:      
        ordering = ['idProducto']

class Carrito(models.Model):
    id = models.AutoField(primary_key=True)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)

    def subtotal(self):
        return self.producto.precio * self.cantidad

    def __str__(self):
        return f"{self.cantidad} x {self.producto.nombre}"

