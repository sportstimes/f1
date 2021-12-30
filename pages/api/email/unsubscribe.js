import axios from 'axios';

export default async (req, res) => {
	if (!req.body.id) {
		return res.status(400).json({
			success: false,
			message: "No email defined."
		});
	}
	
	const config = await import(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)  
	
	let id = req.body.id;
		
	const token = `${process.env.NEXT_PUBLIC_LISTMONK_USERNAME}:${process.env.NEXT_PUBLIC_LISTMONK_PASSWORD}`;
	const encodedToken = Buffer.from(token).toString('base64');
	
	let data = {
		id: 'Name',
		email: email,
		status: 'enabled',
		lists: [config.emailReminderListID]
	};
	
	return res.status(400).json({success:false});
	
	// return axios.delete('https://mailer.f1calendar.com/api/subscribers', data, {
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		Authorization: 'Basic ' + encodedToken,
	// 	}
	// })
	// .then(async (response) => {
	// 	console.log(response);
	// 	return res.json({success:true});
	// })
	// .catch(async function (error) {
	// 	console.log(error.toJSON());
	// 	return res.status(400).json({success:false});
	// });
	
}