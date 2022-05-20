import React, {useState, FunctionComponent} from "react";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
import type { I18n } from 'next-translate'
import useTranslation from 'next-translate/useTranslation'
import {useUserContext} from "../../components/UserContext";


export interface RaceRowTR {
	collapsed: Boolean;
	hasOccured: boolean;
	hasMultipleFeaturedEvents: boolean;
	isNextRace: boolean;
	title: string;
	date: string;
	isFeaturedSession: boolean;
}


const RaceTR: FunctionComponent<RaceRowTR> = ({ hasMultipleFeaturedEvents, title, collapsed, hasOccured, isFeaturedSession, date, isNextRace }: RaceRowTR) => {

	const {t, lang} = useTranslation();

	if (lang != "en") {
		dayjs.locale(lang);
	}
	

	const titleKey = "localization:schedule." + title;

	let {timezone, timeFormat} = useUserContext();
	
	if (hasMultipleFeaturedEvents) {
		var blankColumnCount = config.featuredSessions.length - 1;

		return (
			<tr className={`${collapsed ? "hidden" : ""} ${hasOccured ? "line-through text-gray-400" : ""}`}>
				<td className=""></td>
				<td className="p-4">{t(titleKey)}</td>
				<td className="text-right">
					<div className="">
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
				<td className=""></td>
				<td className="p-4">{t(titleKey)}</td>
				<td className="text-right md:text-left">
					{dayjs(date)
						.tz(timezone)
						.format("D MMM")}
				</td>
				<td className="">
					<div className={`text-right md:text-left pr-2 md:pr-0`}>
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
