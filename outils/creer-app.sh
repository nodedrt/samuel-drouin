#!/bin/bash
# Construit l'app « Site Samuel » dans ~/Applications (aucun Xcode nécessaire).
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
APP="$HOME/Applications/Site Samuel.app"
if ! xcrun --find swiftc >/dev/null 2>&1; then
  echo "Il faut d'abord installer les outils Apple : une fenêtre va s'ouvrir, clique « Installer », puis relance cette commande."
  xcode-select --install || true
  exit 1
fi
echo "Construction de l'app…"
rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
xcrun swiftc -O -swift-version 5 -parse-as-library -target "$(uname -m)-apple-macos12.0" "$DIR/SiteSamuel.swift" -o "$APP/Contents/MacOS/SiteSamuel"
cat > "$APP/Contents/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key><string>Site Samuel</string>
  <key>CFBundleDisplayName</key><string>Site Samuel</string>
  <key>CFBundleIdentifier</key><string>com.samueldrouin.site</string>
  <key>CFBundleExecutable</key><string>SiteSamuel</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleShortVersionString</key><string>2.0</string>
  <key>CFBundleVersion</key><string>2</string>
  <key>LSMinimumSystemVersion</key><string>12.0</string>
  <key>NSHighResolutionCapable</key><true/>
  <key>NSDocumentsFolderUsageDescription</key><string>L'app lit et met à jour le dossier de ton site dans Documents.</string>
  <key>NSDesktopFolderUsageDescription</key><string>Pour ajouter des photos depuis ton Bureau.</string>
  <key>NSDownloadsFolderUsageDescription</key><string>Pour ajouter des photos depuis tes Téléchargements.</string>
</dict>
</plist>
PLIST
codesign --force --deep -s - "$APP" >/dev/null 2>&1 || true
mkdir -p "$HOME/Documents/samuel-drouin-nouveaux-projets"
echo "C'est prêt : $APP"
open "$APP"
