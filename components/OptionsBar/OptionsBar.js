import React from "react";
import {UserContext} from "components/UserContext";
import Link from "next/link";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
import withTranslation from "next-translate/withTranslation";
import ct from "countries-and-timezones";

class OptionsBar extends React.Component {
	static contextType = UserContext;

	constructor(props) {
		super(props);

		dayjs.extend(dayjsutc);
		dayjs.extend(dayjstimezone);

		this.state = {
			pickerShowing: false
		};
	}

	componentDidMount() {
		this.setState({
			pickerShowing: false
		});
	}

	onTimezoneChange = (event) => {
		this.context.updateTimezone(event.target.value);
	};

	onFormatChange = (event) => {
		this.context.updateTimeFormat(event.target.value);
	};

	togglePicker = (event) => {
		event.preventDefault();

		this.setState({
			pickerShowing: !this.state.pickerShowing
		});
	};

	render() {
		const {t, lang} = this.props.i18n;

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
		const timezoneItems = [];

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
				timezoneItems.push(
					<option value={tz.name} key={tz.name}>
						(GMT{tz.offsetString}) {tz.name.replace("_", " ")}
					</option>
				);
			}, "");

		return (
			<div className="bg-red-600 rounded-md shadow py-4 text-center mb-4 h-15 flex justify-between px-4">
				{this.state.pickerShowing ? (
					<>
						<div>
							<form action="/" method="GET" id="timezone-picker">
								<label htmlFor="timezone" className="pickerLabel">
									{t("common:options.timezonePicker.pick")}
								</label>
								<select
									id="timezone"
									onChange={this.onTimezoneChange}
									name="timezone"
									value={this.context.timezone}
									className="mx-2 text-gray-900 pl-3 pr-10 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
								>
									{timezoneItems}
								</select>
								<noscript>
									<style>{`#timezone-picker { display:none; } `}</style>
								</noscript>
							</form>
							<noscript>
								<a href="/timezones">
									{t("common:options.timezonePicker.pick")}
								</a>
							</noscript>
						</div>
						<div>
							<form action="/" method="GET" id="timezone-picker">
								<label htmlFor="format" className="pickerLabel">
									{t("common:options.formatPicker.title")}
								</label>
								<select
									id="format"
									onChange={this.onFormatChange}
									name="format"
									value={this.context.timeFormat}
									className="mx-2 text-gray-900 pl-3 pr-10 py-0 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
								>
									<option value="12">
										{t("common:options.formatPicker.12hr")}
									</option>
									<option value="24">
										{t("common:options.formatPicker.24hr")}
									</option>
								</select>
							</form>
						</div>

						<div>
							<button
								onClick={this.togglePicker}
								type="submit"
								className="inline-block py-0.5"
							>
								{t("common:options.button")}
							</button>
						</div>
					</>
				) : (
					<>
						<div>
							<a
								onClick={this.togglePicker}
								className="cursor-pointer hover:text-gray-200"
							>
								{t("common:options.timezonePicker.showing")}{" "}
								<strong className="underline">
									{this.context.timezone &&
										this.context.timezone.replace("_", " ")}
								</strong>
								.
							</a>
						</div>
						<div>
							<a onClick={this.togglePicker}>Settings</a>
						</div>
					</>
				)}
			</div>
		);
	}
}

export default withTranslation(OptionsBar);
