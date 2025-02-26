const { JWT } = require('google-auth-library');

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

  const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
  const SCOPES = [MESSAGING_SCOPE];

  var serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
  const jwtClient = new JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: SCOPES,
  });
  const tokens = await jwtClient.authorize();

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

    // Create a results object to track success/failure
    const results = {
      subscribed: [],
      unsubscribed: [],
      failed: [],
    };

    // Process subscriptions
    for (const topic of topicsToSubscribe) {
      try {
        var subscribeData = {
          to: `/topics/${siteKey}-${topic}`,
          registration_tokens: [token],
        };

        const subscribeResponse = await fetch(
          'https://iid.googleapis.com/iid/v1:batchAdd',
          {
            body: JSON.stringify(subscribeData),
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + tokens.access_token,
              access_token_auth: true,
            },
            method: 'POST',
          },
        );

        const res = await subscribeResponse.text();

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
        var unsubscribeData = {
          to: `/topics/${siteKey}-${topic}`,
          registration_tokens: [token],
        };

        const unsubscribeResponse = await fetch(
          'https://iid.googleapis.com/iid/v1:batchRemove',
          {
            body: JSON.stringify(unsubscribeData),
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + tokens.access_token,
              access_token_auth: true,
            },
            method: 'POST',
          },
        );

        await unsubscribeResponse.text();

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
