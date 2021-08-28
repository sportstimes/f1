const siteKey = process.env.NEXT_PUBLIC_SITE_KEY;
const gitBranch = process.env.VERCEL_GIT_COMMIT_REF;
const gitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE;

console.log(siteKey);
console.log(gitBranch);
console.log(gitMessage);

if(gitBranch.includes(siteKey)){
	console.log('Deploy');
	return 1;
} else if(gitMessage.includes('#')){
	if(gitMessage.includes(siteKey)){
		console.log('Deploy');
		return 1;
	} else {
		console.log('Ignore');
		return 0;
	}
} else {
	console.log('Deploy all');
	return 1;
}