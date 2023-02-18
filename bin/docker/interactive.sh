SCRIPT_PATH=$PWD/$(dirname $0)
ENV_FILE=$SCRIPT_PATH/../../apps/web/.env

docker run --rm -it --entrypoint bash -p 3000:8080 --env-file $ENV_FILE jupiter-web