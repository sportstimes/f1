import React from "react";
import TopBar from "../../components/TopBar/TopBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import withTranslation from 'next-translate/withTranslation'
import type { I18n } from 'next-translate'

interface Props {
	i18n: I18n;
	showCTABar: boolean;
	children: any;
	year: number;
}

class FullWidthLayout extends React.Component<Props> {
	render() {
		const { t, lang } = this.props.i18n		

		return (
			<>
				<noscript>
					<div className="noscript">{t("localization:javascript")}</div>
				</noscript>
	
				<TopBar />
	
				<Header showCTABar={this.props.showCTABar} year={this.props.year} />
	
				{this.props.children}
	
				<Footer />
			</>
		);
	};
};

export default withTranslation(FullWidthLayout);
