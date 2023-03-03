import Document, { Html, Head, Main, NextScript } from 'next/document'
import withTranslation from 'next-translate/withTranslation'
import getT from 'next-translate/getT'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const originalRenderPage = ctx.renderPage
		const locale = ctx.locale;
		const t = await getT(locale, 'localization')
	
		// Run the React rendering logic synchronously
		ctx.renderPage = () =>
		  originalRenderPage({
			// Useful for wrapping the whole react tree
			enhanceApp: (App) => App,
			// Useful for wrapping in a per-page basis
			enhanceComponent: (Component) => Component,
		  })
	
		// Run the parent `getInitialProps`, it now includes the custom `renderPage`
		const initialProps = await Document.getInitialProps(ctx)
		
		return { ...initialProps, locale , t};
	  }
	
	
	render(){
		const title = this.props.t(`localization:` + process.env.NEXT_PUBLIC_SITE_KEY + `.title`);
		
		return (
	    	<Html lang={this.props.locale}>
		  	<Head>
			  	<meta
				  	name="viewport"
				  	content="width=device-width, initial-scale=1, maximum-scale=5"
			  	/>
			  	<link
				  	rel="apple-touch-icon"
				  	sizes="180x180"
				  	href="/apple-touch-icon.png"
			  	/>
			  	<link
				  	rel="icon"
				  	type="image/png"
				  	sizes="32x32"
				  	href="/favicon-32x32.png"
			  	/>
			  	<link
				  	rel="icon"
				  	type="image/png"
				  	sizes="16x16"
				  	href="/favicon-16x16.png"
			  	/>
			  	<link rel="manifest" href="/site.webmanifest" />
			  	<link
				  	rel="mask-icon"
				  	href="/safari-pinned-tab.svg"
				  	color="#eb000f"
			  	/>
			  	
			  	<meta name="msapplication-TileColor" content="#000000" />
			  	<meta name="theme-color" content="#03120f" />
			  	
			  	<meta name="apple-mobile-web-app-capable" content="yes" />
			  	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
			  	<meta name="apple-mobile-web-app-title" content={title} />
			  	<meta name="format-detection" content="telephone=no" />
			  	<meta name="mobile-web-app-capable" content="yes" />
			  	
			  	<link rel="preconnect" href="https://fonts.googleapis.com" /> 
			  	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> 
			  	<link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700;800&display=swap" rel="stylesheet" />
			  	
			  	{process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
				  	<meta
					  	name="google-site-verification"
					  	content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}
				  	/>
			  	)}
		  	</Head>
		  	<body>
				<Main />
				<NextScript />
		  	</body>
			</Html>
		);
	}
}

export default withTranslation(MyDocument);
