const fs = require(`fs`);
const promises = require(`fs`).promises;

const siteFolder = `_public/${process.env.NEXT_PUBLIC_SITE_KEY}`;

// Copy site specific i18n file.
fs.copyFile(`_db/${process.env.NEXT_PUBLIC_SITE_KEY}/i18n.json`, `i18n.json`, (err) => { 
	console.log("Copied site i18n file");
});

let filenames = fs.readdirSync(siteFolder);
filenames.forEach((file) => { 
	fs.copyFile(`_public/${process.env.NEXT_PUBLIC_SITE_KEY}/${file}`, `public/${file}`, (err) => { 
		console.log("Copied file... ", file);
	});
}); 
