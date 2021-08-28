const siteKey = process.env.NEXT_PUBLIC_SITE_KEY;
const gitBranch = process.env.VERCEL_GIT_COMMIT_REF;
const gitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE;

if(gitBranch.includes(siteKey)){
	console.log('✅ - Build can proceed');
	process.exit(1)
} else if(gitMessage.includes('#')){
	if(gitMessage.includes(siteKey)){
		console.log('✅ - Build can proceed');
		process.exit(1)
	} else {
		console.log('🛑 - Build cancelled');
		process.exit(0)
	}
} else if(gitBranch.includes('all') || gitMessage.includes('all')){
	console.log('✅ - Build can proceed');
	process.exit(1)
} else {
	console.log('🛑 - Build cancelled');
	process.exit(0)
}