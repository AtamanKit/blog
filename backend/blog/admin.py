# from django.contrib import admin
# from .models import Post, Comment


# @admin.register(Post)
# class PostAdmin(admin.ModelAdmin):
#     list_display = ('id', 'title', 'created_at')
#     search_fields = ('title', 'description', 'content')
#     list_filter = ('created_at',)
#     ordering = ('-created_at',)


# @admin.register(Comment)
# class CommentAdmin(admin.ModelAdmin):
#     list_display = ('id', 'user', 'post', 'text', 'created_at')
#     search_fields = ('user__username', 'post__title', 'text')
#     list_filter = ('created_at',)
#     ordering = ('-created_at',)
from django.contrib import admin
from django import forms
from .models import Post, Comment
from django_ckeditor_5.widgets import CKEditor5Widget


# 👇 Custom form for Post model
class PostAdminForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'
        widgets = {
            'content': CKEditor5Widget(config_name='extends'),
        }


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    form = PostAdminForm  # 👈 apply the custom form here
    list_display = ('id', 'title', 'created_at')
    search_fields = ('title', 'description', 'content')
    list_filter = ('created_at',)
    ordering = ('-created_at',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', 'text', 'created_at')
    search_fields = ('user__username', 'post__title', 'text')
    list_filter = ('created_at',)
    ordering = ('-created_at',)
