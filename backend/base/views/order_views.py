from base.models import Order, OrderItem, Product, ShippingAddress
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from base.serializers import OrderSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_order_items(request):

    user = request.user
    data = request.data
    order_items = data["orderItems"]

    if not order_items:
        return Response(
            {"detail": "No order items"}, status=status.HTTP_400_BAD_REQUEST
        )

    order = Order.objects.create(
        user=user,
        paymentMethod=data.get("paymentMethod"),
        taxPrice=data.get("taxPrice"),
        shippingPrice=data.get("shippingPrice"),
        totalPrice=data.get("totalPrice"),
    )

    shipping = ShippingAddress.objects.create(
        order=order,
        address=data["shippingAddress"].get("address"),
        city=data["shippingAddress"].get("city"),
        postalCode=data["shippingAddress"].get("postalCode"),
        country=data["shippingAddress"].get("country"),
    )
    print(order.shipping_address)
    for item in order_items:
        product = Product.objects.get(_id=item.get("productID"))

        order_item = OrderItem.objects.create(
            order=order,
            product=product,
            name=product.name,
            qty=item.get("qty"),
            price=item.get("price"),
            image=product.image.url,
        )
        product.countInStock -= item.get("qty")
        product.save()

    serializer = OrderSerializer(order)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user
    try:
        order = Order.objects.get(_id=pk)
    except:
        return Response(
            {"detail": "Invalid order id"}, status=status.HTTP_400_BAD_REQUEST
        )

    if user.is_staff or order.user == user:
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    return Response({"detail": "Not authorized."}, status=status.HTTP_401_UNAUTHORIZED)
