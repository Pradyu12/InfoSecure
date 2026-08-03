#!/bin/bash
# setup-vps.sh — Provision a VPS for hosting InfoSecure Solutions
#
# Tested on: Ubuntu 22.04 LTS
# Requirements: A fresh VPS with sudo access and ports 80/443 open
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/Pradyu12/InfoSecure/main/setup-vps.sh | sudo bash
#   # OR
#   wget -qO- https://raw.githubusercontent.com/Pradyu12/InfoSecure/main/setup-vps.sh | sudo bash
#
# After running, copy the project files to /opt/infosecure/ and run:
#   cd /opt/infosecure && docker compose up -d

set -euo pipefail

echo "=== InfoSecure VPS Setup ==="

# Update system
echo "[1/6] Updating system packages..."
sudo apt-get update -y
sudo apt-get upgrade -y

# Install Docker
echo "[2/6] Installing Docker..."
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add current user to docker group (if running as non-root)
if [ "$(id -u)" -ne 0 ]; then
    echo "[3/6] Adding user to docker group..."
    sudo usermod -aG docker "$USER"
fi

# Install UFW firewall
echo "[4/6] Configuring firewall..."
sudo apt-get install -y ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP (Caddy redirects to HTTPS)
sudo ufw allow 443/tcp   # HTTPS
sudo ufw --force enable

# Create deployment directory
echo "[5/6] Creating deployment directory..."
sudo mkdir -p /opt/infosecure
sudo mkdir -p /srv/www
sudo chown -R "$(whoami):$(whoami)" /opt/infosecure
sudo chown -R www-data:www-data /srv/www

# Configure Docker to start on boot
echo "[6/6] Enabling Docker on boot..."
sudo systemctl enable docker
sudo systemctl enable containerd

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "  1. Copy the InfoSecure project to /opt/infosecure/"
echo "  2. Place your Caddyfile and docker-compose.yml in /opt/infosecure/"
echo "  3. Set up DNS: point your domain to this VPS IP"
echo "  4. Run: cd /opt/infosecure && docker compose up -d"
echo "  5. Caddy will automatically obtain TLS certificates from Let's Encrypt"
echo ""
echo "Firewall rules:"
echo "  SSH   : allow"
echo "  HTTP  : allow"
echo "  HTTPS : allow"
echo "  All other ports: deny"
