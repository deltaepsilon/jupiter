SCRIPT_PATH=$PWD/$(dirname $0) # /root/dev/jupiter/apps/daemon/bin
DAEMON_PATH=$(dirname $SCRIPT_PATH) # /root/dev/jupiter/apps/daemon
DIST_PATH=$DAEMON_PATH/dist # /root/dev/jupiter/apps/daemon/dist
VENDOR_PATH=$DAEMON_PATH/vendor # /root/dev/jupiter/apps/daemon/vendor
LAUNCHERS_PATH=$DAEMON_PATH/launchers # /root/dev/jupiter/apps/daemon/launchers
VENDOR_CONFIG_PATH=$DAEMON_PATH/vendor/custom.cfg # /root/dev/jupiter/apps/daemon/vendor
WEB_DAEMON_PATH=$DAEMON_PATH/../web/public/daemon # /root/dev/jupiter/apps/web/daemon
NOW=$(date +"%Y%m%d%H%M%S") # 20210315120000

buildDaemon() {
  DAEMON_DIRECTORY=$DIST_PATH/$1 # /root/dev/jupiter/apps/daemon/dist/linux
  DAEMON_FILEPATH=$DAEMON_DIRECTORY/$2 # /root/dev/jupiter/apps/daemon/dist/linux/daemon-linux
  DAEMON_VENDOR_TARGET=$DAEMON_DIRECTORY/vendor # /root/dev/jupiter/apps/daemon/dist/linux/vendor
  DAEMON_VENDOR_DIRECTORY=$VENDOR_PATH/$3 # /root/dev/jupiter/apps/daemon/vendor/exiftool-12.55

  rm -rf $DAEMON_DIRECTORY
  rm -rf $DAEMON_VENDOR_TARGET
  mkdir -p $DAEMON_VENDOR_TARGET/exiftool
  
  ls $DAEMON_VENDOR_TARGET
  cp $DAEMON_VENDOR_DIRECTORY -r $DAEMON_VENDOR_TARGET
  cp $VENDOR_CONFIG_PATH  $DAEMON_DIRECTORY/vendor

  cp $DIST_PATH/$2 $DAEMON_FILEPATH

  echo $FILEPATH | md5sum | awk '{print $1}' > $DIST_PATH/$1/md5.txt
  echo $NOW > $DIST_PATH/$1/date.txt
}

for file in $DIST_PATH/index-*; do
  mv $file $(echo "$file" | sed s/index-/daemon-/)
done

echo "starting to build daemons"

buildDaemon "linux-x64" "daemon-linux-x64" "Image-ExifTool-12.55"
buildDaemon "linux-arm64" "daemon-linux-arm64" "Image-ExifTool-12.55"
buildDaemon "macos-x64" "daemon-macos-x64" "Image-ExifTool-12.55"
buildDaemon "windows-x64" "daemon-x64.exe" "exiftool-12.55"
buildDaemon "windows-arm64" "daemon-x64.exe" "exiftool-12.55"

rm -rf $WEB_DAEMON_PATH
cp -r $DIST_PATH $WEB_DAEMON_PATH
cp -r $LAUNCHERS_PATH $WEB_DAEMON_PATH

rm $WEB_DAEMON_PATH/daemon*


rm -rf /mnt/c/Users/chris/Downloads/daemon
cp -r $WEB_DAEMON_PATH /mnt/c/Users/chris/Downloads/

echo Distributed daemon to $WEB_DAEMON_PATH
