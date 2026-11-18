#!/usr/bin/env bash
# Renders scripts/one-pager/onepager.html to public/newtonschool-studio-one-pager.pdf
# using headless Chrome (A4, no header or footer).
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$DIR/../../public/newtonschool-studio-one-pager.pdf"

CHROME=""
for candidate in \
  "${CHROME_BIN:-}" \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "$(command -v google-chrome 2>/dev/null || true)" \
  "$(command -v google-chrome-stable 2>/dev/null || true)" \
  "$(command -v chromium 2>/dev/null || true)" \
  "$(command -v chromium-browser 2>/dev/null || true)"; do
  if [ -n "$candidate" ] && [ -x "$candidate" ]; then
    CHROME="$candidate"
    break
  fi
done

if [ -z "$CHROME" ]; then
  echo "Error: Chrome or Chromium not found. Install Google Chrome, or set CHROME_BIN to its executable path." >&2
  exit 1
fi

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" "file://$DIR/onepager.html"

echo "Wrote $(cd "$(dirname "$OUT")" && pwd)/$(basename "$OUT")"
