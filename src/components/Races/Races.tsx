"use client"

import React, {useContext, FunctionComponent} from "react";
import {useUserContext} from "components/UserContext";
import dayjs from "dayjs";
import Race, {RaceRow} from "components/Race/Race";
const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
import RaceModel from "../../models/RaceModel"
import {useTranslations} from 'next-intl';

export interface Props {
	year: number;
	races: [RaceModel];
	locale?: string;
}

const RacesSkeleton = ({ races }: { races: [RaceModel] }) => {
	// Calculate which races are past and which is the first upcoming
	// This mirrors the logic in the main Races component
	let firstUpcomingIndex = -1;
	const raceStates: { isPast: boolean }[] = [];

	for (let i = 0; i < races.length; i++) {
		const item = races[i];
		let isPast = false;

		if (item.sessions != null) {
			const lastSessionKey = Object.keys(item.sessions)[Object.keys(item.sessions).length - 1];
			isPast = dayjs(item.sessions[lastSessionKey]).add(2, "hours").isBefore(dayjs());

			if (!isPast && firstUpcomingIndex === -1 && !item.canceled && !item.tbc) {
				firstUpcomingIndex = i;
			}
		}

		raceStates.push({ isPast });
	}

	// Default collapsePastRaces is true (matches initial React state)
	// Count past races to determine if we should collapse them
	const pastRacesCount = raceStates.filter(r => r.isPast).length;
	const shouldCollapsePast = pastRacesCount > 1 && pastRacesCount < races.length;

	// Build the list of races to show in skeleton
	const visibleRaces: { index: number; isExpanded: boolean }[] = [];
	for (let i = 0; i < races.length && visibleRaces.length < 8; i++) {
		// Skip past races if collapsing
		if (shouldCollapsePast && raceStates[i].isPast) {
			continue;
		}
		visibleRaces.push({
			index: i,
			isExpanded: i === firstUpcomingIndex
		});
	}

	return (
		<div className="animate-pulse">
			<table className="w-full">
				{visibleRaces.map(({ index, isExpanded }, visibleIndex) => {
					const sessionCount = isExpanded && races[index]?.sessions
						? Object.keys(races[index].sessions).length
						: 0;

					return (
						<tbody key={index} className={visibleIndex % 2 === 1 ? 'bg-row-gray' : ''}>
							{/* Header row */}
							<tr>
								<td className="w-4 lg:w-8 p-4">
									<div className="w-4 h-4 bg-gray-700 rounded"></div>
								</td>
								<td className="p-4">
									<div className="h-5 bg-gray-700 rounded w-48"></div>
								</td>
								<td className="p-4 text-right md:text-left">
									<div className="h-5 bg-gray-700 rounded w-16 ml-auto md:ml-0"></div>
								</td>
								<td className="p-4">
									<div className="h-5 bg-gray-700 rounded w-14 ml-auto md:ml-0"></div>
								</td>
							</tr>
							{/* Session rows for expanded race */}
							{isExpanded && Array.from({ length: sessionCount }).map((_, sessionIndex) => (
								<tr key={`session-${sessionIndex}`}>
									<td className="w-4 lg:w-8"></td>
									<td className="p-4">
										<div className="h-4 bg-gray-700 rounded w-24"></div>
									</td>
									<td className="p-4 text-right md:text-left">
										<div className="h-4 bg-gray-700 rounded w-16 ml-auto md:ml-0"></div>
									</td>
									<td className="p-4">
										<div className="h-4 bg-gray-700 rounded w-14 ml-auto md:ml-0"></div>
									</td>
								</tr>
							))}
						</tbody>
					);
				})}
			</table>
		</div>
	);
};

const Races = ({ year, races }: Props) => {
	const t = useTranslations('All');
	const title = t(`${process.env.NEXT_PUBLIC_SITE_KEY}.title`);

	let {timezone, timeFormat, collapsePastRaces, updateCollapsePastRaces, isHydrated} = useUserContext();

	// Show skeleton while hydrating to prevent CLS
	if (!isHydrated) {
		return <RacesSkeleton races={races} />;
	}

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
		<div>
			<table id="events-table" className="w-full">
				{config.featuredSessions.length === 1 ? (
					<thead className="hidden">
						<tr>
							<th scope="col" className="w-8" id="toggle_header">Toggle</th>
							<th scope="col">
								{title}
							</th>
							<th scope="col" id="date_header">
								{t("date")}
							</th>
							<th scope="col" id="time_header">
								{t("time")}
							</th>
						</tr>
					</thead>
				) : (
					<thead>
						<tr className="hidden">
							<th scope="col" className="w-8"></th>
							<th scope="col">
								{title}
							</th>
							{config.featuredSessions.map((item:string, index:number) => {
								return <th scope="col" key={`${item}-col`}></th>;
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
						<Race {...race} key={`${item.slug}-race`} />
					);
				})}
			</table>
		</div>
	);
};

export default Races;
