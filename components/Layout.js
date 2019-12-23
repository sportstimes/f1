import Head from 'next/head';
import { useContext } from 'react';

import UserContext from '../components/UserContext';
import Header from '../components/Header';
import Share from '../components/Share';
import Footer from '../components/Footer';

const Layout = props => {
	
	const { timezone } = useContext(UserContext);
	
	return (
    	<div className="content-wrapper">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.12.0/css/all.css" integrity="sha384-ekOryaXPbeCpWQNxMwSWVvQ0+1VrStoPJq54shlYhR8HzQgig1v5fas6YgOqLoKz" crossOrigin="anonymous" />
			</Head>

			<Header showOptions={props.showOptions} year={props.year} />
			<div className="main-content">{props.children}</div>
			
			<Footer />
	  
	  
      <style jsx global>{`
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