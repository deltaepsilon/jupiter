SCRIPT_PATH=$PWD/$(dirname $0) # /root/dev/jupiter/apps/daemon/bin
DAEMON_PATH=$(dirname $SCRIPT_PATH) # /root/dev/jupiter/apps/daemon
DIST_PATH=$DAEMON_PATH/dist # /root/dev/jupiter/apps/daemon/dist
VENDOR_PATH=$DAEMON_PATH/vendor # /root/dev/jupiter/apps/daemon/vendor
VENDOR_CONFIG_PATH=$DAEMON_PATH/vendor/custom.cfg # /root/dev/jupiter/apps/daemon/vendor
WEB_DAEMON_PATH=$DAEMON_PATH/../web/public/daemon # /root/dev/jupiter/apps/web/daemon

buildDaemon() {
  DAEMON_DIRECTORY=$DIST_PATH/quiver-photos-$1 # /root/dev/jupiter/apps/daemon/dist/linux
  DAEMON_FILEPATH=$DAEMON_DIRECTORY/$2 # /root/dev/jupiter/apps/daemon/dist/linux/daemon-linux
  DAEMON_VENDOR_TARGET=$DAEMON_DIRECTORY/vendor # /root/dev/jupiter/apps/daemon/dist/linux/vendor
  DAEMON_VENDOR_DIRECTORY=$VENDOR_PATH/$3 # /root/dev/jupiter/apps/daemon/vendor/exiftool-12.55

  rm -rf $DAEMON_DIRECTORY || true
  rm -rf $DAEMON_VENDOR_TARGET || true
  mkdir -p $DAEMON_VENDOR_TARGET/exiftool
  
  ls $DAEMON_VENDOR_TARGET
  cp $DAEMON_VENDOR_DIRECTORY -r $DAEMON_VENDOR_TARGET
  cp $VENDOR_CONFIG_PATH  $DAEMON_DIRECTORY/vendor
  cp $DAEMON_PATH/readme.txt  $DAEMON_DIRECTORY/readme.txt

  cp $DIST_PATH/$2 $DAEMON_FILEPATH

  echo "Built $1"
}

echo "Building daemons..."
buildDaemon "linux-x64" "daemon-linux-x64" "Image-ExifTool-12.55"
buildDaemon "linux-arm64" "daemon-linux-arm64" "Image-ExifTool-12.55"
buildDaemon "macos-x64" "daemon-macos-x64" "Image-ExifTool-12.55"
buildDaemon "windows-x64" "daemon-win-x64.exe" "exiftool-12.55"
buildDaemon "windows-arm64" "daemon-win-x64.exe" "exiftool-12.55"

echo "Zipping folders..."
zipFolder() {
  FOLDER=$1
  ZIP_FILE=$FOLDER.zip
  rm $ZIP_FILE

  cd $FOLDER
  pwd
  zip -rq $ZIP_FILE *

  cd $SCRIPT_PATH
  pwd
}
LIST=$(find $DIST_PATH -mindepth 1 -maxdepth 1 -type d;)
for FOLDER in $LIST; do
  zipFolder $FOLDER
done

echo "Copying daemons..."
rm -rf $WEB_DAEMON_PATH || true
cp -r $DIST_PATH $WEB_DAEMON_PATH
cp $DAEMON_PATH/dist.json $WEB_DAEMON_PATH

rm $WEB_DAEMON_PATH/daemon*

echo Distributed daemon to $WEB_DAEMON_PATH

echo "Copying to local windows Downloads folder for testing ease..."
rm -rf /mnt/c/Users/chris/Downloads/daemon || true
cp -r $WEB_DAEMON_PATH /mnt/c/Users/chris/Downloads/ || true

