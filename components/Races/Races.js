import {useContext} from "react";
import {UserContext} from "components/UserContext";
import dayjs from "dayjs";
import Race from "components/Race/Race";
import useTranslation from "next-translate/useTranslation";
const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

const Races = (props) => {
	const {t} = useTranslation();

	const {timezone, timeFormat} = useContext(UserContext);

	const races = props.races;

	if (props.timezone) {
		timezone = props.timezone;
	}

	if (props.timeFormat) {
		timeFormat = props.timeFormat;
	}

	if (props.locale) {
		locale = props.locale;
	}

	let isNextRace = false;
	let nextRace = null;

	return (
		<div>
			<table id="events-table" className="table-fixed w-full">
				{config.featuredSessions.length === 1 ? (
					<thead className="hidden">
						<tr>
							<th scope="col" className="w-6"></th>
							<th scope="col" className="w-4/12">
								{t("calendar:event")} {props.year}
							</th>
							<th scope="col" className="w-2/12">
								{t("calendar:date")}
							</th>
							<th scope="col" className="w-3/12">
								{t("calendar:time")}
							</th>
						</tr>
					</thead>
				) : (
					<thead>
						<tr className="hidden">
							<th scope="col" className="w-8"></th>
							<th scope="col" className="w-1/2">
								{t("calendar:event")} {props.year}
							</th>
							{config.featuredSessions.map((item, index) => {
								return <th scope="col" className="w-1/6"></th>;
							})}
						</tr>
					</thead>
				)}
				{races.map((item, index) => {
					isNextRace = false;
					
					const hasMultipleFeaturedEvents = config.featuredSessions.length !== 1;

					var sessionDate = dayjs();
					if(item.sessions != null){
						if(hasMultipleFeaturedEvents){
							let lastEventSessionKey = Object.keys(item.sessions)[Object.keys(item.sessions).length-1];
							sessionDate = dayjs(item.sessions[lastEventSessionKey]);
						} else {
							sessionDate = dayjs(item.sessions[config.featuredSessions[0]]);
						}
					}
					
					if (
						item.sessions &&
						sessionDate.isAfter(dayjs()) &&
						!nextRace &&
						!item.canceled &&
						!item.tbc
					) {
						isNextRace = true;
						nextRace = item;
					}
					return (
						<Race
							item={item}
							index={index}
							timezone={timezone}
							timeFormat={timeFormat}
							key={item.slug}
							isNextRace={isNextRace}
						/>
					);
				})}
			</table>
		</div>
	);
};

export default Races;
