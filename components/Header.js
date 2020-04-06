import React, { Component } from 'react';
import Logo from "./Logo";
import Link from 'next/link';
import OptionsBar from "./OptionsBar";
import styles from './Header.module.scss'

export function Header(props) {
  return (
    <header className={styles.header}>
    	<div className={styles.container}>
    		<div className={styles.branding}>
  	  		<div className={styles.logomark}>
  			  	<Logo />
  		  	</div>
    			<div className={styles.headers}>
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
  		    <div className={styles.clear}></div>
    		</div>
  	    <div className={styles.clear}></div>
  	    { props.showOptions &&
    	    <OptionsBar showCalendarExport={props.showCalendarExport} />
  	    }
      </div>
    </header>
  )
}

export default Header;