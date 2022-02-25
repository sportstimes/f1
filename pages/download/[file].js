import { useRouter } from 'next/router'

function RedirectPage({ ctx }) {
  const router = useRouter()
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
	router.push('/home');
	return; 
  }
}

RedirectPage.getInitialProps = ctx => {
	// Handle any filename adjustments due to changes with race weekend formats...
	// e.g. Including Sprint races in previously generated calendars that request qualifying.
	// While supporting it as a seperate option in newly generated calendars.
	
	var fileName = ctx.query.file;
	
	if(process.env.NEXT_PUBLIC_SITE_KEY == "f1"){
		if(fileName.includes("_q_")){
			fileName = fileName.replace("_q_", "_qualifying_sprint_");
		}
	}
  
	console.log(fileName);
	
	if (ctx.res) {
		ctx.res.writeHead(302, { Location: '/home' });
		ctx.res.end();
	}
	return { };
}

export default RedirectPage