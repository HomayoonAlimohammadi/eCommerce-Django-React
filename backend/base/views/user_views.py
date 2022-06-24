from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from base.serializers import UserSerializer, UserSerializerWithToken
from base.models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["email"] = user.email

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        user_data = UserSerializerWithToken(self.user).data
        for key, value in user_data.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerializerWithToken(user)
    data = request.data
    print(data)
    if "name" in data:
        user.first_name = data["name"]

    if "email" in data:
        user.email = data["email"]
        user.username = data["email"]

    if "password" in data:
        user.set_password(data["password"])

    user.save()

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def user_register_view(request):

    data = request.data
    if not (data.get("email") and data.get("password")):
        return Response(
            {"data": "Email or password not contained."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    user = User(
        first_name=data["name"],
        username=data["email"],
        email=data["email"],
    )
    user.set_password(data["password"])

    try:
        user.save()
    except Exception as e:
        return Response(
            {"data": "Email must be unique"}, status=status.HTTP_400_BAD_REQUEST
        )

    serializer = UserSerializerWithToken(user)

    return Response(serializer.data)
