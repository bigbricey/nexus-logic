#!/bin/bash

# Configuration
BUNDLE_NAME="nexus-logic-bundle-v1"
DIST_DIR="./dist"

echo "🚀 Packaging Nexus Logic Bundle..."

# Create dist directory
rm -rf $DIST_DIR
mkdir -p $DIST_DIR/$BUNDLE_NAME

# List of servers
SERVERS=("sec-pulse" "scientific-sentinel" "local-lead-scraper" "social-sentiment" "biotech-intelligence")

for SERVER in "${SERVERS[@]}"; do
    echo "📦 Packaging $SERVER..."
    mkdir -p $DIST_DIR/$BUNDLE_NAME/$SERVER
    
    # Copy necessary files
    cp -r ./servers/$SERVER/build $DIST_DIR/$BUNDLE_NAME/$SERVER/
    cp ./servers/$SERVER/package.json $DIST_DIR/$BUNDLE_NAME/$SERVER/
    cp ./servers/$SERVER/README.md $DIST_DIR/$BUNDLE_NAME/$SERVER/ 2>/dev/null || :
    
    # Create a small startup script for each
    echo "node build/index.js" > $DIST_DIR/$BUNDLE_NAME/$SERVER/start.sh
    chmod +x $DIST_DIR/$BUNDLE_NAME/$SERVER/start.sh
done

# Add a global README
cat <<EOF > $DIST_DIR/$BUNDLE_NAME/README.md
# Nexus Logic Premium Bundle v1.0

Thank you for your purchase. This bundle contains 5 premium MCP servers:

1. SEC Pulse
2. Scientific Sentinel
3. Local Lead Scraper
4. Social Sentiment
5. Biotech Intelligence

## Installation
For each server:
1. Navigate to the folder.
2. Run \`npm install --production\`.
3. Add the server to your Claude Desktop config or your preferred MCP client.

(c) 2026 Nexus Logic
EOF

# Zip it up
cd $DIST_DIR
zip -r ../$BUNDLE_NAME.zip $BUNDLE_NAME

echo "✅ Bundle created: $BUNDLE_NAME.zip"
echo "📍 Total size: \$(du -h ../$BUNDLE_NAME.zip | cut -f1)"
