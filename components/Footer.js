import styles from './Footer.module.scss'
import useTranslation from 'next-translate/useTranslation'

export default function Footer() {
    const { t } = useTranslation()

    return <>
        <footer className={styles.footer}>
            <p className={styles.support}>
                <a target="_blank" href="https://www.buymeacoffee.com/f1cal">
                    <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="{ t('common:footer.coffee') }" height="25" />
                    <span>{ t('common:footer.coffee') }</span>
                </a>
            </p>
            <p className="attribute">
                &copy;&nbsp;
                <a href="https://andydev.co.uk" rel="author developer">Andrew Yates</a>,&nbsp;
                <a href="https://andyhiggs.uk/" rel="author designer">Andy Higgs</a>,&nbsp;
                <a href="https://sijobling.com" rel="author developer">Si Jobling</a> &amp;&nbsp;
                <a href="http://abitgone.co.uk/" rel="author">Ant Williams</a> 2020
            </p>
            <p>
                { t('common:footer.links.wereOn') } <a href="https://twitter.com/f1cal" className="twitter">Twitter</a> ·&nbsp;
                { t('common:footer.links.openSourcedOn') } <a href="https://github.com/sportstimes/f1">GitHub</a> · &nbsp;
                { t('common:footer.links.spottedIssue') } <a href="https://twitter.com/intent/tweet?text=%40f1cal%20I%20spotted%20an%20issue...">{ t('common:footer.links.spottedReport') }</a>
            </p>
            <p>Formula One, Formula 1, F1 & Grand Prix are trademarks of Formula One Licensing BV.</p>
        </footer>
    </>
}