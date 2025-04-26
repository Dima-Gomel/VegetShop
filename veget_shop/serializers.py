from rest_framework import serializers
from veget_shop.models import Product, Order
from django.contrib.auth import get_user_model

User = get_user_model()


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)  # Добавляем username
    email = serializers.CharField(source='user.email', read_only=True)  # Можно добавить email

    class Meta:
        model = Order
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}}