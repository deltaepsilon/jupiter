#!/bin/bash
SCRIPT_PATH=$PWD/$(dirname $0) # /root/dev/jupiter/apps/daemon/bin
DAEMON_PATH=$(dirname $SCRIPT_PATH) # /root/dev/jupiter/apps/daemon
NOW=$(date +"%Y%m%d%H%M%S") # 20210315120000

getMD5() {
  FILEPATH=$1
  echo $FILEPATH | md5sum | awk '{print $1}'
}

INDEX_FILEPATH=$DAEMON_PATH/index.js

# Write the index.json file
MD5=$(getMD5 $INDEX_FILEPATH)
JSON="{ \"md5\": \"$MD5\", \"date\": \"$NOW\", \"url\": \"https://photos-tools-2022.web.app/daemon/dist.json\" }"
echo "Writing: $DAEMON_PATH/dist.json"
echo $JSON > $DAEMON_PATH/dist.json