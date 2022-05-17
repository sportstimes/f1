import React, {useState} from "react";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
import type { I18n } from 'next-translate'
import useTranslation from 'next-translate/useTranslation'
import {useUserContext} from "../../components/UserContext";


export interface RaceRowTR {
	collapsed: boolean;
	hasOccured: boolean;
	hasMultipleFeaturedEvents: boolean;
	isNextRace: boolean;
	title: string;
	date: string;
	timezone: RaceRow;
	localeKey: string;
	locale?: string;
	isFeaturedSession: boolean;
}

const RaceTR: FunctionComponent = ({ hasMultipleFeaturedEvents, title, collapsed, hasOccured, isFeaturedSession, date, isNextRace }: RaceRowTR) => {

	/*
	// TODO:
	if (lang === "en") {
		dayjs.locale(this.props.locale);
	} else {
		dayjs.locale(lang);
	}
	*/

	const titleKey = "localization:schedule." + title;

	const {t, lang} = useTranslation();
	let {timezone, timeFormat} = useUserContext();
	
	if (hasMultipleFeaturedEvents) {
		var blankColumnCount = config.featuredSessions.length - 1;

		return (
			<tr className={`${collapsed ? "hidden" : ""} ${hasOccured ? "line-through text-gray-400" : ""}`}>
				<td className="w-1/8"></td>
				<td className="w-1/2 py-4 pl-2">{t(titleKey)}</td>
				<td className="w-1/3 text-right">
					<div className="relative right-3 sm:right-0">
						{dayjs(date)
							.tz(timezone)
							.format(
								timeFormat == 12
									? "D MMM h:mm A"
									: "D MMM HH:mm"
							)}
					</div>
				</td>
			</tr>
		);
	} else {
		return (
			<tr className={`${collapsed ? "hidden" : ""} ${hasOccured ? "line-through text-gray-400" : ""} ${!hasOccured && isFeaturedSession ? "font-bold" : ""} ${isNextRace && isFeaturedSession ? "text-yellow-600" : ""}`}>
				<td className="w-1/8"></td>
				<td className="w-1/2 py-4 pl-5">{t(titleKey)}</td>
				<td className="w-1/6">
					{dayjs(date)
						.tz(timezone)
						.format("D MMM")}
				</td>
				<td className="w-1/6">
					<div className={`relative right-3 sm:right-0`}>
						{dayjs(date)
							.tz(timezone)
							.format(timeFormat == 12 ? "h:mm A" : "HH:mm")}
					</div>
				</td>
			</tr>
		);
	}
}

export default RaceTR;
