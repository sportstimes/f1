import React, {useState, useContext} from 'react';
import Link from 'next-translate/Link'
import styles from './CTABar.module.scss'
import withTranslation from 'next-translate/withTranslation'
import fixHref from 'next-translate/fixHref'
import {Col, Row} from "react-grid-system"

class CTABar extends React.Component {

    render() {
        const {t, lang} = this.props.i18n

        return (
            <Row className={styles.ctaBar} gutterWidth={0} justify={"between"} spacing={1}>
                <Col md={5.95} className={styles.cta}>
                    <Link href="/generate">
                        <a>
                            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="white"
                                      d="M320 332v8c0 6.6-5.4 12-12 12h-68v68c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-68h-68c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h68v-68c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v68h68c6.6 0 12 5.4 12 12zm128-220v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v52h192V12c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-416 0v48h384v-48c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16zm384 352V192H32v272c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16z"/>
                            </svg>
                            {t('common:options.calendar')}
                            <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 448">
                                <path fill="white"
                                      d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                            </svg>
                        </a>
                    </Link>
                </Col>
                <Col md={5.95} className={styles.cta}>
                    <Link href="/subscribe">
                        <a>
                            <svg className={styles.mailIcon}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="white" d="M592 96H240c-26.47 0-48 21.53-48 48v16h32v-16c0-8.84 7.16-16 16-16h352c8.84 0 16 7.16 16 16v224c0 8.84-7.16 16-16 16H416v32h176c26.47 0 48-21.53 48-48V144c0-26.47-21.53-48-48-48zM96 48c0-8.84 7.16-16 16-16h288c8.84 0 16 7.16 16 16v16h32V48c0-26.47-21.53-48-48-48H112C85.53 0 64 21.53 64 48v112h32V48zm464 208c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16h-64c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h64zm-48-64h32v32h-32v-32zm-176 0H48c-26.47 0-48 21.53-48 48v224c0 26.47 21.53 48 48 48h288c26.47 0 48-21.53 48-48V240c0-26.47-21.53-48-48-48zm16 272c0 8.84-7.16 16-16 16H48c-8.84 0-16-7.16-16-16V313.6c12.8 9.6 32 25.6 96 70.4 12.8 9.6 38.4 32 64 32s51.2-22.4 64-32c64-44.8 83.2-60.8 96-70.4V464zm0-188.8c-25.6 19.2-22.4 19.2-115.2 86.4-9.6 3.2-28.8 22.4-44.8 22.4s-35.2-19.2-44.8-25.6C54.4 291.2 57.6 291.2 32 272v-32c0-8.84 7.16-16 16-16h288c8.84 0 16 7.16 16 16v35.2z"/></svg>

                            {t('common:options.email')}
                            <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 448">
                                <path fill="white"
                                      d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                            </svg>
                        </a>
                    </Link>
                </Col>
            </Row>
        );
    }
}

export default withTranslation(CTABar)