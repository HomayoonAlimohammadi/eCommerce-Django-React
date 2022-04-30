from django.shortcuts import render
from django.http import JsonResponse
from .products import products


def productList(request):

    return JsonResponse(products, safe=False)


def productDetail(request, pk):

    for product in products:
        if int(product['_id']) == pk:
            return JsonResponse(product, safe=False)

    return JsonResponse('Invalid Product ID', safe=False)



