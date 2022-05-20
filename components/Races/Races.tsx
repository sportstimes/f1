import React, {useContext, FunctionComponent} from "react";
import {useUserContext} from "../../components/UserContext";
import dayjs from "dayjs";
import Race, {RaceRow} from "../../components/Race/Race";
const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
import RaceModel from "../../models/RaceModel"
import useTranslation from 'next-translate/useTranslation'

export interface Props {
	year: number;
	races: [RaceModel];
	locale?: string;
}

const Races: FunctionComponent<Props> = ({ year, races }: Props) => {
	const {t, lang} = useTranslation();
	const title = t(`localization:` + process.env.NEXT_PUBLIC_SITE_KEY + `.title`);

	let {timezone, timeFormat, collapsePastRaces, updateCollapsePastRaces} = useUserContext();

	//if (props.locale) locale = props.locale;

	let isNextRace = false;
	let hasSetNextRace = false;
	
	// Check if we have more than 1 race that has already occurred and collapse them.
	var shouldCollapsePastRaces = false;
	var racesOccured = 0;
	races.map((item, index) => {
		if (item.sessions != null) {
			let lastEventSessionKey = Object.keys(item.sessions)[
				Object.keys(item.sessions).length - 1
			];
			
			if (dayjs(item.sessions[lastEventSessionKey]).add(2, "hours").isBefore(Date())) {
				racesOccured = racesOccured + 1;
			}
		}
	});
	
	if(racesOccured > 1 || collapsePastRaces){
		shouldCollapsePastRaces = collapsePastRaces;
	}
	
	if(racesOccured == races.length){
		shouldCollapsePastRaces = false;
	}

	return (
		<div className="px-0 md:px-2">
		
			{racesOccured < 1 || racesOccured != races.length && (
				shouldCollapsePastRaces == true ? (
					<div className="mt-8 mb-4 grid">
						<button onClick={() => {
							updateCollapsePastRaces(false)
							shouldCollapsePastRaces = false
						}} className="inline-block py-1 collapse-btn justify-self-center">
						{t("localization:showPreviousRaces")}</button>
					</div>
				) : (
					<div className="mt-8 mb-4 grid">
						<button onClick={() => {
							updateCollapsePastRaces(true)
							shouldCollapsePastRaces = true
						}} className="inline-block py-1 collapse-btn justify-self-center">
						{t("localization:hidePreviousRaces")}</button>
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
							{config.featuredSessions.map((item:string, index:number) => {
								return <th scope="col" className="w-1/6"></th>;
							})}
						</tr>
					</thead>
				)}
				
				{races.map((item, index) => {
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
					
					isNextRace = false;
					
					if (
						item.sessions &&
						sessionDate.isAfter(dayjs()) &&
						!hasSetNextRace &&
						!item.canceled &&
						!item.tbc
					) {
						isNextRace = true;
						hasSetNextRace = true;
					}
					
					const race: RaceRow = {
						isNextRace: isNextRace,
						hasOccured: sessionDate.isBefore(Date()),
						shouldCollapsePastRaces: shouldCollapsePastRaces,
						index,
						item: item,
						collapsed: !isNextRace
					};
					
					return (
						<Race {...race} />
					);
				})}
			</table>
		</div>
	);
};

export default Races;
