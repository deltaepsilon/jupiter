import { addDoc, collection, doc, getDoc } from 'firebase/firestore/lite';
import { useAuth, useFirebase } from 'ui/contexts';
import { useCallback, useState } from 'react';

import { FIREBASE } from 'data/firebase';
import { WEB } from 'data/web';
import { retry } from 'ui/utils';
import { useRouter } from 'next/router';

export type StripeReturnValue = ReturnType<typeof useStripe>;

export function useStripe() {
  const { user } = useAuth();
  const { db } = useFirebase();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const redirectToSubscription = useCallback(async () => {
    try {
      if (db && user) {
        setIsRedirecting(true);

        const payload = {
          price: WEB.STRIPE.PRICE,
          success_url: `${location.origin}${WEB.STRIPE.SUCCESS}`,
          cancel_url: `${location.origin}${WEB.STRIPE.CANCEL}`,
          allow_promotion_codes: true,
        };
        const checkoutSessionsCollection = collection(db, FIREBASE.FIRESTORE.COLLECTIONS.CHECKOUT_SESSIONS(user.uid));
        const docRef = await addDoc(checkoutSessionsCollection, payload);

        return retry(
          async () => {
            const snapshot = await getDoc(docRef);
            const data = snapshot.data();

            if (!data?.url) {
              throw new Error('url is not defined');
            } else {
              router.push(data.url);
            }
          },
          { attempts: 10, millis: 500 }
        )();
      } else {
        throw new Error('db or user is not defined');
      }
    } catch (error) {
      console.error({ db, user });

      setIsRedirecting(false);

      throw error;
    }
  }, [db, router, user]);

  return { isRedirecting, redirectToSubscription };
}
