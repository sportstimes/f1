const siteKey = process.env.NEXT_PUBLIC_SITE_KEY;
const gitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE;

if(gitMessage.includes('#')){
	if(gitMessage.includes(siteKey)){
		return true;
	} else {
		return false;
	}
} else {
	return true;
}