from django.urls import path, include

from django.conf.urls.static import static
from . import views 

urlpatterns = [
    path('', views.indexp, name='indexp'),
    path('categoria', views.categoria, name='categoria'),
    path('contactos', views.contactos, name='contactos'),
    path('administrar', views.administrar, name='administrar'),
    path('registrar', views.registrar, name='registrar'),
    path('ingresar', views.ingresar, name='ingresar'),
    path('subir/',views.subir,name='subir'),
    path('agregar_al_carrito/<int:producto_id>/', views.agregar_al_carrito, name='agregar_al_carrito'),
    path('eliminar_del_carrito/<int:carrito_id>/', views.eliminar_del_carrito, name='eliminar_del_carrito'),



]

