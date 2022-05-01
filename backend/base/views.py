from .products import products
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer


@api_view(['GET'])
def productList(request):

    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def productDetail(request, pk):

    try:
        product = Product.objects.get(_id=pk)    
    except Product.DoesNotExist as e:
        return Response('Invalid Product ID', status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(product)
    
    return Response(serializer.data)




@api_view(['GET'])
def add_all_products(request):
    '''
    Access this view ONLY ONCE
    The purpose of this view is to generate new items for the 
    DB from products.py file
    '''

    try:

        for product in products:
            id = product.pop('_id')
            print(f'Product id {id} was added')
            Product.objects.create(**product)

        return Response('All products was added.')

    except Exception as e:

        print(e.__class__)
        print(e)

        return Response('Error occured.', 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)