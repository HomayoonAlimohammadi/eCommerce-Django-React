from django.contrib import admin
from .models import (
    Product,
    Review,
    Order,
    ShippingAddress,
    OrderItem,
)


admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(ShippingAddress)
admin.site.register(OrderItem)
