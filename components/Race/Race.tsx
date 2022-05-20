import React, {useState, useEffect, FunctionComponent} from "react";
import useTranslation from 'next-translate/useTranslation'
import {useUserContext} from "../../components/UserContext";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone"
import {usePlausible} from "next-plausible"
import TBCBadge from "../Badges/TBCBadge"
import CanceledBadge from "../Badges/CanceledBadge"
import NextBadge from "../Badges/NextBadge"
import Toggle from "../Toggle/Toggle"
import RaceTR from "../Race/RaceTR"
import RaceModel from "../../models/RaceModel"
import type { I18n } from 'next-translate'

const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

export interface RaceRow {
  isNextRace: boolean;
  hasOccured: boolean;
  shouldCollapsePastRaces: boolean;
  index: number;
  item: RaceModel;
  collapsed: boolean;
}
	
const Race: FunctionComponent<RaceRow> = ({ item, index, shouldCollapsePastRaces, hasOccured, isNextRace }: RaceRow) => {
	
	const {t, lang} = useTranslation();
	const plausible = usePlausible();
	
	let {timezone, timeFormat, collapsePastRaces, updateCollapsePastRaces} = useUserContext();
	const [collapsed, setCollapsed] = useState<Boolean>(!isNextRace);
	
	dayjs.extend(dayjsutc);
	dayjs.extend(dayjstimezone);

	useEffect(() => {
		setCollapsed(!isNextRace)
	}, []);

	const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
		
		plausible(!collapsed ? "Closed Event" : "Opened Event", {
			props: {
				event: item.slug
			}
		});

		setCollapsed(!collapsed);
	}

	const localeKey = "localization:races." + item.localeKey;

	const hasMultipleFeaturedEvents = config.featuredSessions.length !== 1;

	var firstEventSessionKey = Object.keys(item.sessions)[0];
	var lastEventSessionKey = Object.keys(item.sessions)[Object.keys(item.sessions).length - 1];
	
	const race: RaceRow = {
		isNextRace: isNextRace,
		hasOccured: dayjs(item.sessions[lastEventSessionKey]).isBefore(Date()),
		shouldCollapsePastRaces: shouldCollapsePastRaces,
		index,
		item: item,
		collapsed: !isNextRace
	};

	return (
		<tbody id={item.slug} key={`${item.slug}-body`} className={`${rowClasses(race)}`}>
			<tr key={`${item.slug}-tr`} className="cursor-pointer" onClick={handleRowClick}>
				<td className="w-4 lg:w-8">
					<div className="relative left-2 lg:left-4 w-0">
						<Toggle collapsed={collapsed} />
					</div>
				</td>
				<td className={`flex p-4`}>
					<span className={`${titleRowClasses(race)} flex`}>
						{t(`localization:races.${item.localeKey}`) != localeKey
							? t(`localization:races.${item.localeKey}`)
							: item.name}
							
						{isNextRace &&
							!item.tbc &&
							!item.canceled && (
								<NextBadge />
						)}
						
						{item.tbc && (
							<TBCBadge />
						)}
						
						{item.canceled && (
							<CanceledBadge />
						)}
					</span>	
				</td>
				{!hasMultipleFeaturedEvents ? (
					<>
						<td className={`text-right md:text-left ${titleRowClasses(race)}`}>
							{collapsed && item.sessions &&
								item.sessions[config.featuredSessions[0]] &&
								dayjs(
									item.sessions[config.featuredSessions[0]]
								)
									.tz(timezone)
									.format("D MMM")}
						</td>
						<td className={`${titleRowClasses(race)}`}>
							<div className="text-right md:text-left pr-2 md:pr-0">
								{collapsed && item.sessions &&
									item.sessions[config.featuredSessions[0]] &&
									dayjs(
										item.sessions[config.featuredSessions[0]]
									)
										.tz(timezone)
										.format(timeFormat == 12 ? "h:mm A" : "HH:mm")
								}
							</div>
						</td>
					</>
				) : (
					<td className={`${titleRowClasses(race)}`}>
						<div className="text-right md:text-left pr-2 md:pr-0">
							{item.sessions &&
							dayjs(item.sessions[firstEventSessionKey])
								.tz(timezone)
								.format("D MMM") !=
								dayjs(item.sessions[lastEventSessionKey])
									.tz(timezone)
									.format("D MMM")
								? `${dayjs(
										item.sessions[firstEventSessionKey]
								  )
										.tz(timezone)
										.format("D MMM")} - ${dayjs(
										item.sessions[lastEventSessionKey]
								  )
										.tz(timezone)
										.format("D MMM")}`
								: `${dayjs(
										item.sessions[lastEventSessionKey]
								  )
										.tz(timezone)
										.format("D MMM")}`}
						</div>
					</td>
				)}
			</tr>
			
			{sessionRows(race, collapsed)}
			
		</tbody>
	);

	
	function sessionRows(props:RaceRow, collapsed:Boolean) {
		if(Object.keys(props.item.sessions).length != 0){
			var rows: React.ReactElement[] = [];
			
			var keys = Object.keys(props.item.sessions);
			
			keys.forEach(function (session, index) {
				var hasOccured = false;
				
				if(dayjs(props.item.sessions[session]).add(2, "hours").isBefore(Date())){
					hasOccured = true;
				}
					
				rows.push(
					<RaceTR
						key={`${props.item.localeKey}-${session}`}
						date={props.item.sessions[session]}
						isNextRace={isNextRace}
						title={session}
						collapsed={collapsed}
						hasMultipleFeaturedEvents={hasMultipleFeaturedEvents}
						hasOccured={hasOccured}
						isFeaturedSession={config.featuredSessions.includes(session)}
					/>
				);
			});
			
			return rows;
		} else {
			return (<></>);
		}
	}
	
	function badgeColumnLayout(race:RaceModel) {
		var badges = [];

		if (race.tbc) {
			badges.push(<TBCBadge />);
		}

		if (race.canceled) {
			badges.push(<CanceledBadge />);
		}

		return badges;
	}
	
	function rowClasses(props:RaceRow) {
		var classes = "";
		if (props.index % 2 === 1) {
			classes += "rounded bg-row-gray ";
		}

		// Fade out TBC races a little
		if (props.item.tbc) {
			classes += "text-gray-300 ";
		}

		// Bold upcoming races
		let firstEventSessionKey = "";
		let lastEventSessionKey = "";

		if (props.item.sessions != null) {
			firstEventSessionKey = Object.keys(props.item.sessions)[0];

			lastEventSessionKey = Object.keys(props.item.sessions)[
				Object.keys(props.item.sessions).length - 1
			];
			
			// Strikethrough past races
			if (props.hasOccured) {
				classes += "line-through text-gray-400 ";
			} else {
				classes += "text-white ";
			}
			
			if(props.hasOccured && props.shouldCollapsePastRaces){
				classes += "hidden";	
			}
		} else {
			classes += "text-white ";
		}
		
		return classes;
	}
	
	function titleRowClasses(props:RaceRow) {
		var classes = "";
		
		// Highlight Next Race
		if (props.isNextRace) {
			classes += "text-yellow-600 ";
		}

		// Strike out cancelled races
		if (props.item.canceled) {
			classes += "line-through text-gray-300 ";
		}
		
		
		if (props.item.sessions != null) {
			lastEventSessionKey = Object.keys(props.item.sessions)[
				Object.keys(props.item.sessions).length - 1
			];
			
			if (
				!dayjs(props.item.sessions[lastEventSessionKey])
					.add(2, "hours")
					.isBefore(Date()) &&
				!props.item.canceled
			) {
				classes += "font-semibold ";
			}
		}
		
		return classes;
	}
}

export default Race;
