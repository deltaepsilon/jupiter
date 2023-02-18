#!/usr/bin/env bash

UNAME=$(uname)
DAEMON='daemon-linux'

echo $UNAME

if [ "$UNAME" == 'Linux' ]; then
    DAEMON='daemon-linux'
elif [ "$UNAME" == 'Darwin' ]; then
    DAEMON='daemon-macos'
fi

echo "Starting $DAEMON"