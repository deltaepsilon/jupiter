import * as admin from 'firebase-admin';

let app: admin.app.App;

export function getApp() {
  if (!app) {
    app = admin.initializeApp(JSON.parse(process.env.FIREBASE_CONFIG as string) as admin.AppOptions);
  }

  return app;
}
