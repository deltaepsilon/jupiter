SCRIPT_PATH=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd ) # /<path to project>/bin/utils
PROJECT_PATH=`echo $(dirname $SCRIPT_PATH) | sed 's/\/bin//'` # /<path to project>

echo $SCRIPT_PATH
cd $SCRIPT_PATH/apps/firebase

npx firebase ext:configure firestore-stripe-payments --local