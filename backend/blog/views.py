from rest_framework import generics, permissions, response, views
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer, UserSerializer
import logging

logger = logging.getLogger(__name__)


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]


class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [permissions.IsAuthenticated]
        else:
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id)

    def perform_create(self, serializer):
        print("##################################")
        post_id = self.kwargs['post_id']
        logger.debug(f"Attempting to create comment for post_id: {post_id}")
        post = Post.objects.get(id=post_id)
        logger.debug(f"Post found: {post}")
        serializer.save(user=self.request.user, post=post)
        logger.debug("Comment created successfully")


class UserProfileView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return response.Response(UserSerializer(user).data)
