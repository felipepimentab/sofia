#!/bin/bash
# Define the directory path
SOFIA_DIR="~/.sofia"

# Check if the directory exists
if [ -d "" ]; then
  echo "Directory $SOFIA_DIR exists. Deleting it and its contents..."
  
  # Remove the directory and its contents
  rm -rf "$SOFIA_DIR"
  
  # Verify the deletion
  if [ ! -d "$SOFIA_DIR" ]; then
    echo "Directory $SOFIA_DIR was successfully deleted."
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