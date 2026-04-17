#!/usr/bin/env bash
set -e

FILE="$1"

if [ -z "$FILE" ]; then
  # mapfile -d '' DRAFTS < <(grep -rlZ '^draft: true' content/ --include='*.md' 2>/dev/null | sort -z)  # requires bash 4+
  DRAFTS=()
  while IFS= read -r -d '' f; do
    DRAFTS+=("$f")
  done < <(grep -rlZ '^draft: true' content/ --include='*.md' 2>/dev/null | sort -z)

  if [ ${#DRAFTS[@]} -eq 0 ]; then
    echo "No drafts found."
    exit 0
  fi

  if [ ${#DRAFTS[@]} -eq 1 ]; then
    FILE="${DRAFTS[0]}"
  else
    echo "Drafts:"
    echo ""
    for i in "${!DRAFTS[@]}"; do
      TITLE=$(grep '^title:' "${DRAFTS[$i]}" | head -1 | sed 's/^title: *//' | tr -d '"')
      printf "  %d) %s" "$((i + 1))" "${DRAFTS[$i]}"
      [ -n "$TITLE" ] && printf "  — %s" "$TITLE"
      echo ""
    done
    echo ""
    read -rp "Enter number (or q to quit): " CHOICE

    [[ "$CHOICE" == "q" ]] && exit 0

    if ! [[ "$CHOICE" =~ ^[0-9]+$ ]] || [ "$CHOICE" -lt 1 ] || [ "$CHOICE" -gt "${#DRAFTS[@]}" ]; then
      echo "Invalid selection."
      exit 1
    fi

    FILE="${DRAFTS[$((CHOICE - 1))]}"
  fi
fi

if [ ! -f "$FILE" ]; then
  echo "Error: file not found: $FILE"
  exit 1
fi

TITLE=$(grep '^title:' "$FILE" | head -1 | sed 's/^title: *//' | tr -d '"')
TODAY=$(date +%Y-%m-%d)

echo ""
echo "  File:  $FILE"
[ -n "$TITLE" ] && echo "  Title: $TITLE"
echo "  Date:  $TODAY"
echo ""
read -rp "Publish? [y/N] " CONFIRM

[[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]] && echo "Cancelled." && exit 0

sed -i '' "s/^date: .*/date: ${TODAY}/" "$FILE"
sed -i '' "s/^draft: true/draft: false/" "$FILE"

git add "$FILE"
echo "→ Published: $FILE (date: $TODAY)"
