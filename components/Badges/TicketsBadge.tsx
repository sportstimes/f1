import React, {useState} from "react"
import withTranslation from 'next-translate/withTranslation'
import type { I18n } from 'next-translate'

class TicketsBadge extends React.Component<Props> {
  render() {
	const { t, lang } = this.props.i18n

	return (
		<span title={t("localization:badges.tbc_title")} className={`bg-green-600 hover:bg-green-700 rounded px-1 md:px-2 py-1 text-xxs sm:text-xs text-black font-normal sm:font-bold ml-2`}>
			{t("localization:badges.tickets")}
		</span>
	);
  }
}

export default withTranslation(TicketsBadge);