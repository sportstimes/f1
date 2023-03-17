import React, {useState} from "react";
import withTranslation from 'next-translate/withTranslation'
import type { I18n } from 'next-translate'

interface Props {
	i18n: I18n;
	mobileOnly?: boolean;
}

class TBCBadge extends React.Component<Props> {
  render() {
	const { t, lang } = this.props.i18n

	return (
		<span title={t("localization:badges.tbc_title")} className={`bg-yellow-400 rounded px-1 md:px-2 py-1 text-xsm text-black font-bold ml-2 ${this.props.mobileOnly ? "display sm:hidden" : ""}`}>
			{t(`localization:badges.tbc`)}
		</span>
	);
  }
}

export default withTranslation(TBCBadge);