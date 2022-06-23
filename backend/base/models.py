from unicodedata import decimal
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

# from .utils import getImageUUID


User = get_user_model()


class Product(models.Model):

    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=128)
    image = models.ImageField(upload_to="product/", blank=True, null=True)

    user = models.ForeignKey(
        User, null=True, blank=True, related_name="products", on_delete=models.SET_NULL
    )

    brand = models.CharField(max_length=128, blank=True, null=True)
    category = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    rating = models.DecimalField(
        default=0,
        max_digits=7,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
    )

    numReviews = models.IntegerField(
        default=0, blank=True, null=True, validators=[MinValueValidator(0)]
    )

    price = models.DecimalField(max_digits=9, decimal_places=2)
    countInStock = models.IntegerField(
        default=0, blank=True, null=True, validators=[MinValueValidator(0)]
    )

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Review(models.Model):

    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(
        User, null=True, related_name="reviews", on_delete=models.SET_NULL
    )

    product = models.ForeignKey(
        "Product", related_name="reviews", on_delete=models.CASCADE
    )

    name = models.CharField(max_length=128)
    rating = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(5)]
    )

    comment = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):

    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(
        User, null=True, related_name="orders", on_delete=models.SET_NULL
    )

    paymentMethod = models.CharField(max_length=128)
    texPrice = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True
    )

    shippingPrice = models.DecimalField(
        max_digits=9, decimal_places=2, null=True, blank=True
    )

    totalPrice = models.DecimalField(max_digits=15, decimal_places=2)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(blank=True, null=True, auto_now_add=False)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(blank=True, null=True, auto_now_add=False)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order: {self._id}, total of: {self.totalPrice}"


class OrderItem(models.Model):

    _id = models.AutoField(primary_key=True, editable=False)
    order = models.ForeignKey(
        "Order", related_name="order_items", on_delete=models.SET_NULL, null=True
    )

    product = models.ForeignKey(
        "Product", related_name="order_items", on_delete=models.CASCADE
    )

    name = models.CharField(max_length=128)
    qty = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(9)]
    )

    price = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    image = models.CharField(max_length=220, null=True, blank=True)

    def __str__(self):
        return self.name


class ShippingAddress(models.Model):

    _id = models.AutoField(primary_key=True, editable=False)
    order = models.OneToOneField(
        "Order", related_name="shipping_address", on_delete=models.CASCADE
    )

    address = models.TextField()
    city = models.CharField(max_length=128)
    postalCode = models.CharField(max_length=128)
    country = models.CharField(max_length=128)
    shippingPrice = models.DecimalField(max_digits=9, decimal_places=2)

    def __str__(self):
        return f"Shipping Address to: {self.city}, {self.country}"
