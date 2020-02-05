import React, { Component } from 'react';
import Logo from "./Logo";
import Link from 'next/link';
import OptionsBar from "./OptionsBar";

const Header = props => (
  <header className="header">
  	<div className="container">
  		<div className="branding">
	  		<div className="logomark">
			  	<Logo />
		  	</div>
			<div className="headers">
				<h1>
					<Link href="/">
					<a>
					Formula One Race Calendar&nbsp;
					{ props.year && 
						<span>{ props.year }</span>
					}
					</a>
					</Link>
				</h1>
		    	<h2><Link href="/"><a>Races, Qualifying &amp; Practice Sessions</a></Link></h2>
	    	</div>
		    <div className="clear"></div>
		</div>
		
		{ props.showPreseason &&
			<Link href="/preseason">
				<a className="preseason">
					Get ready for { props.year } &#187;
					<span>View Car Launches &amp; Pre-Season Testing</span>
				</a>
			</Link>
		}
	    
	    
	    <div className="clear"></div>
	    
	    { props.showOptions &&
	    <OptionsBar showCalendarExport={props.showCalendarExport} />
	    }
    </div>
    <style jsx>{`
	    .header {
		    background:#011612;
		    color:#fff;
		    margin-bottom: 16px;
	    }
	    
	    .branding {
		    padding: 25px 0;
		    float:left;
	    }
	    
	    .preseason {
		    float:right;
		    background:#eb000f;
		    padding:5px 10px 5px 10px;
		    border-radius: 3px 3px 3px 3px;
			-moz-border-radius: 3px 3px 3px 3px;
			-webkit-border-radius: 3px 3px 3px 3px;
		    color:#fff;
		    margin-top:30px;
	    }
	    .preseason span {
			display:block;
			font-size:11px;
	    }
	    
	    .clear {
			clear:both;   
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
	    h1 a {
		    color:#ffffff;
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
	    h2 a {
		    color:#1a8b73;
	    }
	    
	    @media screen and (max-width: 900px) {
			.logomark {
				margin: 0 auto 10px auto;
				float:none;
			}
			
			.headers {
				float:none;
				margin: 0 auto;
			}
				
			h1 {
				text-align:center;
				margin-bottom:16px;
				font-size:14px;
			}
			
			h2 {
				text-align:center;
				margin-bottom:0;
				font-size:10px;
			}
			
			.branding {
			    padding: 25px 0 10px 0;
			    float:none;
		    }
		    
		    .preseason {
			    margin: 16px 0;
				float:none;
				display:block;   
		    }
		}
    `}</style>
  </header>
);

export default Header;