from base.products import products
from base.models import Product
from base.serializers import ProductSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["email"] = user.email

        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        user_data = UserSerializer(self.user).data
        for key, value in user_data.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def productList(request):

    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def product_detail(request, pk):

    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist as e:
        return Response("Invalid Product ID", status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(product)

    return Response(serializer.data)


@api_view(["GET"])
def user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    print(serializer)
    return Response(serializer.data)


@api_view(["GET"])
def add_all_products(request):
    """
    Access this view ONLY ONCE
    The purpose of this view is to generate new items for the
    DB from products.py file
    """

    try:

        for product in products:
            id = product.pop("_id")
            print(f"Product id {id} was added")
            Product.objects.create(**product)

        return Response("All products was added.")

    except Exception as e:

        print(e.__class__)
        print(e)

        return Response("Error occured.", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
