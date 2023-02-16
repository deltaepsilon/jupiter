#!/usr/bin/bash

gcloud config configurations list

if gcloud config configurations activate jupiter; then
  echo "Activating existing configuration: jupiter"
else
  gcloud config configurations create jupiter
  gcloud config configurations activate jupiter
  gcloud config set project $PROJECT_ID
  echo "Activating new configuration: jupiter"
fi

gcloud config set run/region us-central1
gcloud config set account chris@christopheresplin.com
gcloud auth configure-docker us-central1-docker.pkg.dev
