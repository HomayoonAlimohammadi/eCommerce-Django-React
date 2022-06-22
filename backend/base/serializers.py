from rest_framework import serializers
from .models import Product, User


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
