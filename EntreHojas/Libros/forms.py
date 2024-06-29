from django import forms
from .models import Producto

class ProductoForm(forms.ModelForm):
    
    class Meta:
        model = Producto
        fields = ['nombre','descripcion', 'precio','imagen']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre'}),
            'descripcion': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Descripcion'}),
            'precio': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Precio'}),
            'imagen': forms.FileInput(attrs={'class': 'form-control'}),
        }

class UpdateProductoForm(forms.ModelForm):
    
    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'precio', 'imagen']
        