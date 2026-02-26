#!/usr/bin/env bash
set -e

# Count existing postcards (excludes _index.md) to determine next number
N=$(ls content/postcards/*.md 2>/dev/null | grep -v '_index' | wc -l | xargs)
N=$((N + 1))
DATE=$(date +%Y-%m-%d)
FILENAME="${N}-${DATE}.md"

hugo new "postcards/${FILENAME}"
echo "→ content/postcards/${FILENAME}"
