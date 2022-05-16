import React, { useContext, useEffect, FunctionComponent, useState } from "react";
import { useUserContext } from "../../components/UserContext";
import Link from "next/link";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
import withTranslation from "next-translate/withTranslation";
import ct from "countries-and-timezones";
import {usePlausible} from "next-plausible";
import useTranslation from 'next-translate/useTranslation'

const OptionsBar: FunctionComponent = ({ }: Props) => {
	
	const [pickerShowing, setPickerShowing] = useState(false);
	const { t, lang } = useTranslation();
	const { timezone, timeFormat } = useUserContext();

	dayjs.extend(dayjsutc);
	dayjs.extend(dayjstimezone);
	

	const onTimezoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { updateTimezone } = useUserContext();
		updateTimezone(event.target.value);

		const plausible = usePlausible();
		plausible("Changed Timezone", {
			props: {
				timezone: event.target.value
			}
		});
	};

	const onFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { updateTimeFormat } = useUserContext();
		updateTimeFormat(event.target.value);

		const plausible = usePlausible();
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
	const timezoneItems : string[] = [];

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
						<div className="mb-6">
							<form action="/" method="GET" id="timezone-picker">
								<label
									htmlFor="timezone"
									className="pickerLabel block md:inline-block mr-2"
								>
									{t("localization:options.timezonePicker.pick")}
								</label>
								<select
									id="timezone"
									onChange={onTimezoneChange}
									name="timezone"
									value={timezone}
									className="text-gray-900 pl-3 pr-10 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md max-w-sm"
								>
									{timezoneItems}
								</select>
							</form>
							<noscript>
								<a href="/timezones">
									{t("localization:options.timezonePicker.pick")}
								</a>
							</noscript>
						</div>
						<div className="mb-4">
							<form action="/" method="GET" id="format-picker">
								<label
									htmlFor="format"
									className="pickerLabel block md:inline-block mr-2"
								>
									{t("localization:options.formatPicker.title")}
								</label>
								<select
									id="format"
									onChange={onFormatChange}
									name="format"
									value={timeFormat}
									className="text-gray-900 pl-3 pr-10 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
								>
									<option value="12">
										{t("localization:options.formatPicker.12hr")}
									</option>
									<option value="24">
										{t("localization:options.formatPicker.24hr")}
									</option>
								</select>
							</form>
						</div>
		
						<div>
							<button
								onClick={togglePicker}
								type="submit"
								className="inline-block py-0.5 btn"
							>
								{t("localization:options.button")}
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
								{t("localization:options.timezonePicker.showing")}{" "}
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
						<div>
							<button onClick={togglePicker} className="cursor-pointer">
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="far"
									data-icon="cog"
									className="svg-inline--fa fa-cog fa-w-16"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									width="20"
									height="20"
								>
									<path
										fill="currentColor"
										d="M452.515 237l31.843-18.382c9.426-5.441 13.996-16.542 11.177-27.054-11.404-42.531-33.842-80.547-64.058-110.797-7.68-7.688-19.575-9.246-28.985-3.811l-31.785 18.358a196.276 196.276 0 0 0-32.899-19.02V39.541a24.016 24.016 0 0 0-17.842-23.206c-41.761-11.107-86.117-11.121-127.93-.001-10.519 2.798-17.844 12.321-17.844 23.206v36.753a196.276 196.276 0 0 0-32.899 19.02l-31.785-18.358c-9.41-5.435-21.305-3.877-28.985 3.811-30.216 30.25-52.654 68.265-64.058 110.797-2.819 10.512 1.751 21.613 11.177 27.054L59.485 237a197.715 197.715 0 0 0 0 37.999l-31.843 18.382c-9.426 5.441-13.996 16.542-11.177 27.054 11.404 42.531 33.842 80.547 64.058 110.797 7.68 7.688 19.575 9.246 28.985 3.811l31.785-18.358a196.202 196.202 0 0 0 32.899 19.019v36.753a24.016 24.016 0 0 0 17.842 23.206c41.761 11.107 86.117 11.122 127.93.001 10.519-2.798 17.844-12.321 17.844-23.206v-36.753a196.34 196.34 0 0 0 32.899-19.019l31.785 18.358c9.41 5.435 21.305 3.877 28.985-3.811 30.216-30.25 52.654-68.266 64.058-110.797 2.819-10.512-1.751-21.613-11.177-27.054L452.515 275c1.22-12.65 1.22-25.35 0-38zm-52.679 63.019l43.819 25.289a200.138 200.138 0 0 1-33.849 58.528l-43.829-25.309c-31.984 27.397-36.659 30.077-76.168 44.029v50.599a200.917 200.917 0 0 1-67.618 0v-50.599c-39.504-13.95-44.196-16.642-76.168-44.029l-43.829 25.309a200.15 200.15 0 0 1-33.849-58.528l43.819-25.289c-7.63-41.299-7.634-46.719 0-88.038l-43.819-25.289c7.85-21.229 19.31-41.049 33.849-58.529l43.829 25.309c31.984-27.397 36.66-30.078 76.168-44.029V58.845a200.917 200.917 0 0 1 67.618 0v50.599c39.504 13.95 44.196 16.642 76.168 44.029l43.829-25.309a200.143 200.143 0 0 1 33.849 58.529l-43.819 25.289c7.631 41.3 7.634 46.718 0 88.037zM256 160c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 144c-26.468 0-48-21.532-48-48 0-26.467 21.532-48 48-48s48 21.533 48 48c0 26.468-21.532 48-48 48z"
									></path>
								</svg>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
		</>
	);
}

export default OptionsBar;
