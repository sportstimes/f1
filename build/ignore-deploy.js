const siteKey = process.env.NEXT_PUBLIC_SITE_KEY;
const gitBranch = process.env.VERCEL_GIT_COMMIT_REF;
const gitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE;

console.log(siteKey);
console.log(gitBranch);
console.log(gitMessage);

if(gitBranch.includes(siteKey)){
	console('Deploy');
	return 1;
} else if(gitMessage.includes('#')){
	if(gitMessage.includes(siteKey)){
		console('Deploy');
		return 1;
	} else {
		console('Ignore');
		return 0;
	}
} else {
	console('Deploy all');
	return 1;
}