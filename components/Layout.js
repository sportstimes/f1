import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Share from '../components/Share';
import Footer from '../components/Footer';

const Layout = props => {
	
	return (
    	<div className="content-wrapper">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>				
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
				<link rel="manifest" href="/site.webmanifest"/>
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#eb000f"/>
				<meta name="msapplication-TileColor" content="#000000"/>
				<meta name="theme-color" content="#ffffff"/>
			</Head>

			<Header showOptions={props.showOptions} year={props.year} />
			<div className="main-content">{props.children}</div>
			
			<Footer />
	  
	  
      <style jsx global>{`
	    @font-face{ 
			font-family: 'LeagueSpartan';
		    src: url('/fonts/leaguespartan-bold-webfont.woff2') format('woff2'),
		         url('/fonts/leaguespartan-bold-webfont.woff') format('woff');
		}
	      
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          height: 100%;
        }

        body {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          font-weight: 400;
          background: #000;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', 'Fira Sans', Avenir, 'Helvetica Neue',
            'Lucida Grande', sans-serif;
          text-rendering: optimizeLegibility;
          height: 100%;
        }
        
        
	    h1 {
		    font-size:16px;
		    font-family: 'LeagueSpartan';
		    text-transform:uppercase;
		    letter-spacing: 3px;
	    }
	    
	    h2 {
			font-size:11px;
			text-transform:uppercase;
			letter-spacing: 2px;
			font-size: 11px;
			font-family: 'LeagueSpartan';
	    }
        
	    h3 {
		    font-size: 20px;
		    text-transform:uppercase;
			font-family: 'LeagueSpartan';
	    }

        a {
          color: #353535;
          text-decoration: none;
        }

        a:hover {
          color: #151515;
        }

        p {
          margin: 0 0 10px;
        }

        .btn {
          background: #111;
          padding: 12px 24px;
          color: #fff;
          font-size: 18px;
          border: 0;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Layout */

		.content-wrapper {
			padding-bottom:16px;
		}

        .main-content {
	        max-width:1000px;
	        margin: 0 auto;
	        padding: 0 16px;
        }
      `}</style>
    </div>
  );
};

export default Layout;