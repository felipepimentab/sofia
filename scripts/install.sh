#!/bin/zsh

# Path to the Sofia directory
SOFIA_DIR="$HOME/.sofia"

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to check for and install dependencies
deps() {
  # Check if Homebrew is installed
  if ! command_exists brew; then
    echo "Homebrew is not installed. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Ensure Homebrew is in the PATH
    eval "$(/opt/homebrew/bin/brew shellenv)"
  fi

  # Check if Git is installed
  if command_exists git; then
    echo "Git is already installed."
  else
    echo "Git is not installed. Installing Git..."
    # Install Git using Homebrew
    brew install git

    # Verify the installation
    if command_exists git; then
      echo "Git was successfully installed."
    else
      echo "Git installation failed."
    fi
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
}

# START
# Check for and install dependencies
deps

# Check if the directory exists
if [ -d "$SOFIA_DIR" ]; then
  echo "Directory $SOFIA_DIR already exists. Updating it..."

  # Update directory
  cd $SOFIA_DIR
  git pull
  
  echo ""
  echo "Sofia has been successfuly updated."

else
  echo "Directory $SOFIA_DIR does not exist."

  # Clone git repository into ~/.sofia
  cd $HOME
  git clone https://github.com/felipepimentab/sofia.git $SOFIA_DIR
  # Add Sofia to source
  sh $SOFIA_DIR/scripts/source.sh
  # Install node dependencies
  cd $SOFIA_DIR
  npm install
  npm run compile

  echo ""
  echo "Sofia has been successfuly installed."
fi

# Copy shortcut to Desktop
cp $SOFIA_DIR/app/Cinejornais.shortcut $HOME/Desktop