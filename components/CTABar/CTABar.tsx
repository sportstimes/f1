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
		  supportsWebPush: false,
		  isInstalled: false
		};
	}
	
	componentDidMount() {
		var installed = false;
		if(window.navigator.standalone) {
			installed = true;
		}
		
		if(window.matchMedia('(display-mode: standalone)').matches){
			installed = true;
		}

		if ('Notification' in window) {
			this.setState({ supportsWebPush: true, isInstalled:installed })
		}
	}
	
	render() {
		const { t, lang } = this.props.i18n
		
		return (
			<div className={`grid grid-col-1 md:flex pt-4 gap-3 gap-y-2`}>
				{!this.state.isInstalled &&
					<div className="h-12 grow">
						<Link href="/generate" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
							{t("localization:options.calendar")}
							<CalendarIcon className="absolute left-3 self-center" />
							<ChevronRightIcon className="absolute right-3 top-4" />
						</Link>
					</div>
				}
				{!this.state.isInstalled && config.supportsEmailReminders > 0 &&
					<div className="h-12 grow">
						<Link href="/subscribe" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
							{t("localization:options.email")}
							<EmailIcon className="absolute left-3 self-center" />
							<ChevronRightIcon className="absolute right-3 top-4" />
						</Link>
					</div>
				}
				{config.supportsWebPush > 0 && this.state.supportsWebPush && !this.state.isInstalled &&
					<div className="h-12">
						<Link href="/notifications" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative" title={t("localization:options.notifications")}>
							<NotificationIcon className="absolute left-3.5 self-center" />
							<span className="visible md:hidden">{t("localization:options.notifications")}</span>
							<ChevronRightIcon className="visible md:hidden absolute right-3 top-4" />
						</Link>
					</div>
				}
				
				{config.supportsWebPush > 0 && this.state.supportsWebPush && this.state.isInstalled &&
					<div className="h-12 grow">
						<Link href="/notifications" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative" title={t("localization:options.notifications")}>
							<NotificationIcon className="absolute left-3.5 self-center" />
							{t("localization:options.notifications")}
							<ChevronRightIcon className="absolute right-3 top-4" />
						</Link>
					</div>
				}
				
			</div>
		);
	}
}

export default withTranslation(CTABar);
