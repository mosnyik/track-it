#!/usr/bin/env bash

# Usage: ./wait-for-it.sh <host>:<port> -- <command to execute after DB is ready>

set -e

host_port=$1
shift
cmd="$@"

host=$(echo $host_port | cut -d: -f1)
port=$(echo $host_port | cut -d: -f2)

echo "Waiting for $host:$port to be ready..."

while ! nc -z $host $port; do
  echo "Waiting for MySQL at $host:$port..."
  sleep 2
done

echo "MySQL is up - executing command"
exec $cmd

