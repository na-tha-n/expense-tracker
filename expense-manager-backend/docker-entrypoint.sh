#!/bin/sh
set -e

if [ "$1" = 'server' ]; then
  flask db upgrade
  flask run --host=0.0.0.0
fi

exec "$@"
