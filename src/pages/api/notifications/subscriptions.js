const { JWT } = require('google-auth-library');

export default async (req, res) => {
  if (!req.query.identifier) {
    return res.status(400).json({
      success: false,
      message: 'No identifier defined.',
    });
  }

  const config = await import(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`
  );
  let sessions = config.sessions;

  const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
  const SCOPES = [MESSAGING_SCOPE];

  var serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
  const jwtClient = new JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: SCOPES,
  });
  const tokens = await jwtClient.authorize();

  const response = await fetch(
    `https://iid.googleapis.com/iid/info/${req.query.identifier}?details=true`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokens.access_token,
        access_token_auth: true,
      },
      method: 'GET',
    },
  );

  const result = await response.json();

  var subscriptions = {};

  for await (const session of sessions) {
    let topicKey = `${process.env.NEXT_PUBLIC_SITE_KEY}-${session}`;

    if (result.rel.topics[topicKey] != null) {
      subscriptions[session] = true;
    } else {
      subscriptions[session] = false;
    }
  }

  return res.json({ success: true, subscriptions: subscriptions });
};
