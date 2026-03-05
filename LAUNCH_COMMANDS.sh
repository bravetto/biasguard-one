#!/bin/bash
# BiasGuard ONE v4.3.1 Launch Commands
# Execute these manually in your terminal

cd /Users/michaelmataluni/repos/products/biasguard

# 1. Create git tag
/opt/homebrew/bin/git tag -a v4.3.1 -m "BiasGuard ONE v4.3.1 - Production Release"

# 2. Push tag to GitHub
/opt/homebrew/bin/git push origin v4.3.1

# 3. List VSIX files for upload
echo "📦 VSIX files ready for GitHub Release:"
ls -lh /Users/michaelmataluni/repos/products/biasguard/*.vsix

echo ""
echo "✅ Tag created and pushed!"
echo ""
echo "🚀 Next Steps:"
echo "1. Go to: https://github.com/bravetto/biasguard/releases/new"
echo "2. Choose tag: v4.3.1"
echo "3. Title: BiasGuard ONE v4.3.1 - The Epistemic Guard"
echo "4. Copy release notes from LAUNCH_EXECUTION.md"
echo "5. Upload: biasguard-4.2.5-production.vsix + icon.png"
echo "6. Click 'Publish release'"
echo ""
echo "LoveQ! 💜 LFG! 🚀"
