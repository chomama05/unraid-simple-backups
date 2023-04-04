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

timestamp="$(date +%Y-%m-%d_%H.%M.%S)"
log_dir="/data/logs/$backup_id"
log_file="$log_dir/${backup_type}_backup_id-${backup_id}_${timestamp}.log"

mkdir -p "$log_dir"

echo "$(date +%Y-%m-%d_%H:%M:%S) - Starting ${backup_type} Backup" >"$log_file"

start_time=$(date +%s)
highest_exit_code=0

if [ "$environment" = "development" ]; then
  case "$backup_type" in
    full)
      find "$source" -type f >>"$log_file" 2>&1
      exit_code=$?
      ;;
    cumulative)
      rsync -avz --delete --dry-run "$source/" "$destination/" >>"$log_file" 2>&1
      exit_code=$?
      ;;
    *)
      echo "Invalid backup type: $backup_type" >&2
     	echo "Valid backup types are 'full' and 'cumulative'" >&2
  		highest_exit_code=1
  		;;
		esac
elif [ "$environment" = "production" ]; then
	mkdir -p "$destination"
	case "$backup_type" in
		full)
			tar -czvf "$destination/backup_${timestamp}.tar.gz" -C "$source" . >>"$log_file" 2>&1
			exit_code=$?
			;;
		cumulative)
			rsync -avz --delete "$source/" "$destination/" >>"$log_file" 2>&1
			exit_code=$?
			;;
		*)
			echo "Invalid backup type: $backup_type" >&2
			echo "Valid backup types are 'full' and 'cumulative'" >&2
			highest_exit_code=1
		;;
	esac
else
	echo "Invalid environment: $environment" >&2
	echo "Valid environments are 'development' and 'production'" >&2
	highest_exit_code=1
fi

if [ $exit_code -gt $highest_exit_code ]; then
	highest_exit_code=$exit_code
fi

end_time=$(date +%s)
elapsed_time=$((end_time - start_time))

if [ $elapsed_time -ge 3600 ]; then
	elapsed_time_hours=$(echo "scale=2; $elapsed_time / 3600" | bc)
	echo "$(date +%Y-%m-%d_%H:%M:%S) - ${backup_type} Backup completed in ${elapsed_time_hours} hours" >>"$log_file"
else
	elapsed_time_minutes=$(echo "scale=2; $elapsed_time / 60" | bc)
	echo "$(date +%Y-%m-%d_%H:%M:%S) - ${backup_type} Backup completed in ${elapsed_time_minutes} minutes" >>"$log_file"
fi

# Return the highest exit code encountered during the script execution
exit $highest_exit_code