import React, { FunctionComponent, ReactChildren, ReactChild, PropsWithChildren } from "react";
import useTranslation from 'next-translate/useTranslation'
import TopBar from "../../components/TopBar/TopBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import type { I18n } from 'next-translate'

type Props = PropsWithChildren<{
	showCTABar: boolean;
	year: number;
}>

const Layout: FunctionComponent<Props> = ({ showCTABar, children, year }: Props) => {
	const { t, lang } = useTranslation();

	return (
		<>
			<noscript>
				<div className="noscript">{t("localization:javascript")}</div>
			</noscript>

			<TopBar />

			<Header showCTABar={showCTABar} year={year} />

			<div className="max-w-screen-lg mx-auto font-sans px-2">
				{children}
			</div>

			<Footer />
		</>
	);
};

export default Layout;
