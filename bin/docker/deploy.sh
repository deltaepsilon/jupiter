PROJECT_ID=photos-tools-2022
DEPLOY_NAME=jupiter-web
SCRIPT_PATH=$PWD/$(dirname $0)
REPOSITORY=docker-images
REGISTRY=us-central1-docker.pkg.dev

# $SCRIPT_PATH/build.sh
docker build . -t $DEPLOY_NAME:latest
PROJECT_ID=$PROJECT_ID $SCRIPT_PATH/../gcloud/configure.sh

gcloud config set run/region us-central1
gcloud config set account chris@christopheresplin.com
gcloud auth configure-docker us-central1-docker.pkg.dev

# gcloud builds submit --tag gcr.io/$PROJECT_ID/$DEPLOY_NAME
# gcloud builds list
docker tag $DEPLOY_NAME:latest $REGISTRY/$PROJECT_ID/$REPOSITORY/$DEPLOY_NAME
docker push $REGISTRY/$PROJECT_ID/$REPOSITORY/$DEPLOY_NAME
gcloud run deploy $DEPLOY_NAME --allow-unauthenticated --port=3000 --image $REGISTRY/$PROJECT_ID/$REPOSITORY/$DEPLOY_NAME