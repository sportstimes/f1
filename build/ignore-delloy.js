const siteKey = process.env.NEXT_PUBLIC_SITE_KEY;
const gitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE;

if(gitMessage.contains('#')){
	if(gitMessage.contains(siteKey)){
		return true;
	} else {
		return false;
	}
} else {
	return true;
}