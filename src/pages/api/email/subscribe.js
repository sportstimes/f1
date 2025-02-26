import admin from 'firebase-admin';

export default async (req, res) => {
  if (!req.body.identifier) {
    return res.status(400).json({
      success: false,
      message: 'No identifier defined.',
    });
  }

  if (!req.body.email) {
    return res.status(400).json({
      success: false,
      message: 'No email defined.',
    });
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_CREDENTIALS),
      ),
    });
  }
  const db = admin.firestore();

  let email = req.body.email;

  try {
    // Add a document with an auto-generated ID
    const docRef = await db
      .collection(`${process.env.NEXT_PUBLIC_SITE_KEY}-subscriptions`)
      .add({
        email: email,
      });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false });
  }
};
