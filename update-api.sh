# #!/bin/bash

# echo "Starting generate-api.sh script..."

# # Enable debug mode
# set -x

# # Define variables
# SWAGGER_URL="https://localhost:5001/swagger/v1/swagger.json"
# GENERATE_API_PATH="./Website/package.json"
# TIMEOUT=300  # Timeout in seconds (5 minutes)
# INTERVAL=5   # Interval between retries in seconds

# # Function to check if Swagger JSON is available
# check_swagger() {
#   STATUS_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" $SWAGGER_URL)
#   if [ $STATUS_CODE -eq 200 ]; then
#     return 0 # Swagger is available
#   else
#     return 1 # Swagger is not available
#   fi
# }

# # Function to wait for the project to build and Swagger to become available
# wait_for_swagger() {
#   echo "Waiting for Swagger JSON to become available at $SWAGGER_URL..."

#   local start_time=$(date +%s)
#   local end_time=$((start_time + TIMEOUT))

#   while true; do
#     if check_swagger; then
#       echo "Swagger JSON is now available!"
#       return 0
#     fi

#     # Check if timeout has been reached
#     local current_time=$(date +%s)
#     if [ $current_time -ge $end_time ]; then
#       echo "Timeout reached: Unable to reach Swagger JSON at $SWAGGER_URL."
#       return 1
#     fi

#     echo "Swagger JSON not available yet. Retrying in $INTERVAL seconds..."
#     sleep $INTERVAL
#   done
# }

# # Wait for Swagger JSON to be available
# if ! wait_for_swagger; then
#   echo "Failed to connect to Swagger JSON at $SWAGGER_URL. Exiting script."
#   exit 1
# fi

# # Run the generate-api script from package.json
# echo "Running generate-api script..."
# (cd ./Website && npm run generate-api)

# echo "API client generation completed."

# # Disable debug mode
# set +x
