import React, {useState, useContext} from "react"
import Link from "next/link"
import withTranslation from 'next-translate/withTranslation'
import type { I18n } from 'next-translate'
import CalendarIcon from '../Icons/CalendarIcon'
import ChevronRightIcon from '../Icons/ChevronRightIcon'
import EmailIcon from '../Icons/EmailIcon'
const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

class CTABar extends React.Component<Props> {
  render() {
	const { t, lang } = this.props.i18n

	if (config.supportsEmailReminders) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
				<div className="h-12">
					<Link href="/generate">
						<a className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
							{t("localization:options.calendar")}
							<CalendarIcon className="absolute left-3" />
							<ChevronRightIcon className="absolute right-3 top-4" />
						</a>
					</Link>
				</div>
				<div className="h-12">
					<Link href="/subscribe">
						<a className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
							{t("localization:options.email")}
							<EmailIcon className="absolute left-3" />
							<ChevronRightIcon className="absolute right-3 top-4" />
						</a>
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div className="grid grid-cols-1 pt-4">
				<div className="h-12">
					<Link href="/generate">
						<a className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
							{t("localization:options.calendar")}
							<CalendarIcon className="absolute left-3" />
							<ChevronRightIcon className="absolute right-3 top-4" />
						</a>
					</Link>
				</div>
			</div>
		);
	}
  }
}

export default withTranslation(CTABar);
