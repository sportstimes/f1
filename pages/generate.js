import {useState} from "react";
import Layout from "components/Layout/Layout";
import {NextSeo} from "next-seo";
import useTranslation from "next-translate/useTranslation";
import Card from "components/Card/Card";
import {usePlausible} from "next-plausible";

function Generate(props) {
	const {t, lang} = useTranslation();
	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
	const plausible = usePlausible();

	const title = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.title`, {
		year: currentYear
	});
	const description = t(
		`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.description`,
		{
			year: currentYear
		}
	);
	const keywords = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.keywords`, {
		year: currentYear
	});

	const config = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

	const sessions = config.sessions;

	// Default form values...
	var defaults = {
		alarm: false,
		mins: 30,
		submitted: false,
		webcalURL: "",
		googleURL: "",
		downloadURL: ""
	};

	// Add sessions from config...
	sessions.forEach(function (session, index) {
		defaults[session] = true;
	});

	const [form, setState] = useState(defaults);

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		const sessions = config.sessions;
		const sessionMap = config.sessionMap;

		// Check if non of the sessions are selected...
		let sessionSelected = false;
		sessions.forEach(function (session, index) {
			if (form[session]) {
				sessionSelected = true;
			}
		});

		if (!sessionSelected) {
			alert(t("generate:form.nonOptionsSelected"));
			return;
		}

		var plausibleProps = {};

		let calendarSuffix = "";
		sessions.forEach(function (session, index) {
			if (form[session]) {
				calendarSuffix += `_${sessionMap[session]}`;
				plausibleProps[sessionMap[session]] = true;
			} else {
				plausibleProps[sessionMap[session]] = false;
			}
		});

		if (form.alarm) {
			calendarSuffix += `_alarm-${form.mins}`;
			plausibleProps["alarm"] = form.mins;
		} else {
			plausibleProps["alarm"] = false;
		}

		plausibleProps["lang"] = lang;

		plausible("Generated Calendar", {
			props: plausibleProps
		});

		if (lang != "en") {
			setState({
				...form,
				submitted: true,
				webcalURL: `webcal://${config.url}/download//${lang}${process.env.NEXT_PUBLIC_SITE_KEY}-calendar${calendarSuffix}.ics`,
				googleURL: `https://${config.url}/download/${lang}/${
					process.env.NEXT_PUBLIC_SITE_KEY
				}-calendar${calendarSuffix}.ics?t=${Date.now()}`,
				downloadURL: `https://${config.url}/download/${lang}/${process.env.NEXT_PUBLIC_SITE_KEY}-calendar${calendarSuffix}.ics`
			});
		} else {
			setState({
				...form,
				submitted: true,
				webcalURL: `webcal://${config.url}/download/${process.env.NEXT_PUBLIC_SITE_KEY}-calendar${calendarSuffix}.ics`,
				googleURL: `https://${config.url}/download/${
					process.env.NEXT_PUBLIC_SITE_KEY
				}-calendar${calendarSuffix}.ics?t=${Date.now()}`,
				downloadURL: `https://${config.url}/download/${process.env.NEXT_PUBLIC_SITE_KEY}-calendar${calendarSuffix}.ics`
			});
		}
	};

	return (
		<>
			<NextSeo title={title} description={description} keywords={keywords} />
			<Layout year={currentYear}>
				{form.submitted ? (
					<>
						<h3 className="text-xl mb-4">
							{t("generate:download.title")}
						</h3>

						<Card id="download_option_ical" className="mb-6">
							<h4 className="uppercase mb-4">
								{t("generate:download.webcalTitle")}
							</h4>
							<p className="mb-4">
								{t("generate:download.webcalDescription")}
							</p>

							<a
								href={form.webcalURL}
								className="btn"
								onClick={() =>
									plausible("Downloaded Calendar", {
										props: {
											type: "webcal"
										}
									})
								}
							>
								{t("generate:download.webcalButton")}
							</a>
						</Card>

						<Card id="download_option_google" className="mb-6">
							<h4 className="uppercase mb-4">
								{t("generate:download.gcalTitle")}
							</h4>
							<p className="mb-4">
								{t("generate:download.gcalDescription")} (
								<a
									href="https://support.google.com/calendar/answer/37100"
									target="_blank"
									className="text-green-100"
								>
									{t("generate:download.gcalDescriptionLink")}
								</a>
								):
							</p>
							<p
								className="copyable bg-black p-2"
								onClick={() =>
									plausible("Downloaded Calendar", {
										props: {
											type: "google"
										}
									})
								}
							>
								{form.googleURL}
							</p>
						</Card>

						<Card id="download_option">
							<h4 className="uppercase mb-4">
								{t("generate:download.icsTitle")}
							</h4>
							<p className="mb-4">
								{t("generate:download.icsDescription")}
							</p>
							<a
								href={form.downloadURL}
								className="btn"
								onClick={() =>
									plausible("Downloaded Calendar", {
										props: {
											type: "ics"
										}
									})
								}
							>
								{t("generate:download.icsButton")}
							</a>
						</Card>
					</>
				) : (
					<>
						<h3 className="text-xl mb-4">{t("generate:form.title")}</h3>
						<Card>
							<p className="mb-4">{t("generate:form.description")}</p>

							<form id="download_subscribe" onSubmit={handleOnSubmit}>
								<fieldset className="mb-6" key="options">
									{sessions.map((item, index) => {
										return (
											<div className="mb-4">
												<input
													type="checkbox"
													className="form-tick mr-3 bg-white appearance-none checked:bg-light-green checked:border-transparent w-6 h-6 rounded-md border inline-block align-middle"
													name={item}
													id={item}
													defaultValue="on"
													defaultChecked="checked"
													onChange={async event => {
														setState({
															...form,
															[item]: event.target.checked
														})
													}}
												/>
												<label
													htmlFor={item}
													className="inline-block align-middle text-base"
												>
													{t(`calendar:schedule.${item}`)}
												</label>
											</div>
										);

										//{t("generate:form.fp2")}
									})}
								</fieldset>

								<fieldset id="set_alarms" key="alarms">
									<div className="mb-10">
										<input
											type="checkbox"
											className="form-tick mr-3 bg-white appearance-none checked:bg-light-green checked:border-transparent w-6 h-6 rounded-md border inline-block align-middle"
											name="alarm"
											id="alarm"
											value="off"
											onChange={(event) =>
												setState({
													...form,
													alarm: event.target.checked
												})
											}
										/>
										<label
											htmlFor="alarm"
											className="inline-block align-middle text-base"
										>
											{t("generate:form.reminder")}
										</label>{" "}
										<select
											name="mins"
											id="alarm-mins"
											className="mx-2 text-gray-900 pl-3 pr-10 py-0 text-base
										border-gray-300 focus:outline-none focus:ring-indigo-500
										focus:border-indigo-500 sm:text-sm rounded-md"
											onChange={(event) =>
												setState({
													...form,
													mins: event.target.value
												})
											}
										>
											<option value="0">0</option>
											<option selected="selected" value="30">
												30
											</option>
											<option value="60">60</option>
											<option value="90">90</option>
											<option value="120">120</option>
										</select>
										<label
											htmlFor="alarms-before"
											className="inline-block align-middle text-base"
										>
											{t("generate:form.reminderContinued")}
										</label>
									</div>
								</fieldset>

								<fieldset id="buttons" key="buttons">
									<button type="submit" className="btn">
										{!form.submitted
											? t("generate:form.button")
											: t("generate:form.buttonSubmitted")}
									</button>
								</fieldset>
							</form>
						</Card>
					</>
				)}
			</Layout>
		</>
	);
}

export default Generate;
