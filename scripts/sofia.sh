#!/bin/bash

# Check if the argument is provided
if [ $# -eq 0 ]; then
  echo "Expected 1 argument for the file path"
  exit 1
fi

# Pass the argument to the npm script
npm run sofia -- "$1"