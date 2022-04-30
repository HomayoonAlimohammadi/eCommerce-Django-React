from django.urls import path
from . import views


app_name = 'base'
urlpatterns = [
    path('api/products/', views.productList, name='product-list'),
    path('api/products/<int:pk>', views.productDetail, name='product-detail'),
]