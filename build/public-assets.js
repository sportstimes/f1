const fs = require(`fs`);
const promises = require(`fs`).promises;

const siteFolder = `_public/${process.env.NEXT_PUBLIC_SITE_KEY}`;

let filenames = fs.readdirSync(siteFolder);
filenames.forEach((file) => { 
	fs.copyFile(`_public/${process.env.NEXT_PUBLIC_SITE_KEY}/${file}`, `public/${file}`, (err) => { 
		console.log("Copied file... ", file);
	});
}); 
