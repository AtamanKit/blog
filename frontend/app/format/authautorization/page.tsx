export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main>
      <h1 className="text-4xl font-bold mt-20">Objective</h1>

      <p className="mt-4">
        Imagine you’re building a secure gateway for an application using Django
        and Django REST Framework. Your mission is to create a REST API that
        handles user authentication and authorization. Here’s what it will do:
      </p>

      <p className="mt-4">
        It will warmly welcome new users by allowing them to register. Once
        they’re part of the system, they can log in with ease. For added
        security, users will have the ability to refresh their tokens to stay
        authenticated.
      </p>

      <p className="mt-4">
        If a user decides to take a break, they can log out anytime. The system
        will also let users view and update their personal details whenever they
        need to, making the experience seamless and user-friendly.
      </p>

      <p className="mt-4">
        The complete code can be downloaded from my{" "}
        <a
          href="https://github.com/AtamanKit/school-django-auth"
          target="_blank"
          className="underline text-blue-400"
        >
          GitHub
        </a>{" "}
        repository.
      </p>

      <h1 className="text-4xl font-bold mt-20">Let's See the API in Action</h1>
      <p>and then we'll look at how to build it.</p>

      <p className="mt-8 text-2xl">
        <strong>User Registration</strong>
      </p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`curl -X POST http://localhost:8000/api/register/ \\
    -d '{"email": "first@example.com", "password": "securepassword"}' \\
    -H "Content-Type: application/json"`}
          </code>
        </pre>
      </p>
      <p className="mt-4">
        <strong>Response:</strong>
      </p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`{"id": 1, "email": "first@example.com"}`}
          </code>
        </pre>
      </p>

      <p className="mt-12 text-2xl">
        <strong>Authentication (Login)</strong>
      </p>
      <p>Obtain Access and Refresh tokens:</p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`curl -X POST http://localhost:8000/api/login/ \\
    -d '{"email": "first@example.com", "password": "securepassword"}' \\
    -H "Content-Type: application/json"`}
          </code>
        </pre>
      </p>
      <p className="mt-4">
        <strong>Response:</strong>
      </p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3Mzc2NzE1NTF9.qZ8vlF65ovei8hk0mqqshjlIsEzFApZZWTIAdAUib4g",
    "refresh_token": "c9c1a1fd-f886-404a-862b-2c123b0ec1a5"
}`}
          </code>
        </pre>
      </p>

      <p className="mt-12 text-2xl">
        <strong>Access Token Refresh</strong>
      </p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`curl -X POST http://localhost:8000/api/refresh/ \\
    -d '{"refresh_token": "c9c1a1fd-f886-404a-862b-2c123b0ec1a5"}' \\
    -H "Content-Type: application/json"`}
          </code>
        </pre>
      </p>
      <p className="mt-4">
        <strong>Response:</strong>
      </p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3Mzc2NzE3MjR9.2PtaZVq5ioGNyQoPDU6U2ED-sgALWJZAq1Kw9-UL8no",
    "refresh_token": "2f37b70f-18dd-471c-9ef7-8065cb2f4634"
}`}
          </code>
        </pre>
      </p>

      <p className="mt-12 text-2xl">
        <strong>Logout (Invalidate Refresh Token)</strong>
      </p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`curl -X POST http://localhost:8000/api/logout/ \\
    -d '{"refresh_token": "2f37b70f-18dd-471c-9ef7-8065cb2f4634"}' \\
    -H "Content-Type: application/json"`}
          </code>
        </pre>
      </p>
      <p className="mt-4">
        <strong>Response:</strong>
      </p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">{`{"success": "User logged out."}`}</code>
        </pre>
      </p>

      <p className="mt-12 text-2xl">
        <strong>Retrieve Personal Info</strong>
      </p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`curl -X GET http://localhost:8000/api/me/ \\
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3Mzc2NzE3MjR9.2PtaZVq5ioGNyQoPDU6U2ED-sgALWJZAq1Kw9-UL8no"`}
          </code>
        </pre>
      </p>
      <p className="mt-4">
        <strong>Response:</strong>
      </p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`{"id": 1, "username": "", "email": "first@example.com"}`}
          </code>
        </pre>
      </p>

      <p className="mt-12 text-2xl">
        <strong>Update Personal Info</strong>
      </p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`curl -X PUT http://localhost:8000/api/me/ \\
    -d '{"email": "first@example.com", "username": "John Doe"}' \\
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3Mzc2NzE3MjR9.2PtaZVq5ioGNyQoPDU6U2ED-sgALWJZAq1Kw9-UL8no" \\
    -H "Content-Type: application/json"`}
          </code>
        </pre>
      </p>
      <p className="mt-4">
        <strong>Response:</strong>
      </p>
      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`{"id": 1, "username": "John Doe", "email": "first@example.com"}`}
          </code>
        </pre>
      </p>

      <h1 className="text-4xl font-bold mt-20">Prerequisites</h1>
      <ul className="list-disc list-inside mt-4 pl-8">
        <li>Ubuntu (or WSL for Windows users)</li>
        <li>Python 3.x</li>
        <li>Django</li>
        <li>Django REST Framework</li>
        <li>PyJWT</li>
        <li>Constance — Dynamic Django settings</li>
        <li>Redis</li>
      </ul>

      <p className="mt-12">
        To install the dependencies and tools for this project, we will use the{" "}
        <a
          href="https://docs.astral.sh/uv/"
          target="_blank"
          className="underline text-blue-400"
        >
          uv package manager
        </a>
        . First, we will initialize a new project then to add all the necessary
        dependencies.
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            uv init
            <br />
            uv add django djangorestframework pyjwt django-constance redis
            <br />
          </code>
        </pre>
      </p>
      <p className="mt-12">
        After initializing the project and adding the dependencies, our
        pyproject.toml file should look like this:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`[project]
name = "school-django-auth" 
version = "0.1.0" 
description = "Add your description here" 
readme = "README.md" 
requires-python = ">=3.13" 
dependencies = [
    "django-constance>=4.1.3",
    "django>=5.1.4",
    "djangorestframework>=3.15.2",
    "pyjwt>=2.10.1",
    "redis>=5.2.1",
]`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        With the help of{" "}
        <span className="text-red-500">uv package manager</span>, we can start a
        new Django project and create an app. Use following commands:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`uv run django-admin startproject auth_project
cd auth_project
uv run manage.py startapp auth_api`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        After running these commands, the project structure should look like
        this:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-bash">
            {`├── auth_project
│   ├── auth_api
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── __init__.py
│   │   ├── 'migrations'
│   │   │   └── __init__.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   └── views.py
│   ├── auth_project
│   │   ├── asgi.py
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── manage.py
├── hello.py
├── pyproject.toml
├── README.md
└── uv.lock`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        Update <span className="text-red-500">settings.py</span> by adding{" "}
        <span className="text-red-500">rest_framework</span> and{" "}
        <span className="text-red-500">auth_api</span> to the{" "}
        <span className="text-red-500">INSTALLED_APPS</span>:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'auth_app',
]`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        To enable authentication and permissions in our Django application, we
        need to configure the Django REST Framework settings. These settings
        specify the authentication method and the default permissions for API
        access.
      </p>

      <p className="mt-12">
        Add the following code to{" "}
        <span className="text-red-500">settings.py</span>:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_classNameES': [
        'auth_api.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_classNameES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        As you probably noticed, the{" "}
        <span className="text-red-500">Django-Constance</span> and{" "}
        <span className="text-red-500">Redis</span> dependencies have been added
        to the project. Well, Django-Constance is a powerful tool that allows
        you to manage dynamic configuration settings directly in your Django
        application without the need for database migrations. When combined with{" "}
        Redis, a high-performance in-memory data store, it ensures fast and
        efficient storage and retrieval of these configurations.
      </p>

      <p className="mt-12">
        Redis interacts with Django-Constance by serving as the backend where
        configuration values are stored. This setup makes updates to
        configurations instantaneous and highly scalable, perfect for dynamic,
        high-demand applications.
      </p>

      <p className="mt-12">
        To configure token lifetimes dynamically, add the following to your{" "}
        <span className="text-red-500">settings.py</span>:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`CONSTANCE_CONFIG = {
    'ACCESS_TOKEN_LIFETIME': (30 * 60 * 60, 'Access token lifetime in seconds'),
    'REFRESH_TOKEN_LIFETIME': (30 * 24 * 60 * 60, 'Refresh token lifetime in seconds'),
}`}
          </code>
        </pre>
      </p>

      <h1 className="text-4xl font-bold mt-20">What It Does:</h1>
      <p className="mt-12">
        <span className="text-red-500">Access tokens</span> and{" "}
        <span className="text-red-500">refresh tokens</span> are essential
        components of modern authentication systems, particularly when working
        with stateless APIs. Here’s a quick overview:
      </p>

      <p className="mt-12">
        <strong>Access Tokens</strong> are used to authenticate API requests on
        behalf of a user, typically short-lived for security purposes (e.g., the
        ACCESS_TOKEN_LIFETIME in this example is set to 30 hours). They are
        passed with each API request, usually in the Authorization header to
        prove the user’s identity and permissions. If compromised, it’s only
        valid for a short time, minimizing potential damage.
      </p>

      <p className="mt-12">
        <strong>Refresh Tokens</strong> are used to obtain new access tokens
        without requiring the user to log in again, they are longer-lived than
        access tokens (e.g., the REFRESH_TOKEN_LIFETIME here is 30 days).
      </p>

      <p className="mt-12">
        To implement <strong>refresh tokens</strong> in our Django app, we’ll
        add a model to store them. Open auth_api/models.py and add the following
        code:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`import uuid
from django.conf import settings

className RefreshToken(models.Model):
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='refresh_tokens')
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_valid(self):
        from django.utils.timezone import now
        return now() < self.expires_at`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        To build a Django application that requires more flexibility in managing
        users than the default <span className="text-red-500">User</span> model
        offers, we will use a <span className="text-red-500">custom user</span>{" "}
        model. This approach allows you to define exactly how users should be
        represented and authenticated in your application.
      </p>

      <p className="mt-12">
        In <span className="text-red-500">auth_api/models.py</span>, add the
        following code:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.db import models


# Custom user creation
className CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, username='', **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if not extra_fields.get('is_staff'):
            raise ValueError(_('Superuser must have is_staff=True'))
        if not extra_fields.get('is_superuser'):
            raise ValueError(_('Superuser must have is_superuser=True'))

        return self.create_user(email, password, **extra_fields)


className CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True, default='')
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email`}
          </code>
        </pre>
      </p>

      <h1 className="text-4xl font-bold mt-20">What’s Going On Here?</h1>
      <p className="mt-12">
        <span className="text-red-500">CustomUserManager:</span> Think of this
        as the “manager” for creating users. It defines the rules for adding
        both regular <strong>users</strong> and <strong>superusers</strong>,
        ensuring everything is set up correctly. <strong>CustomUser:</strong>{" "}
        This is the heart of your user model. Instead of relying on{" "}
        <strong>usernames</strong>, it uses <strong>email</strong> as the unique
        identifier (USERNAME_FIELD). It’s a more modern and flexible way to
        manage user accounts.
      </p>

      <p className="mt-12">
        With this setup, you can easily add or adjust fields like first_name,
        last_name, or any other details specific to your app’s needs.
      </p>

      <p className="mt-12">
        The complete code of{" "}
        <span className="text-red-500">auth_api/models.py</span> should look
        like this:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _
import uuid
from django.conf import settings
from django.db import models


# Custom user creation
className CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, username='', **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if not extra_fields.get('is_staff'):
            raise ValueError(_('Superuser must have is_staff=True'))
        if not extra_fields.get('is_superuser'):
            raise ValueError(_('Superuser must have is_superuser=True'))

        return self.create_user(email, password, **extra_fields)


className CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True, default='')
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


# Refresh token className
className RefreshToken(models.Model):
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='refresh_tokens')
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_valid(self):
        from django.utils.timezone import now
        return now() < self.expires_at`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        To use a custom user model in your Django application, you need to tell
        Django which model to use. This is done by setting the AUTH_USER_MODEL
        configuration in <span className="text-red-500">settings.py</span>.
      </p>

      <p className="mt-12">
        Add the following line to your{" "}
        <span className="text-red-500">settings.py</span>:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`AUTH_USER_MODEL = 'auth_api.CustomUser'`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        To handle JWT-based authentication in our application, we’ll create a
        custom authentication className. This className will verify tokens
        included in API requests and authenticate users based on them.
      </p>

      <p className="mt-12">
        Create a new file,{" "}
        <span className="text-red-500">auth_api/authentication.py</span>, and
        insert the following code:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`import jwt
from django.conf import settings
from .models import CustomUser
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed


className JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            prefix, token = auth_header.split()
            if prefix != 'Bearer':
                raise AuthenticationFailed('Invalid token prefix')

            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            user = CustomUser.objects.get(id=payload['user_id'])
            return (user, None)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token expired!!!!!!')
        except jwt.DecodeError:
            raise AuthenticationFailed('Invalid token')
        except (jwt.InvalidTokenError, CustomUser.DoesNotExist):
            raise AuthenticationFailed('Invalid credentials')`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        In the following we will create serializers to handle user data and
        authentication workflows in a Django REST Framework (DRF) application.
        Serializers simplify the process of converting complex data, such as
        Django models, into JSON format for APIs and validating incoming data.
      </p>

      <p className="mt-12">Here’s what each serializer does:</p>

      <p className="mt-12">
        <ul className="list-disc list-inside pl-8">
          <li className="mt-4">
            <span className="text-red-500">UserSerializer</span>: Used for
            retrieving and displaying basic user details like id, username, and
            email.
          </li>
          <li className="mt-4">
            <span className="text-red-500">RegisterSerializer</span>: Manages
            user registration by accepting email and password, ensuring
            passwords remain secure and write-only.
          </li>
          <li className="mt-4">
            <span className="text-red-500">LoginSerializer</span>: Validates
            user login credentials by checking the provided email and password.
          </li>
        </ul>
      </p>

      <p className="mt-12">
        These serializers form the backbone of your API’s user management
        system, making it easier to interact with the{" "}
        <span className="text-red-500">CustomUser</span> model.
      </p>

      <p className="mt-12">
        Create a file{" "}
        <span className="text-red-500">auth_api/serializers.py</span> and
        insert:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`from .models import CustomUser
from rest_framework import serializers


className UserSerializer(serializers.ModelSerializer):
    className Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']


className RegisterSerializer(serializers.ModelSerializer):
    className Meta:
        model = CustomUser
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            validated_data['email'], validated_data['password'])

        return user


className LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        Now let’s move to the implementation of the API views for user
        authentication and profile management. These views will handle key
        operations such as user registration, login, token refresh, logout, and
        profile updates, forming the core of our authentication system.
      </p>

      <p className="mt-12">Here’s a breakdown of the key components:</p>

      <p className="mt-12">
        <ul className="list-disc list-inside pl-8">
          <li className="mt-4">
            <span className="text-red-500">create_access_token</span>: A helper
            function that generates a JWT access token with a specific
            expiration time, dynamically fetched from django-constance settings.
          </li>
          <li className="mt-4">
            <span className="text-red-500">RegisterView</span>: Handles user
            registration. It validates incoming data, saves the new user, and
            returns their details upon successful registration.
          </li>
          <li className="mt-4">
            <span className="text-red-500">LoginView</span>: Authenticates users
            using their email and password. On success, it issues an access
            token and a refresh token, enabling seamless session management.
          </li>
          <li className="mt-4">
            <span className="text-red-500">RefreshView</span>: Allows users to
            renew their access token using a valid refresh token. It generates
            new tokens and invalidates the old refresh token.
          </li>
          <li className="mt-4">
            <span className="text-red-500">LogoutView</span>: Logs users out by
            deleting their refresh token, ensuring the session is terminated
            securely.
          </li>
          <li className="mt-4">
            <span className="text-red-500">ProfileView</span>: Provides
            authenticated users with the ability to view (GET) or update (PUT)
            their profile information.
          </li>
        </ul>
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`import jwt
import datetime
from django.conf import settings
from django.utils.timezone import now, timedelta
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from constance import config
from .models import RefreshToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


def create_access_token(user):
    print(f"ACCESS_TOKEN_LIFETIME: {config.ACCESS_TOKEN_LIFETIME}")
    return jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.now(datetime.timezone.utc) + timedelta(seconds=config.ACCESS_TOKEN_LIFETIME)
    }, settings.SECRET_KEY, algorithm='HS256')


className RegisterView(APIView):
    permission_classNamees = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


className LoginView(APIView):
    permission_classNamees = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                email=serializer.validated_data['email'], password=serializer.validated_data['password'])
            if user:
                access_token = create_access_token(user)
                refresh_token = RefreshToken.objects.create(
                    user=user,
                    expires_at=now() + timedelta(seconds=config.REFRESH_TOKEN_LIFETIME)
                )

                return Response({
                    'access_token': access_token,
                    'refresh_token': refresh_token.token
                }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


className RefreshView(APIView):
    permission_classNamees = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        try:
            token_obj = RefreshToken.objects.get(token=refresh_token)
            if token_obj.is_valid():
                new_access_token = create_access_token(token_obj.user)
                new_refresh_token = RefreshToken.objects.create(
                    user=token_obj.user,
                    expires_at=now() + timedelta(seconds=config.REFRESH_TOKEN_LIFETIME)
                )
                token_obj.delete()
                return Response({
                    'access_token': new_access_token,
                    'refresh_token': str(new_refresh_token.token)
                })
        except RefreshToken.DoesNotExist:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)


className LogoutView(APIView):
    permission_classNamees = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        try:
            token_obj = RefreshToken.objects.get(token=refresh_token)
            token_obj.delete()
            return Response({'success': 'User logged out.'}, status=status.HTTP_200_OK)
        except RefreshToken.DoesNotExist:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)


className ProfileView(APIView):
    permission_classNamees = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def put(self, request):
        serializer = UserSerializer(
            request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        Create a file <span className="text-red-500">auth_api/urls.py</span> and
        define the URL routing for the application:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`from django.urls import path
from .views import RegisterView, LoginView, RefreshView, LogoutView, ProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', RefreshView.as_view(), name='refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', ProfileView.as_view(), name='profile'),
]`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        Include these in project's <span className="text-red-500">urls.py</span>
        :
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`from django.urls import path, include

urlpatterns = [
    path('api/', include('auth_api.urls')),
]`}
          </code>
        </pre>
      </p>

      <h1 className="text-4xl font-bold mt-20">Database creation</h1>

      <p className="mt-12">
        To set up our database with the models we’ve defined, we need to perform
        two steps: create <span className="text-red-500">migrations</span> and
        apply migrations.
      </p>
      <p className="text-2xl mt-12">
        <strong>Create Migrations:</strong>
      </p>

      <p className="mt-4">
        Migrations are files that Django generates to describe the changes in
        your models (e.g., creating or updating database tables). To create
        migrations, run the following command:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`uv run manage.py makemigrations`}
          </code>
        </pre>
      </p>

      <p className="mt-4">
        This command inspects your models and generates the migration files
        needed to apply these changes to the database
      </p>

      <p className="text-2xl mt-12">
        <strong>Apply Migrations:</strong>
      </p>

      <p className="mt-4">
        Once the migration files are created, we need to apply them to the
        database. This step ensures that the database schema matches the model
        definitions. To apply the migrations, run:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">{`uv run manage.py migrate`}</code>
        </pre>
      </p>

      <p className="mt-4">
        For this simple development purpose, we are using the{" "}
        <span className="text-red-500">sqlite</span> database, which is
        lightweight and requires no additional configuration.
      </p>

      <h1 className="text-4xl font-bold mt-20">Putting Our Code into Action</h1>

      <p className="mt-12">
        First let’s start the server. Using the uv manager, open the terminal
        and write:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">{`uv run manage.py runserver`}</code>
        </pre>
      </p>

      <p className="mt-12">The output will be:</p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
January 22, 2025 - 10:45:42
Django version 5.1.4, using settings 'auth_project.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        Remember, at the beginning, we talked about{" "}
        <span className="text-red-500">Redis</span>, a necessary dependency for{" "}
        <span className="text-red-500">Django-Constance</span> to work?
        Depending on your system (Ubuntu or WSL), the installation process would
        look like this:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`sudo apt update
sudo apt install redis`}
          </code>
        </pre>
      </p>

      <p className="mt-12">Check on Ubuntu if the Redis server is running:</p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">{`sudo systemctl status redis`}</code>
        </pre>
      </p>

      <p className="mt-12">
        It should be in <strong>active</strong> status. If it is not active,
        start it with:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">
            {`
sudo systemctl start redis
`}
          </code>
        </pre>
      </p>

      <p className="mt-12">
        If you are an WSL user, start the service in another terminal window by
        running:
      </p>

      <p className="mt-4">
        <pre className="bg-gray-800 text-white p-8 rounded overflow-x-auto">
          <code className="language-python">{`redis-server`}</code>
        </pre>
      </p>

      <p className="mt-12">
        Open yet another terminal window, and verify our endpoints as we did at
        the beginning of this article.
      </p>
    </main>
  );
}
