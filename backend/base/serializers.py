from rest_framework import serializers
from .models import Product, User, ShippingAddress, OrderItem, Order
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):

    _id = serializers.CharField(source="id")
    is_admin = serializers.BooleanField(source="is_staff")
    # _id = serializers.SerializerMethodField(read_only=True)
    # is_admin = serializers.SerializerMethodField(read_only=True)
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["_id", "is_admin", "username", "email", "name"]

    def get_name(self, user_obj):
        try:
            full_name = user_obj.first_name + user_obj.last_name
            return full_name or user_obj.email
        except AttributeError as e:
            return ""

    # def get__id(self, user_obj):
    #     return user_obj.id

    # def get_is_admin(self, user_obj):
    #     return user_obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["_id", "is_admin", "username", "email", "name", "token"]

    def get_token(self, user_obj):
        token = RefreshToken.for_user(user_obj)
        return str(token.access_token)


class OrderSerializer(serializers.ModelSerializer):

    order_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_order_items(self, obj):
        items = obj.order_items.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shipping_address(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shipping_address, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user)
        return serializer.data


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"
