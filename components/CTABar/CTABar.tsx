import React, {useState, useContext} from "react"
import Link from "next/link"
import withTranslation from 'next-translate/withTranslation'
import type { I18n } from 'next-translate'
import CalendarIcon from '../Icons/CalendarIcon'
import ChevronRightIcon from '../Icons/ChevronRightIcon'
import EmailIcon from '../Icons/EmailIcon'
import NotificationIcon from '../Icons/NotificationIcon'

const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

interface Props {
	i18n: I18n;
}

class CTABar extends React.Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
		  supportsWebPush: false
		};
	}
	
	componentDidMount() {
		// TODO: Determine if browser supports web push
		if ('Notification' in window) {
			this.setState({ supportsWebPush: true })
		}
	}
	
	render() {
		const { t, lang } = this.props.i18n
		
		let gridCTAs = 1;
		if(config.supportsEmailReminders) gridCTAs += 1;
		if(config.supportsWebPush && this.state.supportsWebPush) gridCTAs += 1;
		
		return (
			<div className={`grid grid-col-1 md:flex pt-4 gap-3 gap-y-2`}>
				<div className="h-12 grow">
					<Link href="/generate" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
						{t("localization:options.calendar")}
						<CalendarIcon className="absolute left-3" />
						<ChevronRightIcon className="absolute right-3 top-4" />
					</Link>
				</div>
				{config.supportsEmailReminders > 0 &&
					<div className="h-12 grow">
						<Link href="/subscribe" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
							{t("localization:options.email")}
							<EmailIcon className="absolute left-3" />
							<ChevronRightIcon className="absolute right-3 top-4" />
						</Link>
					</div>
				}
				{config.supportsWebPush > 0 && this.state.supportsWebPush &&
					<div className="h-12">
						<Link href="/notifications" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative" title={t("localization:options.notifications")}>
							<NotificationIcon className="absolute left-3.5" />
							<span className="visible md:hidden">{t("localization:options.notifications")}</span>
							<ChevronRightIcon className="visible md:hidden absolute right-3 top-4" />
						</Link>
					</div>
				}
			</div>
		);
	}
}

export default withTranslation(CTABar);
