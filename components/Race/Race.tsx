import React, {useState} from "react";
import withTranslation from "next-translate/withTranslation"
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
  timezone: string;
  timeFormat: number;
  item: RaceModel
  i18n: I18n;
}

export interface RaceRowState {
  collapsed: boolean;
}

class Race extends React.Component<RaceRow, RaceRowState> {
	constructor(props:RaceRow) {
		super(props);

		dayjs.extend(dayjsutc);
		dayjs.extend(dayjstimezone);

		this.state = {
			collapsed: this.props.isNextRace ? false : true
		};
	}

	handleRowClick() {
		if (this.props.item.sessions != null) {
			const plausible = usePlausible();

			plausible(!this.state.collapsed ? "Closed Event" : "Opened Event", {
				props: {
					event: this.props.item.slug
				}
			});

			this.setState({
				collapsed: !this.state.collapsed
			});
		}
	}

	componentDidMount() {
		this.setState({
			collapsed: this.props.isNextRace ? false : true
		});
	}

	render() {
		const {t, lang} = this.props.i18n;
		const localeKey = "localization:races." + this.props.item.localeKey;

		const hasMultipleFeaturedEvents = config.featuredSessions.length !== 1;

		var firstEventSessionKey = Object.keys(this.props.item.sessions)[0];
		var lastEventSessionKey = Object.keys(this.props.item.sessions)[Object.keys(this.props.item.sessions).length - 1];

		return (
			<tbody id={this.props.item.slug} key={`${this.props.item.slug}-body`} className={`${rowClasses(this.props, this.state)}`}>
				
				<tr
					key={`${this.props.item.slug}-tr`}
					className="cursor-pointer"
					onClick={() => this.handleRowClick()}
				>
					<td className="w-0 relative left-1">
						<Toggle collapsed={this.state.collapsed} />
					</td>
					<td className={`w-7/12 pl-5 pt-3 pb-3 md:pt-4 md:pb-4`}>
					
						<span className={`${titleRowClasses(this.props)}`}>
							{t(`localization:races.${this.props.item.localeKey}`) != localeKey
								? t(`localization:races.${this.props.item.localeKey}`)
								: this.props.item.name}
						</span>	
							
						{this.props.isNextRace &&
							!this.props.item.tbc &&
							!this.props.item.canceled && (
								<NextBadge />
							)}
							
						{this.props.item.tbc && (
							<TBCBadge mobileOnly={true} />
						)}
						
						{this.props.item.canceled && (
							<CanceledBadge mobileOnly={true} />
						)}
					</td>
					{!hasMultipleFeaturedEvents ? (
						<>
							<td className={`w-2/12 ${titleRowClasses(this.props)}`}>
								{this.props.item.sessions &&
									this.props.item.sessions[config.featuredSessions[0]] &&
									dayjs(
										this.props.item.sessions[config.featuredSessions[0]]
									)
										.tz(this.props.timezone)
										.format("D MMM")}
							</td>
							<td className={`w-1/12 ${titleRowClasses(this.props)}`}>
								<div className="relative right-3 sm:right-0">
									{this.props.item.sessions &&
										this.props.item.sessions[config.featuredSessions[0]] &&
										dayjs(
											this.props.item.sessions[config.featuredSessions[0]]
										)
											.tz(this.props.timezone)
											.format(
												this.props.timeFormat == 12 ? "h:mm A" : "HH:mm"
											)}
								</div>
							</td>
						</>
					) : (
						<td className={`text-right ${titleRowClasses(this.props)}`}>
							<div className="relative right-3 sm:right-0">
								{this.props.item.sessions &&
								dayjs(this.props.item.sessions[firstEventSessionKey])
									.tz(this.props.timezone)
									.format("D MMM") !=
									dayjs(this.props.item.sessions[lastEventSessionKey])
										.tz(this.props.timezone)
										.format("D MMM")
									? `${dayjs(
											this.props.item.sessions[firstEventSessionKey]
								  	)
											.tz(this.props.timezone)
											.format("D MMM")} - ${dayjs(
											this.props.item.sessions[lastEventSessionKey]
								  	)
											.tz(this.props.timezone)
											.format("D MMM")}`
									: `${dayjs(
											this.props.item.sessions[lastEventSessionKey]
								  	)
											.tz(this.props.timezone)
											.format("D MMM")}`}
							</div>
						</td>
					)}
					<td className="text-right w-0 sm:w-3/12 pr-2">
						<div className="hidden sm:block">
							{badgeColumnLayout(this.props)}
						</div>
					</td>
				</tr>
				
				{sessionRows(this.props, this.state)}
			
			</tbody>
		);
		
		function sessionRows(props:RaceRow, state:RaceRowState) {			
			if(Object.keys(props.item.sessions).length != 0){
				var rows: React.ReactElement[] = [];
				
				var keys = Object.keys(props.item.sessions);
				
				// Don't include the featured session in the list
				if(!hasMultipleFeaturedEvents){
					keys.splice(keys.indexOf(config.featuredSessions[0]), 1);
				}
				
				keys.forEach(function (session, index) {
					var hasOccured = false;
					
					// TODO: isBefore
					//if(dayjs(props.item.sessions[session]).add(2, "hours").isBefore()){
					//	hasOccured = true;
					//}
						
					rows.push(
						<RaceTR
							key={`${props.item.localeKey}-${session}`}
							date={props.item.sessions[session]}
							title={session}
							timezone={props.timezone}
							timeFormat={props.timeFormat}
							i18n={props.i18n}
							localeKey={props.item.localeKey}
							collapsed={state.collapsed}
							hasMultipleFeaturedEvents={hasMultipleFeaturedEvents}
							hasOccured={hasOccured}
						/>
					);
				});
				
				return rows;
			} else {
				return (<></>);
			}
		}
		
		function badgeColumnLayout(props:RaceRow) {
			var badges = [];

			if (props.item.tbc) {
				badges.push(<TBCBadge />);
			}

			if (props.item.canceled) {
				badges.push(<CanceledBadge />);
			}

			return badges;
		}
		
		function rowClasses(props:RaceRow, state:RaceRowState) {
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
				
				// TODO: isBefore
				/*
				if (
					!dayjs(props.item.sessions[lastEventSessionKey])
						.add(2, "hours")
						.isBefore() &&
					!props.item.canceled
				) {
					classes += "font-semibold ";
				}
				*/
			}
			
			return classes;
		}
	}
}

export default withTranslation(Race);
