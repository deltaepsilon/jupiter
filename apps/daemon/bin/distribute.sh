SCRIPT_PATH=$PWD/$(dirname $0) # /root/dev/jupiter/apps/daemon/bin
DIST_PATH=$(dirname $SCRIPT_PATH)/dist # /root/dev/jupiter/apps/daemon/dist
VENDOR_PATH=$(dirname $SCRIPT_PATH)/vendor # /root/dev/jupiter/apps/daemon/vendor
VENDOR_CONFIG_PATH=$(dirname $SCRIPT_PATH)/vendor/custom.cfg # /root/dev/jupiter/apps/daemon/vendor
WEB_DAEMON_PATH=$(dirname $SCRIPT_PATH)/../web/public/daemon # /root/dev/jupiter/apps/web/daemon
NOW=$(date +"%Y%m%d%H%M%S") # 20210315120000


buildDaemon() {
  DAEMON_DIRECTORY=$DIST_PATH/$1 # /root/dev/jupiter/apps/daemon/dist/linux
  DAEMON_FILEPATH=$DAEMON_DIRECTORY/$2 # /root/dev/jupiter/apps/daemon/dist/linux/daemon-linux
  DAEMON_VENDOR_TARGET=$DAEMON_DIRECTORY/vendor # /root/dev/jupiter/apps/daemon/dist/linux/vendor
  DAEMON_VENDOR_DIRECTORY=$VENDOR_PATH/$3 # /root/dev/jupiter/apps/daemon/vendor/exiftool-12.55

  rm -rf $DAEMON_DIRECTORY
  rm -rf $DAEMON_VENDOR_TARGET
  mkdir -p $DAEMON_DIRECTORY
  
  cp $DAEMON_VENDOR_DIRECTORY -r $DAEMON_VENDOR_TARGET
  cp $VENDOR_CONFIG_PATH -r $DAEMON_DIRECTORY

  cp $DIST_PATH/$2 $DAEMON_FILEPATH

  echo $FILEPATH | md5sum | awk '{print $1}' > $DIST_PATH/$1/md5.txt
  echo $NOW > $DIST_PATH/$1/date.txt
}


buildDaemon "linux" "daemon-linux" "Image-ExifTool-12.55"
buildDaemon "macos" "daemon-macos" "Image-ExifTool-12.55"
buildDaemon "windows" "daemon-win.exe" "exiftool-12.55"

rm -rf $WEB_DAEMON_PATH
cp -r $DIST_PATH $WEB_DAEMON_PATH
rm $WEB_DAEMON_PATH/daemon*
