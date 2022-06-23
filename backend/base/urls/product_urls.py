from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path("", views.productList, name="product-list"),
    path("<int:pk>", views.product_detail, name="product-detail"),
]
