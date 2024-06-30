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




    



