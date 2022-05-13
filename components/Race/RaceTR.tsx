import React, {useState} from "react";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
import type { I18n } from 'next-translate'

export interface RaceRowTR {
	collapsed: boolean;
	hasOccured: boolean;
	hasMultipleFeaturedEvents: boolean;
	title: string;
	date: string;
	timezone: string;
	timeFormat: number;
	localeKey: string;
	locale?: string;
	i18n: I18n;
}

class RaceTR extends React.Component<RaceRowTR> {
	render() {
		const {t, lang} = this.props.i18n;
		
		/*
		// TODO:
		if (lang === "en") {
			dayjs.locale(this.props.locale);
		} else {
			dayjs.locale(lang);
		}
		*/

		const hasMultipleFeaturedEvents = this.props.hasMultipleFeaturedEvents;
		const titleKey = "localization:schedule." + this.props.title;

		if (hasMultipleFeaturedEvents) {
			var blankColumnCount = config.featuredSessions.length - 1;

			return (
				<tr className={`${this.props.collapsed ? "hidden" : ""} ${this.props.hasOccured ? "line-through text-gray-400" : ""}`}>
					<td className="w-1/8"></td>
					<td className="w-1/2 py-4 pl-2">{t(titleKey)}</td>
					<td className="w-1/3 text-right">
						<div className="relative right-3 sm:right-0">
							{dayjs(this.props.date)
								.tz(this.props.timezone)
								.format(
									this.props.timeFormat == 12
										? "D MMM h:mm A"
										: "D MMM HH:mm"
								)}
						</div>
					</td>
					<td />
				</tr>
			);
		} else {
			return (
				<tr className={`${this.props.collapsed ? "hidden" : ""} ${this.props.hasOccured ? "line-through text-gray-400" : ""}`}>
					<td className="w-1/8"></td>
					<td className="w-1/2 py-4 pl-5">{t(titleKey)}</td>
					<td className="w-1/6">
						{dayjs(this.props.date)
							.tz(this.props.timezone)
							.format("D MMM")}
					</td>
					<td className="w-1/6">
						<div className="relative right-3 sm:right-0">
							{dayjs(this.props.date)
								.tz(this.props.timezone)
								.format(this.props.timeFormat == 12 ? "h:mm A" : "HH:mm")}
						</div>
					</td>
					<td />
				</tr>
			);
		}
	}
}

export default RaceTR;
