import React, { Component } from 'react';
import Logo from "./Logo";
import Link from 'next/link';
import Timezone from "./Timezone";

const Header = props => (
  <header className="header">
  	<div className="container">
  		<div className="branding">
	  		<div className="logomark">
			  	<Logo />
		  	</div>
			<div className="headers">
				<h1>
					Formula One Race Calendar&nbsp;
					{ props.year && 
						<span>{ props.year }</span>
					}
				</h1>
		    	<h2>Races, Qualifying &amp; Practice Sessions</h2>
	    	</div>
		    <div className="clear"></div>
		</div>
	    
	    { props.showOptions &&
	    <Timezone />
	    }
    </div>
    <style jsx>{`
	    @font-face{ 
			font-family: 'LeagueSpartan';
		    src: url('/fonts/leaguespartan-bold-webfont.woff2') format('woff2'),
		         url('/fonts/leaguespartan-bold-webfont.woff') format('woff');
		}
	    
	    .header {
		    background:#011612;
		    color:#fff;
		    margin-bottom: 16px;
	    }
	    
	    .branding {
		    padding: 25px 0;
	    }
	    .container {
		    max-width:1000px;
		    padding: 8px 16px;
		    margin: 0 auto;
	    }
	    .logomark {
		    float:left;
		    width:60px;
		    height:60px;
		    margin-right:24px;
	    }
	    .headers {
	    	float:left;
	    }
	    h1 {
		    font-size:16px;
		    margin:0;
		    padding-top:8px;
		    font-family: 'LeagueSpartan';
		    text-transform:uppercase;
		    letter-spacing: 3px;
	    }
	    h2 {
			font-size:11px;   
			color: #1a8b73;
			text-transform:uppercase;
			margin:0;
			letter-spacing: 2px;
			font-size: 11px;
			font-family: 'LeagueSpartan';
	    }
	    
	    @media screen and (max-width: 900px) {
			.logomark {
				float:none;
				margin: 0 auto;
			}
			
			.headers {
				float:none;
				margin: 0 auto;
			}
				
			h1 {
				text-align:center;
				font-size:14px;
			}
			
			h2 {
				text-align:center;
				font-size:10px;
			}
		}
	    
	    .clear {
		    clear:both;
	    }
    `}</style>
  </header>
);

export default Header;