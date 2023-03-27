#!/bin/sh

backup_id="$1"
source="$2"
destination="$3"
backup_type="$4"
environment="$5"

if [ "$#" -ne 5 ]; then
  echo "Usage: $0 <backup_id> <source> <destination> <backup_type> <environment>"
  exit 1
fi

timestamp="$(date +%Y-%m-%d_%H:%M:%S)"
log_dir="/data/logs/$backup_id"
log_file="$log_dir/${backup_type}_backup_id-${backup_id}_${timestamp}.log"

mkdir -p "$log_dir"

if [ "$environment" = "development" ]; then
  case "$backup_type" in
    full)
      find "$source" -type f >"$log_file" 2>&1
      ;;
    cumulative)
      rsync -avz --delete --dry-run "$source/" "$destination/" >"$log_file" 2>&1
      ;;
    *)
      echo "Invalid backup type: $backup_type" >&2
      echo "Valid backup types are 'full' and 'cumulative'" >&2
      exit 1
      ;;
  esac
elif [ "$environment" = "production" ]; then
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
else
  echo "Invalid environment: $environment" >&2
  echo "Valid environments are 'development' and 'production'" >&2
  exit 1
fi
