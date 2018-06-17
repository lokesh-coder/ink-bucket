#!/bin/sh
echo "The version would be: $1"
echo "export const INKAPP_VERSION='$1'" > ./src/environments/version.ts
echo "Version file updated!"