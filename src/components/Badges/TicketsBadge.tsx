import React, {useState} from "react"

interface Props {
	i18n: I18n;
}

class TicketsBadge extends React.Component<Props> {
  render() {
	return (
		<span title={t('badges.tickets')} className={`bg-green-600 hover:bg-green-700 rounded px-1 md:px-2 py-1 text-xxs sm:text-xs text-black font-normal sm:font-bold ml-2`}>
			{t('badges.tickets')}
		</span>
	);
  }
}

export default TicketsBadge;