const siteKey = process.env.NEXT_PUBLIC_SITE_KEY;
const gitBranch = process.env.VERCEL_GIT_COMMIT_REF;
const gitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE;

console.log(siteKey);
console.log(gitBranch);
console.log(gitMessage);

if(gitBranch.includes(siteKey)){
	return true;
} else if(gitMessage.includes('#')){
	if(gitMessage.includes(siteKey)){
		return true;
	} else {
		return false;
	}
} else {
	return true;
}