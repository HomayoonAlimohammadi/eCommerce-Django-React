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
