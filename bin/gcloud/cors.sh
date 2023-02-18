# See https://cloud.google.com/functions/docs/securing/managing-access-iam#console_5

gcloud functions add-iam-policy-binding batchGetMediaItems --member="allUsers" --role="roles/cloudfunctions.invoker"
gcloud functions add-iam-policy-binding listMediaItems --member="allUsers" --role="roles/cloudfunctions.invoker"
gcloud functions add-iam-policy-binding refreshMediaItemStats --member="allUsers" --role="roles/cloudfunctions.invoker"
gcloud functions add-iam-policy-binding getAuthUrl --member="allUsers" --role="roles/cloudfunctions.invoker"
gcloud functions add-iam-policy-binding setLibraryImportStatus --member="allUsers" --role="roles/cloudfunctions.invoker"