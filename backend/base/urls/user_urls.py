from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path("", views.get_users, name="user-list"),
    path("login", views.MyTokenObtainPairView.as_view(), name="user-login"),
    path("profile", views.user_profile, name="user-profile"),
    path("register", views.user_register_view, name="user-register"),
]
