#!/bin/bash


# Define a function to display usage information
show_help() {
  echo "Usage: $0 [options]"
  echo "Options:"
  echo "  --help    Display this help message"
  # Add more options here if needed
}

function sofia() {
  # Parse command-line options
  while getopts ":h-:" opt; do
    case $opt in
      h)
        show_help
        ;;
      -)
        case "${OPTARG}" in
          help)
            show_help
            ;;
          *)
            echo "Invalid option: --${OPTARG}"
            show_help
            ;;
        esac
        ;;
      \?)
        echo "Invalid option: -$OPTARG"
        show_help
        ;;
    esac
  done

  # Check if the argument is provided
  if [ $# -eq 0 ]; then
    echo "Expected 1 argument for the file path"
  else
    cd ..
    # Pass the argument to the npm script
    node run.js -- "$1"
  fi
}
