#!/bin/zsh

# Define the line to be added to the .zshrc file
LINE_TO_ADD="source ~/.sofia/scripts/sofia.sh"

# Define the path to the .zshrc file
ZSHRC_FILE="$HOME/.zshrc"

# Check if the line is already in the .zshrc file
if grep -qFx "$LINE_TO_ADD" "$ZSHRC_FILE"; then
  echo "Sofia is already in the $ZSHRC_FILE file."
else
  # Append the line to the .zshrc file
  echo "$LINE_TO_ADD" >> "$ZSHRC_FILE"
  echo "Added Sofia to the $ZSHRC_FILE file."
fi
