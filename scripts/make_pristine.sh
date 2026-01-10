#!/bin/bash

# =========================================================
#  BIASGUARD: PRISTINE PROTOCOL
#  "A place for everything, and everything in its place."
# =========================================================

echo ">>> INITIATING ENTROPY REDUCTION..."

# 1. CREATE THE ARCHITECTURE
mkdir -p bin
mkdir -p config/rules
mkdir -p docs
mkdir -p scripts
mkdir -p python
mkdir -p tests/fixtures
mkdir -p src/core
mkdir -p src/security
mkdir -p src/adversarial

# 2. MIGRATE SHELL SCRIPTS (Logic goes to scripts/)
echo ">>> Migrating Shell Logic..."
mv one.sh scripts/ 2>/dev/null
mv fortress.sh scripts/ 2>/dev/null
mv truth.sh scripts/ 2>/dev/null

# 3. MIGRATE ENTRY POINTS (Executables go to bin/)
echo ">>> Migrating Executables..."
mv genesis.sh bin/ 2>/dev/null
chmod +x bin/genesis.sh

# 4. MIGRATE DOCUMENTATION
echo ">>> Migrating Knowledge..."
mv AIRLOCK.md docs/ 2>/dev/null
mv RUN_TESTS.md docs/ 2>/dev/null
mv LICENSE.md docs/ 2>/dev/null
# We keep README.md in root for GitHub display

# 5. MIGRATE CONFIGURATION
echo ">>> Migrating Configurations..."
mv containment.rules config/rules/ 2>/dev/null
mv .cursorrules config/ 2>/dev/null

# 6. MIGRATE PYTHON
echo ">>> Migrating Python Bridge..."
mv biasguard-one/* python/ 2>/dev/null
rm -rf biasguard-one

# 7. MIGRATE TEST FIXTURES
echo ">>> Migrating Test Fixtures..."
mv *.txt tests/fixtures/ 2>/dev/null

echo "================================================="
echo "   FILESYSTEM IS PRISTINE."
echo "   ROOT DIRECTORY CONTAINS ONLY MANIFESTS."
echo "   RUN PROJECT VIA: ./bin/genesis.sh"
echo "================================================="

