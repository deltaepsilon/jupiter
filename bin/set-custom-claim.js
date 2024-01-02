const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const path = require('path');
const credentialPath = path.join(__dirname, '../apps/firebase/service-account.json');

process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialPath;

const app = initializeApp({
  credential: applicationDefault(),
  projectId: 'photos-tools-2022',
});

const auth = getAuth(app);

(async () => {
  const userId = 'Us0r3SJ5wYOIVGWD5iwQgdKRGyv1';
  await auth.setCustomUserClaims(userId, { stripeRole: 'subscriber' });
  const userRecord = await auth.getUser(userId);

  console.log('userRecord', userRecord.customClaims);
})();
