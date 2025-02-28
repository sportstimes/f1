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
  const email = req.body.email;
  const collectionName = `${process.env.NEXT_PUBLIC_SITE_KEY}-subscriptions`;

  try {
    // Check if the email already exists in the collection
    const querySnapshot = await db
      .collection(collectionName)
      .where('email', '==', email)
      .get();

    if (!querySnapshot.empty) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists.',
      });
    }

    // If email doesn't exist, add a new document
    const docRef = await db.collection(collectionName).add({
      email: email,
      identifier: req.body.identifier,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.json({
      success: true,
      message: 'Subscription added successfully.',
      id: docRef.id,
    });
  } catch (error) {
    console.error('Error adding subscription:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
    });
  }
};
