from django.urls import path
from .views import PostListCreateView, CommentListCreateView


urlpatterns = [
    path('posts/', PostListCreateView.as_view(), name='post_list_create'),
    path('posts/<int:post_id>/comments/', CommentListCreateView.as_view(), name='comment_list_create'),
]
