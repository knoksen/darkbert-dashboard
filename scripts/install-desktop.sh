#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DESKTOP_FILE="$HOME/.local/share/applications/darkbert-dashboard.desktop"
ICON_FILE="$ROOT_DIR/Assets/icon.png"

mkdir -p "$HOME/.local/share/applications"

cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=DarkBERT Dashboard
Comment=Launch the DarkBERT Dashboard locally
Exec=bash -lc 'cd "$ROOT_DIR" && npm run dev'
Terminal=true
Categories=Development;Utility;
StartupNotify=true
EOF

if [ -f "$ICON_FILE" ]; then
  printf 'Icon=%s\n' "$ICON_FILE" >> "$DESKTOP_FILE"
fi

chmod +x "$DESKTOP_FILE"

echo "Desktop launcher created at $DESKTOP_FILE"
echo "You can now launch DarkBERT Dashboard from your applications menu."
