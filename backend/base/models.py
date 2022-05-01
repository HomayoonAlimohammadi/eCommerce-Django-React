from unicodedata import decimal
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
# from .utils import getImageUUID


User = get_user_model()


class Product(models.Model):

    name = models.CharField(max_length=128)
    image = models.ImageField(upload_to='product_images/', 
                              blank=True, null=True)
                            
    user = models.ForeignKey(User, 
                             related_name='products', 
                             on_delete=models.CASCADE)

    brand = models.CharField(max_length=128, blank=True, null=True)
    category = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    rating = models.IntegerField(default=0,
                                 validators=[MinValueValidator(0),
                                            MaxValueValidator(5)])
    
    numReviews = models.IntegerField(default=0,
                                     validators=[MinValueValidator(0)])

    price = models.DecimalField(max_digits=9, decimal_places=2)
    countInStock = models.IntegerField(default=0, 
                                       validators=[MinValueValidator(0)])
    
    createdAt = models.DateTimeField(auto_now_add=True)


class Review(models.Model):

    user = models.ForeignKey(User,
                            related_name='reviews',
                            on_delete=models.CASCADE)

    product = models.ForeignKey('Product', related_name='reviews',
                                on_delete=models.CASCADE)

    name = models.CharField(max_length=128)
    rating = models.IntegerField(default=0,
                                validators=[MinValueValidator(0),
                                        MaxValueValidator(5)])
    
    comment = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)


class Order(models.Model):

    user = models.ForeignKey(User,
                            related_name='orders',
                            on_delete=models.CASCADE)

    paymentMethod = models.CharField(max_length=128)
    texPrice = models.DecimalField(max_digits=9, decimal_places=2)
    shippingPrice = models.DecimalField(max_digits=9, decimal_places=2)
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(blank=True, null=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    
