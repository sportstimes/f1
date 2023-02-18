import React, {useState, useContext} from "react"
import Link from "next/link"
import withTranslation from 'next-translate/withTranslation'
import type { I18n } from 'next-translate'
import CalendarIcon from '../Icons/CalendarIcon'
import ChevronRightIcon from '../Icons/ChevronRightIcon'
import EmailIcon from '../Icons/EmailIcon'
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

let beamsClient: PusherPushNotifications.Client | undefined = undefined;

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
		try {
			beamsClient = new PusherPushNotifications.Client({
				instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE,
			});
			
			this.setState({ supportsWebPush: true })
		} catch(error) {
			
			console.log(error);
			
			if(error.message.includes("Pusher Beams does not support this browser version")){
				this.setState({ supportsWebPush: false })
			}
		}
	}
	
	render() {
		const { t, lang } = this.props.i18n
		
		let gridCTAs = 1;
		if(config.supportsEmailReminders) gridCTAs += 1;
		if(config.supportsWebPush && this.state.supportsWebPush) gridCTAs += 1;
		
		return (
			<div className={`grid grid-cols-${gridCTAs} gap-2 pt-4`}>
				<div className="h-12">
					<Link href="/generate" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
						{t("localization:options.calendar")}
						<CalendarIcon className="absolute left-3" />
						<ChevronRightIcon className="absolute right-3 top-4" />
					</Link>
				</div>
				{config.supportsEmailReminders > 0 &&
					<div className="h-12">
						<Link href="/subscribe" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
							{t("localization:options.email")}
							<EmailIcon className="absolute left-3" />
							<ChevronRightIcon className="absolute right-3 top-4" />
						</Link>
					</div>
				}
				{config.supportsWebPush > 0 && this.state.supportsWebPush &&
					<div className="h-12">
						<Link href="/notifications" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
							{t("localization:options.notifications")}
							<EmailIcon className="absolute left-3" />
							<ChevronRightIcon className="absolute right-3 top-4" />
						</Link>
					</div>
				}
			</div>
		);
		
		
		if (config.supportsEmailReminders) {
			return (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
					<div className="h-12">
						<Link href="/generate" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
							{t("localization:options.calendar")}
							<CalendarIcon className="absolute left-3" />
							<ChevronRightIcon className="absolute right-3 top-4" />
						</Link>
					</div>
					<div className="h-12">
						<Link href="/subscribe" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
							{t("localization:options.email")}
							<EmailIcon className="absolute left-3" />
							<ChevronRightIcon className="absolute right-3 top-4" />
						</Link>
					</div>
				</div>
			);
		} else {
			return (
				<div className="grid grid-cols-1 pt-4">
					<div className="h-12">
						<Link href="/generate" className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative">
							{t("localization:options.calendar")}
							<CalendarIcon className="absolute left-3" />
							<ChevronRightIcon className="absolute right-3 top-4" />
						</Link>
					</div>
				</div>
			);
		}
	}
}

export default withTranslation(CTABar);
