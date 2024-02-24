import Link from "next/link"
import {useTranslations} from 'next-intl';
import F1Logo from "../Logo/Logos/F1Logo"
import F1AcademyLogo from "../Logo/Logos/F1AcademyLogo"
import F2Logo from "../Logo/Logos/F2Logo"
import F3Logo from "../Logo/Logos/F3Logo"
import FELogo from "../Logo/Logos/FELogo"
import WSeriesLogo from "../Logo/Logos/WSeriesLogo"
import ExtremeELogo from "../Logo/Logos/ExtremeELogo"
import MotoGPLogo from "../Logo/Logos/MotoGPLogo"
import IndyCarLogo from "../Logo/Logos/IndyCarLogo"

export default function Logo() {
	const t = useTranslations('All');

	switch (process.env.NEXT_PUBLIC_SITE_KEY) {
		case "f1":
			return (<F1Logo />);
		case "f2":
			return (<F2Logo />);
		case "f3":
			return (<F3Logo />);
		case "fe":
			return (<FELogo />);
		case "wseries":
			return (<WSeriesLogo />);
		case "extremee":
			return (<ExtremeELogo />);
		case "motogp":
			return (<MotoGPLogo />);
		case "indycar":
			return (<IndyCarLogo />);
		case "f1-academy":
			return (<F1AcademyLogo />);
		default:
			return <div></div>;
	}
}
