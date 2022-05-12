import React, {useState} from "react";
import withTranslation from 'next-translate/withTranslation'
import type { I18n } from 'next-translate'

interface Props {
	i18n: I18n;
}

class NextBadge extends React.Component<Props> {
  render() {
	const { t, lang } = this.props.i18n

	return (
		<span className={`bg-yellow-500 rounded px-1 md:px-2 py-1 text-xxs sm:text-xs text-black font-normal sm:font-bold ml-2 ${this.props.mobileOnly ? "display sm:hidden" : ""}`}>
			{t(`localization:badges.next`)}
		</span>
	);
  }
}

export default withTranslation(NextBadge);
