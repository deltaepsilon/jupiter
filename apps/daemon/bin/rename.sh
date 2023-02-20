#!/bin/bash
SCRIPT_PATH=$PWD/$(dirname $0) # /root/dev/jupiter/apps/daemon/bin
DAEMON_PATH=$(dirname $SCRIPT_PATH) # /root/dev/jupiter/apps/daemon
DIST_PATH=$DAEMON_PATH/dist # /root/dev/jupiter/apps/daemon/dist

for file in $DIST_PATH/index-*; do
  mv $file $(echo "$file" | sed s/index-/daemon-/)
done