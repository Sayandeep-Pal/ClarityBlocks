# Use Ubuntu Jammy as base image
FROM ubuntu:22.04

# Update package list and upgrade system packages
RUN apt-get update && apt-get upgrade -y


# Install essential packages
RUN apt-get install -y \
    curl \
    build-essential \
    git \
    htop \
    unzip \
    bash \
    wget
    # software-properties-common


# Install Node.js 22+
RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh

RUN bash nodesource_setup.sh

RUN apt-get install -y nodejs

# installing clarinet for testing purposes
RUN wget -nv https://github.com/hirosystems/clarinet/releases/latest/download/clarinet-linux-x64-glibc.tar.gz -O clarinet-linux-x64.tar.gz \
 && tar -xf clarinet-linux-x64.tar.gz \
 && chmod +x ./clarinet \
 && mv ./clarinet /usr/local/bin/ \
 && rm clarinet-linux-x64.tar.gz

# Verify installation
RUN clarinet --version


# Create app directory
WORKDIR /app

# Copy all files from the current directory to /app in the container
COPY . /app/


# Install dependencies if package.json exists
RUN npm install

# Expose common ports
EXPOSE 5000

CMD ["npm", "start"]