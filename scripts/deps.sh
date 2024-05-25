#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if Homebrew is installed
if ! command_exists brew; then
  echo "Homebrew is not installed. Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  
  # Ensure Homebrew is in the PATH
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# Check if Node.js is installed
if command_exists node; then
  echo "Node.js is already installed."
else
  echo "Node.js is not installed. Installing Node.js..."

  # Install Node.js using Homebrew
  brew install node

  # Verify the installation
  if command_exists node; then
    echo "Node.js was successfully installed."
  else
    echo "Node.js installation failed."
  fi
fi

# Optional: Check and install npm (Node Package Manager) if not installed
if command_exists npm; then
  echo "npm is already installed."
else
  echo "npm is not installed. Installing npm..."

  # npm is included with Node.js, but this ensures it's installed correctly
  brew install npm

  # Verify the installation
  if command_exists npm; then
    echo "npm was successfully installed."
  else
    echo "npm installation failed."
  fi
fi
