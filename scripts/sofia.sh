#!/bin/bash

function sofia() {
  # Check if the argument is provided
  if [ $# -eq 0 ]; then
    echo "Expected 1 argument for the file path"
  else
    # Pass the argument to the npm script
    echo "1 - $1"
    echo "2 - $2"
    npm run sofia -- "$1" "$2"
  fi
}
