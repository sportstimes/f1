import React, { Component } from 'react';
import Logo from "./Logo";
import OptionsBar from "./OptionsBar";
import styles from './Header.module.scss'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next-translate/Link'

export function Header(props) {
  const { t, lang } = useTranslation()
  const title = t('common:title')
  
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
        					{ title }&nbsp;
        					{ props.year && 
        						<span>{ props.year }</span>
        					}
        					
        					{ lang != "en" &&
          					 <span> | {lang.toUpperCase()}</span>
        					}
        					
      					</a>
    					</Link>
    				</h1>
  		    	<h2><Link href="/"><a>{ t('common:subtitle') }</a></Link></h2>
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