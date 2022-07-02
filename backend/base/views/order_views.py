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
    order_items = data.get("order_items", [])
    if order_items:
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
        address=data.get("address"),
        city=data.get("city"),
        postalCode=data.get("postalCode"),
        country=data.get("country"),
    )

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
