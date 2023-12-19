"use client"

import React, { useContext, useEffect, FunctionComponent, useState } from "react";
import { useUserContext } from "../../components/UserContext";
import Link from "next/link";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
import ct from "countries-and-timezones";
import {usePlausible} from "next-plausible";
import {useTranslations} from 'next-intl';

const OptionsBar: FunctionComponent = () => {
	const t = useTranslations('All');

	const [pickerShowing, setPickerShowing] = useState(false);
	const { timezone, timeFormat, updateTimezone, updateTimeFormat, collapsePastRaces, updateCollapsePastRaces } = useUserContext();

	const plausible = usePlausible();

	dayjs.extend(dayjsutc);
	dayjs.extend(dayjstimezone);

	const onTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		updateTimezone(event.target.value);

		plausible("Changed Timezone", {
			props: {
				timezone: event.target.value
			}
		});
	};

	const onFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		updateTimeFormat(Number(event.target.value));

		plausible("Changed Time Format", {
			props: {
				format: event.target.value
			}
		});
	};

	const togglePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		setPickerShowing(!pickerShowing);
	};
	
	const detectTimezone = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	
		updateTimezone(dayjs.tz.guess());
		
		plausible("Changed Timezone", {
			props: {
				timezone: dayjs.tz.guess()
			}
		});
	};

	// Picker Items
	const scrubbedPrefixes = [
		"Antarctica",
		"Arctic",
		"Canada",
		"Chile",
		"Etc",
		"Mexico",
		"US"
	];
	const scrubbedSuffixes = [
		"ACT",
		"East",
		"Knox_IN",
		"LHI",
		"North",
		"NSW",
		"South",
		"West"
	];

	const allTimezones = ct.getAllTimezones();
	let timezoneNames = Object.keys(ct.getAllTimezones());
	const timezoneItems : React.ReactElement[] = [];

	timezoneNames = timezoneNames
		.filter((name) => name.indexOf("/") !== -1)
		.filter((name) => !scrubbedPrefixes.includes(name.split("/")[0]))
		.filter(
			(name) => !scrubbedSuffixes.includes(name.split("/").slice(-1)[0])
		);
	
	timezoneNames
		.reduce((memo, tz) => {
			memo.push({
				name: tz,
				offset: allTimezones[tz].utcOffset,
				offsetString: allTimezones[tz].utcOffsetStr
			});

			return memo;
		}, [])
		.sort((a, b) => {
			return a.offset - b.offset;
		})
		.reduce((memo, tz) => {
			var displayName = tz.name.replace("_", " ");
			if(displayName == "Europe/Kiev"){
				displayName = "Europe/Kyiv";
			}
			
			timezoneItems.push(
				<option value={tz.name} key={tz.name}>
					(GMT{tz.offsetString}) {displayName}
				</option>
			);
		}, "");
	
	return (
		<>
		<div className="px-2">
			<div className="bg-red-600 rounded-md shadow py-4 mb-4 px-4">
				{pickerShowing ? (
					<>
						<div className="mb-2 md:mb-8">
							<form action="/" method="GET" id="timezone-picker">
								<label
									htmlFor="timezone"
									className="pickerLabel block md:inline-block mr-2 font-semibold pb-2 md:pb-0"
								>
									{t("options.timezonePicker.showing")}:
								</label>
								<select
									id="timezone"
									onChange={onTimezoneChange}
									name="timezone"
									value={timezone}
									className="text-gray-900 pl-3 pr-10 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-full md:w-1/2 pr-10 md:pr-0 md:mr-4"
								>
									{timezoneItems}
								</select>
								
								<button
									onClick={detectTimezone}
									type="button"
									className="inline-block py-4 md:py-0"
								>
									{t("options.timezonePicker.detect")}
								</button>
							</form>
							<noscript>
								<Link href="/timezones">
									{t("options.timezonePicker.pick")}
								</Link>
							</noscript>
						</div>
						<div className="mb-8 md:mb-8">
							<form action="/" method="GET" id="format-picker">
								<label
									htmlFor="format"
									className="pickerLabel block md:inline-block mr-2 font-semibold pb-2 md:pb-0"
								>
									{t("options.formatPicker.title")}
								</label>
								<select
									id="format"
									onChange={onFormatChange}
									name="format"
									value={timeFormat}
									className="text-gray-900 pl-3 pr-10 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
								>
									<option value="12">
										{t("options.formatPicker.12hr")}
									</option>
									<option value="24">
										{t("options.formatPicker.24hr")}
									</option>
								</select>
							</form>
						</div>
		
						
						<div className="mb-8 md:mb-8">
							<form action="/" method="GET" id="previous-races">
								<label
									htmlFor="previousRaces"
									className="pickerLabel block md:inline-block mr-2 font-semibold pb-2 md:pb-0"
								>
									{t("hidePreviousRaces")}
								</label>
								<input
									type="checkbox"
									className="form-tick mr-3 bg-white appearance-none checked:bg-light-green checked:border-transparent w-6 h-6 rounded-md border inline-block align-middle"
									name="previousRaces"
									id="previousRaces"
									defaultValue={collapsePastRaces ? 'on': 'off'}
									defaultChecked={collapsePastRaces ? 'checked': ''}
									onChange={async event => {
										updateCollapsePastRaces(event.target.checked)
									}}
								/>
							</form>
						</div>
						
						
						<div>
							<button
								onClick={togglePicker}
								type="submit"
								className="inline-block py-2 btn"
							>
								{t("options.button")}
							</button>
						</div>
		
						<noscript>
							<style>{`#timezone-picker { display:none; } #format-picker { display:none; }`}</style>
						</noscript>
					</>
				) : (
					<div className="flex justify-between items-center">
						<div>
							<button
								onClick={togglePicker}
								className="cursor-pointer hover:text-gray-200"
							>
								{t("options.timezonePicker.showing")}: {` `}
								<strong className="underline">
									{timezone == "Europe/Kiev" ? (
										<>Europe/Kyiv</>
									) : (
										timezone && timezone.replace("_", " ")
									)}
								</strong>
								.
							</button>
						</div>
						<button onClick={togglePicker} className="cursor-pointer" aria-label="Settings">
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="far"
								data-icon="cog"
								className="svg-inline--fa fa-cog fa-w-16 self-center"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								width="20"
								height="20"
							>
								<path fill="currentColor" d="M194 0H306l17.2 78.4c15.8 6.5 30.6 15.1 44 25.4l76.5-24.4 56 97-59.4 54.1c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l59.4 54.1-56 97-76.5-24.4c-13.4 10.3-28.2 18.9-44 25.4L306 512H194l-17.2-78.4c-15.8-6.5-30.6-15.1-44-25.4L56.3 432.5l-56-97 59.4-54.1C58.6 273.1 58 264.6 58 256s.6-17.1 1.7-25.4L.3 176.5l56-97 76.5 24.4c13.4-10.3 28.2-18.9 44-25.4L194 0zm56 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>
							
						</button>
					</div>
				)}
			</div>
		</div>
		</>
	);
}

export default OptionsBar;
