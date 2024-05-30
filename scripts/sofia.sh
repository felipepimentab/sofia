#!/bin/bash

# Path to the Sofia directory
SOFIA_DIR="$HOME/.sofia"

# Default output path
OUTPUT_DEFAULT="./output.tsv"
TEMP="$SOFIA_DIR/temp/debug.txt"

function sofia() {
  # Check if the argument is provided
  if [ $# -eq 0 ]; then
    echo "Expected 1 argument for the file path"
  else
    # Pass the argument to the npm script
    node $SOFIA_DIR/scripts/run.js "$1" "${2:-$OUTPUT_DEFAULT}" "$TEMP"
  fi
}
