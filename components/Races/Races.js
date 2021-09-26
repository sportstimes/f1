import {useContext} from "react";
import {UserContext} from "components/UserContext";
import dayjs from "dayjs";
import Race from "components/Race/Race";
import useTranslation from "next-translate/useTranslation";
const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

const Races = (props) => {
	const {t} = useTranslation();

	const title = t(`localization:` + process.env.NEXT_PUBLIC_SITE_KEY + `.title`);

	let {timezone, timeFormat, collapsePastRaces, updateCollapsePastRaces} = useContext(UserContext);

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
	
	// Check if we have more than 1 race that has already occurred and collapse them.
	var shouldCollapsePastRaces = false;
	var racesOccured = 0;
	races.map((item, index) => {
		if (item.sessions != null) {
			let lastEventSessionKey = Object.keys(item.sessions)[
				Object.keys(item.sessions).length - 1
			];
			
			if (!dayjs(item.sessions[lastEventSessionKey]).add(2, "hours").isBefore()) {
				racesOccured = racesOccured + 1;
			}
		}
	});
	
	if(racesOccured > 2 && collapsePastRaces){
		shouldCollapsePastRaces = true;
	}

	return (
		<div>
		
			{racesOccured < 2 ? (
				<div></div>
			) : (
				shouldCollapsePastRaces == true ? (
					<div className="mt-8 mb-4 grid">
						<a onClick={() => {
							updateCollapsePastRaces(!collapsePastRaces)
							shouldCollapsePastRaces = false
						}} className="inline-block py-0.5 collapse-btn justify-self-center">
						{t("localization:showPreviousRaces")}</a>
					</div>
				) : (
					<div className="mt-8 mb-4 grid">
						<a onClick={() => {
							updateCollapsePastRaces(!collapsePastRaces)
							shouldCollapsePastRaces = true
						}} className="inline-block py-0.5 collapse-btn justify-self-center">
						{t("localization:hidePreviousRaces")}</a>
					</div>
				)
			)}
		
		
			<table id="events-table" className="table-fixed w-full">
				{config.featuredSessions.length === 1 ? (
					<thead className="hidden">
						<tr>
							<th scope="col" className="w-6"></th>
							<th scope="col" className="w-4/12">
								{title}
							</th>
							<th scope="col" className="w-2/12">
								{t("localization:date")}
							</th>
							<th scope="col" className="w-3/12">
								{t("localization:time")}
							</th>
						</tr>
					</thead>
				) : (
					<thead>
						<tr className="hidden">
							<th scope="col" className="w-8"></th>
							<th scope="col" className="w-1/2">
								{title}
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
					
					var hasOccured = false;
					if(sessionDate.isBefore()){
						hasOccured = true;
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
							hasOccured={hasOccured}
							shouldCollapsePastRaces={collapsePastRaces}
						/>
					);
				})}
			</table>
		</div>
	);
};

export default Races;
