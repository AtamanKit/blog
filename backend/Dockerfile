FROM python:3.13-slim

# ✅ Copy the 'uv' binary into the image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# ✅ Set working directory
WORKDIR /app

# ✅ Ensure unbuffered output from Python
ENV PYTHONUNBUFFERED=1

# ✅ Copy source code after WORKDIR is set
COPY . /app

# ✅ Install dependencies from uv.lock / pyproject.toml
RUN uv sync --frozen --no-cache
