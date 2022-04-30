from .products import products
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET'])
def productList(request):

    return Response(products)


@api_view(['GET'])
def productDetail(request, pk):

    for product in products:
        if int(product['_id']) == pk:
            return Response(product)

    return Response('Invalid Product ID', status=status.HTTP_404_NOT_FOUND)



