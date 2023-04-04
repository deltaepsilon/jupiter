echo "Copy stripe signing secret to apps/firebase/extensions/firestore-stripe-payments.secret.local under STRIPE_WEBHOOK_SECRET"

stripe listen --forward-to http://127.0.0.1:5001/photos-tools-2022/us-central1/ext-firestore-stripe-payments-handleWebhookEvents