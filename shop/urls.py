from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from veget_shop.views import ProductListAPIView, ProductDetailAPIView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from accounts.views import RegisterView, ProfileView
from accounts.serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="API description",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('api/', include(router.urls)),
                  path('api/products/', ProductListAPIView.as_view()),
                  path('api/products/<int:pk>/', ProductDetailAPIView.as_view()),
                  path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
                  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
                  path('api/register/', RegisterView.as_view(), name='register'),
                  path('api/profile/', ProfileView.as_view(), name='profile'),
                  path('api/token/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer),
                       name='token_obtain_pair'),
                  path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
                  path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
