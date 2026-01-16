#!/bin/bash

# BiasGuard Landing Page - Local Development Server
# Run: bash landing/serve.sh

echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                                                                   ║"
echo "║              🛡️  BiasGuard Landing Page Server                   ║"
echo "║                                                                   ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""
echo "Starting local server..."
echo ""
echo "🌐 Landing page: http://localhost:8000"
echo "📱 Mobile preview: http://$(ipconfig getifaddr en0 || hostname):8000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

cd "$(dirname "$0")"
python3 -m http.server 8000
