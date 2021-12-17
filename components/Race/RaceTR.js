import React, {useState} from "react";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

class RaceTR extends React.Component {
	render() {
		const {t, lang} = this.props.i18n;

		if (lang === "en") {
			dayjs.locale(this.props.locale);
		} else {
			dayjs.locale(lang);
		}

		const hasMultipleFeaturedEvents = this.props.hasMultipleFeaturedEvents;
		const titleKey = "localization:schedule." + this.props.title;

		if (hasMultipleFeaturedEvents) {
			var blankColumnCount = config.featuredSessions.length - 1;

			return (
				<tr className={`${this.props.collapsed ? "hidden" : ""}`}>
					<td className="w-1/8"></td>
					<td className="w-1/2 py-4 pl-2">{t(titleKey)}</td>
					<td className="w-1/3 text-right pr-3 sm:pr-0">
						{dayjs(this.props.date)
							.tz(this.props.timezone)
							.format(
								this.props.timeFormat == 12
									? "D MMM h:mm A"
									: "D MMM HH:mm"
							)}
					</td>
					<td />
				</tr>
			);
		} else {
			return (
				<tr className={`${this.props.collapsed ? "hidden" : ""}`}>
					<td className="w-1/8"></td>
					<td className="w-1/2 py-4 pl-2">{t(titleKey)}</td>
					<td className="w-1/6">
						{dayjs(this.props.date)
							.tz(this.props.timezone)
							.format("D MMM")}
					</td>
					<td className="w-1/6 relative right-3">
						{dayjs(this.props.date)
							.tz(this.props.timezone)
							.format(this.props.timeFormat == 12 ? "h:mm A" : "HH:mm")}
					</td>
					<td />
				</tr>
			);
		}
	}
}

export default RaceTR;
