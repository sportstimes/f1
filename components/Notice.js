import styles from './Notice.module.scss'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

export default function Notice() {
	const { t, lang } = useTranslation()

	return <>
		<section className={styles.notice}>
			<p>Thanks for joining us for the 2020 F1 Season. <Link href="/next-year"><a>Read about our plans for 2021...</a></Link></p>
			<div className="clear"></div>
		</section>
	</>
}