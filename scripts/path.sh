#!/bin/bash

# Function to add a directory to the PATH
add_to_path() {
  local DIR="$1"
  local SHELL_PROFILE

  # Determine the shell profile file
  if [[ $SHELL == *"zsh"* ]]; then
    SHELL_PROFILE="$HOME/.zshrc"
  elif [[ $SHELL == *"bash"* ]]; then
    SHELL_PROFILE="$HOME/.bash_profile"
  else
    # Default to .profile for other shells
    SHELL_PROFILE="$HOME/.profile"
  fi

  # Check if the directory is already in the PATH
  if [[ ":$PATH:" != *":$DIR:"* ]]; then
    echo "Adding $DIR to PATH in $SHELL_PROFILE"

    # Add the directory to the shell profile
    echo "export PATH=\"$DIR:\$PATH\"" >> "$SHELL_PROFILE"

    # Apply the changes to the current session
    export PATH="$DIR:$PATH"
  else
    echo "$DIR is already in the PATH."
  fi
}

# Check if a directory argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 /path/to/directory"
  exit 1
fi

# Add the specified directory to the PATH
add_to_path "$1"

# Source the shell profile to apply changes to the current session
if [[ $SHELL == *"zsh"* ]]; then
  source "$HOME/.zshrc"
elif [[ $SHELL == *"bash"* ]]; then
  source "$HOME/.bash_profile"
else
  source "$HOME/.profile"
fi

echo "PATH updated successfully."
