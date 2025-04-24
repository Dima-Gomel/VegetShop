from django.db import models
from django.contrib.auth.models import User
from rest_framework.response import Response

def register(request):
    try:
        user = User.objects.create_user(
            username=request.data.get('email'),
            email=request.data.get('email'),
            password=request.data.get('password')
        )

        if user is not None:
            return Response({"id": user.id})
        else:
            return Response({"error": "User not created"}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    comment = models.TextField(blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')


class OrderItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
