import dayjs from 'dayjs';
import admin from 'firebase-admin';
import { getMessaging } from 'firebase-admin/messaging';

export default async (req, res) => {
  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  if (!config.supportsWebPush && !config.supportsEmailReminders) {
    res.json({ success: true, message: "Doesn't support web push or email." });
    return;
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_CREDENTIALS),
      ),
    });
  }
  const db = admin.firestore();

  const cutoffDate = dayjs(Date()).subtract(3, 'minutes');

  // Grab any documents which have a scheduledAt date in the past, which means we should send them...
  // But only if they're not older than 3 minutes, if they are something has gone wrong and there not sending

  const docRef = db
    .collection(`${process.env.NEXT_PUBLIC_SITE_KEY}-queue`)
    .where('scheduledAt', '<', new Date())
    .where('scheduledAt', '>', cutoffDate.toDate());
  const docSnapshot = await docRef.get();

  if (docSnapshot.empty) {
    console.log('Nothing to send');
    res.json({ success: true, message: 'Nothing to send!' });
    return;
  }

  console.log('We have something to send...');

  for await (let item of docSnapshot.docs) {
    const scheduledItem = item.data();
    const title = scheduledItem.title;
    const body = scheduledItem.body;

    if (scheduledItem.type == 'push') {
      try {
        const payload = {
          notification: {
            title: title,
            body: body,
          },
          topic: scheduledItem.topic,
        };

        await getMessaging().send(payload);

        // Remove the document so we don't send it again!
        await item.ref.delete();
      } catch (error) {
        console.log('pusherror ' + error);
      }
    } else if (scheduledItem.type == 'email') {
      try {
        var postmark = require('postmark');
        var client = new postmark.ServerClient(process.env.POSTMARK_KEY, {
          timeout: 60,
        });

        // Retrieve recipients...
        const subscriptionsRef = db.collection(
          `${process.env.NEXT_PUBLIC_SITE_KEY}-subscriptions`,
        );
        const subscriptionsSnapshot = await subscriptionsRef.get();

        // Prepare all of the messages...
        const messages = [];
        for await (let subItem of subscriptionsSnapshot.docs) {
          const subscriber = subItem.data();
          messages.push({
            From: 'F1 Calendar <hello@f1calendar.com>',
            To: subscriber.email,
            TemplateAlias: process.env.NEXT_PUBLIC_SITE_KEY,
            TemplateModel: {
              race: title,
              identifier: subItem.id,
            },
            InlineCss: true,
          });
        }

        // Send messages in batches of 500 with delay between batches
        const batchSize = 500;
        const delayBetweenBatches = 1000; // 1 seconds delay between batches

        console.log(
          `Sending ${messages.length} emails in batches of ${batchSize}`,
        );

        let queueItemDeleted = false;
        let successCount = 0;

        for (let i = 0; i < messages.length; i += batchSize) {
          // Get current batch
          const batch = messages.slice(i, i + batchSize);

          // Log batch progress
          console.log(
            `Sending batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(messages.length / batchSize)} (${batch.length} emails)`,
          );

          try {
            // Send current batch
            await client.sendEmailBatchWithTemplates(batch);
            successCount += batch.length;
            console.log(
              `Successfully sent batch ${Math.floor(i / batchSize) + 1}`,
            );

            // Delete the queue item after the first successful batch
            if (!queueItemDeleted) {
              await item.ref.delete();
              queueItemDeleted = true;
              console.log(`Queue item deleted after first successful batch`);
            }
          } catch (error) {
            console.error(
              `Error sending batch ${Math.floor(i / batchSize) + 1}:`,
              error,
            );
            // Continue with next batch
          }

          // If this isn't the last batch, add delay before sending next batch
          if (i + batchSize < messages.length) {
            console.log(
              `Waiting ${delayBetweenBatches}ms before sending next batch...`,
            );
            await new Promise((resolve) =>
              setTimeout(resolve, delayBetweenBatches),
            );
          }
        }

        console.log(
          `Email sending complete. Total emails sent: ${successCount}/${messages.length}`,
        );

        // If we somehow didn't delete the queue item yet (should be rare), delete it now
        if (!queueItemDeleted) {
          await item.ref.delete();
          console.log(`Queue item deleted at completion`);
        }
      } catch (error) {
        console.log('Processing error:' + error);
      }
    } else if (scheduledItem.type == 'buffer') {
      const response = await fetch(
        `https://api.bufferapp.com/1/updates/create.json?access_token=${encodeURI(process.env.BUFFER_TOKEN)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `text=${encodeURIComponent(scheduledItem.title)}&profile_ids[]=63ff8ab4a439208bacf17292&profile_ids[]=63ff8acfa439208bacf26e2a&profile_ids[]=66a7b97b602872be45535406&now=1`,
        },
      );
      const data = await response.json();

      let threadsText = scheduledItem.title.replace(
        '#f1 #formula1',
        '#F1Threads',
      );

      const response2 = await fetch(
        `https://api.bufferapp.com/1/updates/create.json?access_token=${encodeURI(process.env.BUFFER_TOKEN)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `text=${encodeURIComponent(threadsText)}&profile_ids[]=667b2a5c7839e9e8795ef3bf&now=1`,
        },
      );
      const data2 = await response2.json();

      // Remove the document so we don't send it again!
      await item.ref.delete();
    }
  }

  res.json({ success: true });
};
