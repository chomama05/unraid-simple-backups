#!/bin/sh

backup_type="$1"
source="$2"
destination="$3"
backup_id="$4"

if [ "$#" -ne 4 ]; then
  echo "Usage: $0 <backup_type> <source> <destination> <backup_id>"
  exit 1
fi

timestamp="$(date +%Y%m%d_%H%M%S)"
log_dir="/data/logs/$backup_id"
log_file="$log_dir/backup_${timestamp}.log"

mkdir -p "$log_dir"

case "$backup_type" in
  full)
    tar -czvf "$destination/backup_${timestamp}.tar.gz" -C "$source" . >"$log_file" 2>&1
    ;;
  cumulative)
    rsync -avz --delete "$source/" "$destination/" >"$log_file" 2>&1
    ;;
  *)
    echo "Invalid backup type: $backup_type" >&2
    echo "Valid backup types are 'full' and 'cumulative'" >&2
    exit 1
    ;;
esac
