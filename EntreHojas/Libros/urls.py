from django.urls import path, include

from django.conf.urls.static import static
from . import views 

urlpatterns = [
    path('', views.indexp, name='indexp'),
    path('categoria', views.categoria, name='categoria'),
    path('contactos', views.contactos, name='contactos'),
    path('administrar/', views.administrar, name='administrar'),
    path('registrar', views.registrar, name='registrar'),
    path('ingresar', views.ingresar, name='ingresar'),
    path('subir/',views.subir,name='subir'),
    path('agregar_al_carrito/<int:producto_id>/', views.agregar_al_carrito, name='agregar_al_carrito'),
    path('eliminar_del_carrito/<int:producto_id>/', views.eliminar_del_carrito, name='eliminar_del_carrito'),
    path('cerrar-sesion/', views.cerrar_sesion, name='cerrar_sesion'),
    path('registrar_compra/', views.registrar_compra, name='registrar_compra'),
    path('detalle_compra/<int:compra_id>/', views.detalle_compra, name='detalle_compra'),




]

