from django.urls import path

from .views import home_page, about_page, detail_view, create_book, edit_view, delete_view

urlpatterns = [
    path('', home_page, name="home_page"),
    path('create/', create_book, name="create_page"),
    path('<int:id>/', detail_view, name="detail_page"),
    path('<int:id>/edit/', edit_view, name="edit_page"),
    path('<int:id>/delete/', delete_view, name="delete_page"),
    path('about/', about_page, name="about_page"),
]