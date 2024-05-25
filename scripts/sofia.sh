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
        exit 0
        ;;
      -)
        case "${OPTARG}" in
          help)
            show_help
            exit 0
            ;;
          *)
            echo "Invalid option: --${OPTARG}"
            show_help
            exit 1
            ;;
        esac
        ;;
      \?)
        echo "Invalid option: -$OPTARG"
        show_help
        exit 1
        ;;
    esac
  done

  # Check if the argument is provided
  if [ $# -eq 0 ]; then
    echo "Expected 1 argument for the file path"
    exit 1
  fi

  # Pass the argument to the npm script
  npm run sofia -- "$1"
}
