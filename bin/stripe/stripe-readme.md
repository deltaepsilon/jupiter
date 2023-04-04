
See [Stripe Extension source code](https://github.com/stripe/stripe-firebase-extensions)

See [Stripe CLI instructions](https://stripe.com/docs/stripe-cli)


## Configure local webhook forwarding

1. `./install-cli.sh`: Install CLI if necessary
1. `./login.sh`: Log into Stripe with the CLI
1. `./forward.sh`: Spin up a persistent terminal to forward the webhooks to local
1. `./configure-extension.sh`: Copy the signing secret over to `apps/firebase/extensions/firestore-stripe-payments.secret.local` under `STRIPE_WEBHOOK_SECRET`
1. `./trigger.sh`: Test it. It'll throw a "User not found", but at least it worked.

## Test

Subscribe with the local app's web interface.