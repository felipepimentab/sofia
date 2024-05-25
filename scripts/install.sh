#!/bin/bash
# Path to the directory
SOFIA_DIR="$HOME/.sofia"

# Check if the directory exists
if [ -d "$SOFIA_DIR" ]; then
  echo "Directory $SOFIA_DIR exists. Deleting it and its contents..."

  # Remove the directory and its contents
  rm -rf "$SOFIA_DIR"

  # Verify if the deletion was successful
  if [ ! -d "$SOFIA_DIR" ]; then
    echo "Directory $SOFIA_DIR has been successfully deleted."
  else
    echo "Failed to delete the directory $SOFIA_DIR."
  fi
else
  echo "Directory $SOFIA_DIR does not exist."
fi

# Clone git repository into ~/.sofia
git clone https://github.com/felipepimentab/sofia.git $SOFIA_DIR
cd $SOFIA_DIR

# Checks for and installs required dependencies
chmod +x ./scripts/deps.sh
sh ./scripts/deps.sh

echo "Sofia has been successfuly installed!"