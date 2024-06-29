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


]

