from django.urls import path, include
from EntreHojas import settings
from django.conf.urls.static import static
from . import views 

urlpatterns = [
    path('', views.index, name='index'), #das entfernen
    path('indexp', views.indexp, name='indexp'),
    path('categoria', views.categoria, name='categoria'),
    path('contactos', views.contactos, name='contactos'),
    path('administrar', views.administrar, name='administrar'),

]

if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)