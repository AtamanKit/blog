#!/bin/sh

echo "Collecting static files..."
uv run python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
uv run gunicorn project.wsgi:application --bind 0.0.0.0:8000 --worker-class gevent --access-logfile - --error-logfile -
