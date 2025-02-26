import * as firebase from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

export default async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed, use POST',
    });
  }

  const { token, topics } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Request is missing token parameter',
    });
  }

  try {
    const config = await import(
      `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`
    );

    const siteKey = config.siteKey;
    const allTopics = config.sessions;

    // Get user subscriptions and add siteKey prefix
    const userSubscriptions = Array.isArray(topics) ? topics : [];

    // Topics to subscribe to
    const topicsToSubscribe = userSubscriptions.filter((sub) =>
      allTopics.includes(sub),
    );

    // Topics to unsubscribe from
    const topicsToUnsubscribe = allTopics.filter(
      (topic) => !topicsToSubscribe.includes(topic),
    );

    console.log('Topics to subscribe:', topicsToSubscribe);
    console.log('Topics to unsubscribe:', topicsToUnsubscribe);

    // Adjust the topic subscriptions prefixed with the sitekey
    if (!firebase.getApps().length) {
      firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      });
    }

    const messaging = getMessaging();

    // Create a results object to track success/failure
    const results = {
      subscribed: [],
      unsubscribed: [],
      failed: [],
    };

    // Process subscriptions
    for (const topic of topicsToSubscribe) {
      try {
        await messaging.subscribeToTopic(token, `${siteKey}-${topic}`);
        results.subscribed.push(topic);
      } catch (error) {
        console.error(`Failed to subscribe to topic ${topic}:`, error);
        results.failed.push({
          topic,
          operation: 'subscribe',
          error: error.message,
        });
      }
    }

    // Process unsubscriptions
    for (const topic of topicsToUnsubscribe) {
      try {
        await messaging.unsubscribeFromTopic(token, `${siteKey}-${topic}`);
        results.unsubscribed.push(topic);
      } catch (error) {
        console.error(`Failed to unsubscribe from topic ${topic}:`, error);
        results.failed.push({
          topic,
          operation: 'unsubscribe',
          error: error.message,
        });
      }
    }

    return res.status(200).json({
      success: true,
      token: token,
      results: results,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
