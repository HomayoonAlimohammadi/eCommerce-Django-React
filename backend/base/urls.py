from django.urls import path
from . import views


app_name = 'base'
urlpatterns = [
    path('api/products/', views.productList, name='product-list'),
    path('api/products/<int:pk>', views.productDetail, name='product-detail'),


    # USE THIS URL ONLY ONCE, to generate Products for DB
    # path('api/products/addallproducts/', views.add_all_products),
]