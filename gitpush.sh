#!/bin/bash

# Prompt user for commit message
echo -n "Enter commit message: "
read commit_message

# Run git commands
git add --all
git commit -m "$commit_message"
git push origin main
