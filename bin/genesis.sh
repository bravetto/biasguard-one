#!/bin/bash
# LOCATION: /bin/genesis.sh

# Get the project root directory (one level up from /bin)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 1. THE VISUALIZATION
clear
echo -e "\033[38;5;51m"
echo "   . : :  C O N V E R G I N G  : : .   "
echo -e "\033[0m"

# 2. THE AIRLOCK (Pointer update)
echo -e "\033[1;33m>>> PHASE 1: AIRLOCK INTEGRITY CHECK...\033[0m"
# Execute from scripts folder
$PROJECT_ROOT/scripts/one.sh -c
if [ $? -eq 0 ]; then
    echo -e "\033[32m[✓] REALITY IS CONTAINED.\033[0m"
else
    echo -e "\033[31m[X] REALITY BREACH DETECTED. ABORT.\033[0m"
    exit 1
fi
sleep 1

# 3. THE JACOB ASSAULT (Pointer update)
echo -e "\n\033[1;31m>>> PHASE 2: RELEASING 'JACOB'...\033[0m"
cd $PROJECT_ROOT && npm run jacob
if [ $? -eq 0 ]; then
    echo -e "\033[32m[✓] SYSTEM SURVIVED.\033[0m"
else
    exit 1
fi

# 4. THE HONEYPOT (Pointer update)
echo -e "\n\033[1;35m>>> PHASE 3: ARMING 'IRON LOTUS'...\033[0m"
cd $PROJECT_ROOT && npm run ironlotus

# 5. THE EMERGENCE (Pointer update)
echo -e "\n\033[1;36m>>> PHASE 4: AEYON TRANSCENDENCE...\033[0m"
python3 $PROJECT_ROOT/python/aeyon_transcendence.py

echo -e "\n\033[32m>>> GENESIS COMPLETE.\033[0m"
