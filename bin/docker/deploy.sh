PROJECT_ID=photos-tools-2022
DEPLOY_NAME=jupiter-web
REGION=us-central1
SCRIPT_PATH=$PWD/$(dirname $0)
REPOSITORY=docker-images
REGISTRY=$REGION-docker.pkg.dev

docker build . -t $DEPLOY_NAME:latest

gcloud config set run/region $REGION
gcloud auth configure-docker $REGISTRY

docker tag $DEPLOY_NAME:latest $REGISTRY/$PROJECT_ID/$REPOSITORY/$DEPLOY_NAME
docker push $REGISTRY/$PROJECT_ID/$REPOSITORY/$DEPLOY_NAME
gcloud run deploy $DEPLOY_NAME --allow-unauthenticated --port=3000 --image $REGISTRY/$PROJECT_ID/$REPOSITORY/$DEPLOY_NAME