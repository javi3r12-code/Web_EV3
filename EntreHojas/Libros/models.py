from django.db import models

# Create your models here.

class Producto (models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100,null=False)
    descripcion = models.CharField(max_length=200,null=False)
    precio = models.IntegerField(null=False)
    imagen = models.ImageField(upload_to='productos',null=True)
    
    def __str__(self):
        return f"ID:{self.id} NOMBRE: {self.nombre}"