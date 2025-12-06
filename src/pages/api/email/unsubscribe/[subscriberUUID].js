import admin from 'firebase-admin';

export default async (req, res) => {
  if (!req.query.subscriberUUID) {
    return res.status(400).json({
      success: false,
      message: 'No email defined.',
    });
  }

  const config = await import(
    `../../../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`
  );
  if (!config.supportsEmailReminders) {
    return res.status(400).json({
      success: false,
      message: "Site doesn't support email reminders.",
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

  let subscriberUUID = req.query.subscriberUUID;

  try {
    // Get a reference to the document
    const docRef = db
      .collection(`${process.env.NEXT_PUBLIC_SITE_KEY}-subscriptions`)
      .doc(subscriberUUID);

    // Delete the document
    await docRef.delete();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(200).json({ success: false });
  }
};
