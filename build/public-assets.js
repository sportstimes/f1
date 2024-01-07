const fs = require(`fs`);
const promises = require(`fs`).promises;

const siteFolder = `_public/${process.env.NEXT_PUBLIC_SITE_KEY}`;

// App Files (Files that should be added to src/app so Next generates various icons for us)
let appFiles = ["favicon.ico", "icon.ico", "apple-icon.png"];

// Public Files
let filenames = fs.readdirSync(siteFolder);
filenames.forEach((file) => { 
	fs.copyFile(`_public/${process.env.NEXT_PUBLIC_SITE_KEY}/${file}`, `public/${file}`, (err) => { 
		console.log("Copied file... ", file);
	});
	
	if(appFiles.includes(file)){
		fs.copyFile(`_public/${process.env.NEXT_PUBLIC_SITE_KEY}/${file}`, `src/app/${file}`, (err) => { 
			console.log("Copied file... ", file);
		});
	}
}); 