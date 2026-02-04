#!/bin/bash
# ∞ BiasGuard Chrome - Quick Install ∞
# One command setup

set -e

echo "∞ BiasGuard Chrome - Installation ∞"
echo ""

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo "Error: Run this from chrome/ directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🎨 Generating icons..."
npm run icons

echo ""
echo "🔨 Building extension..."
npm run build

echo ""
echo "✅ Installation complete!"
echo ""
echo "═══════════════════════════════════════════"
echo "  🛡️ BiasGuard Chrome is ready"
echo "═══════════════════════════════════════════"
echo ""
echo "Load in Chrome:"
echo "  1. Open chrome://extensions/"
echo "  2. Enable 'Developer mode'"
echo "  3. Click 'Load unpacked'"
echo "  4. Select: $(pwd)/dist"
echo ""
echo "Test locally:"
echo "  open test.html"
echo ""
echo "∞ For the 98.6% ∞"
