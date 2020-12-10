import {useState} from "react";
import Layout from "components/Layout/Layout";
import {NextSeo} from "next-seo";
import useTranslation from "next-translate/useTranslation";
import Card from "components/Card/Card";

function Generate(props) {
	const {t} = useTranslation();
	const currentYear = process.env.CURRENT_YEAR;

	const title = t(`${process.env.SITE_KEY}:seo.title`, {
		year: currentYear
	});
	const description = t(`${process.env.SITE_KEY}:seo.description`, {
		year: currentYear
	});
	const keywords = t(`${process.env.SITE_KEY}:seo.keywords`, {
		year: currentYear
	});

	const [form, setState] = useState({
		p1: true,
		p2: true,
		p3: true,
		quali: true,
		race: true,
		virtual: false,
		alarm: false,
		mins: 30,
		submitted: false,
		webcalURL: "",
		googleURL: "",
		downloadURL: ""
	});

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		if (
			!form.p1 &&
			!form.p2 &&
			!form.p3 &&
			!form.quali &&
			!form.race &&
			!form.virtual
		) {
			alert(t("generate:form.nonOptionsSelected"));
			return;
		}

		/*
    if(lang != "en"){
      setState({
        ...form, 
        submitted: true, 
        webcalURL:`webcal://${props.domain}/${lang}/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}${form.virtual ? '_virtual' : ''}${form.alarm ? '_alarm' : ''}${form.alarm ? '-'+form.mins : ''}.ics`, 
        googleURL:`https://${props.domain}/${lang}/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}${form.virtual ? '_virtual' : ''}${form.alarm ? '_alarm' : ''}${form.alarm ? '-'+form.mins : ''}.ics?t=${ Date.now() }`,
        downloadURL:`https://${props.domain}/${lang}/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}${form.virtual ? '_virtual' : ''}${form.alarm ? '_alarm' : ''}${form.alarm ? '-'+form.mins : ''}.ics` 
      })
    } else {
*/
		setState({
			...form,
			submitted: true,
			webcalURL: `webcal://${props.domain}/download/f1-calendar${
				form.p1 ? "_p1" : ""
			}${form.p2 ? "_p2" : ""}${form.p3 ? "_p3" : ""}${
				form.quali ? "_q" : ""
			}${form.race ? "_gp" : ""}${form.virtual ? "_virtual" : ""}${
				form.alarm ? "_alarm" : ""
			}${form.alarm ? "-" + form.mins : ""}.ics`,
			googleURL: `https://${props.domain}/download/f1-calendar${
				form.p1 ? "_p1" : ""
			}${form.p2 ? "_p2" : ""}${form.p3 ? "_p3" : ""}${
				form.quali ? "_q" : ""
			}${form.race ? "_gp" : ""}${form.virtual ? "_virtual" : ""}${
				form.alarm ? "_alarm" : ""
			}${form.alarm ? "-" + form.mins : ""}.ics?t=${Date.now()}`,
			downloadURL: `https://${props.domain}/download/f1-calendar${
				form.p1 ? "_p1" : ""
			}${form.p2 ? "_p2" : ""}${form.p3 ? "_p3" : ""}${
				form.quali ? "_q" : ""
			}${form.race ? "_gp" : ""}${form.virtual ? "_virtual" : ""}${
				form.alarm ? "_alarm" : ""
			}${form.alarm ? "-" + form.mins : ""}.ics`
		});
		//}
	};

	return (
		<>
			<NextSeo title={title} description={description} keywords={keywords} />
			<Layout year={props.year}>
				{form.submitted ? (
					<>
						<h3 className="text-xl mb-4">
							{t("generate:download.title")}
						</h3>

						<Card id="download_option_ical">
							<h4>{t("generate:download.webcalTitle")}</h4>
							<p>{t("generate:download.webcalDescription")}</p>

							<p>
								<a href={form.webcalURL} className="button">
									{t("generate:download.webcalButton")}
								</a>
							</p>
						</Card>

						<Card id="download_option_google">
							<h4>{t("generate:download.gcalTitle")}</h4>
							<p>
								{t("generate:download.gcalDescription")} (
								<a
									href="https://support.google.com/calendar/answer/37100"
									target="_blank"
								>
									{t("generate:download.gcalDescriptionLink")}
								</a>
								):
							</p>
							<p className="copyable">{form.googleURL}</p>
						</Card>

						<Card id="download_option">
							<h4>{t("generate:download.icsTitle")}</h4>
							<p>{t("generate:download.icsDescription")}</p>
							<p>
								<a href={form.downloadURL} className="button">
									{t("generate:download.icsButton")}
								</a>
							</p>
						</Card>
					</>
				) : (
					<>
						<h3 className="text-xl mb-4">{t("generate:form.title")}</h3>
						<Card>
							<p className="mb-4">{t("generate:form.description")}</p>

							<form id="download_subscribe" onSubmit={handleOnSubmit}>
								<fieldset>
									<div className="mb-4">
										<input
											type="checkbox"
											className="form-tick mr-3 bg-white appearance-none checked:bg-light-green checked:border-transparent w-6 h-6 rounded-md border inline-block align-middle"
											name="p1"
											id="p1"
											defaultValue="on"
											defaultChecked="checked"
											onChange={(event) =>
												setState({
													...form,
													p1: event.target.checked
												})
											}
										/>
										<label
											htmlFor="p1"
											className="inline-block align-middle text-base"
										>
											{t("generate:form.fp1")}
										</label>
									</div>

									<div className="mb-4">
										<input
											type="checkbox"
											className="form-tick mr-3 bg-white appearance-none checked:bg-light-green checked:border-transparent w-6 h-6 rounded-md border inline-block align-middle"
											name="p2"
											id="p2"
											defaultValue="on"
											defaultChecked="checked"
											onChange={(event) =>
												setState({
													...form,
													p2: event.target.checked
												})
											}
										/>
										<label
											htmlFor="p2"
											className="inline-block align-middle text-base"
										>
											{t("generate:form.fp2")}
										</label>
									</div>

									<div className="mb-4">
										<input
											type="checkbox"
											className="form-tick mr-3 bg-white appearance-none checked:bg-light-green checked:border-transparent w-6 h-6 rounded-md border inline-block align-middle"
											name="p3"
											id="p3"
											defaultValue="on"
											defaultChecked="checked"
											onChange={(event) =>
												setState({
													...form,
													p3: event.target.checked
												})
											}
										/>
										<label
											htmlFor="p3"
											className="inline-block align-middle text-base"
										>
											{t("generate:form.fp3")}
										</label>
									</div>

									<div className="mb-4">
										<input
											type="checkbox"
											className="form-tick mr-3 bg-white appearance-none checked:bg-light-green checked:border-transparent w-6 h-6 rounded-md border inline-block align-middle"
											name="q"
											id="q"
											defaultValue="on"
											defaultChecked="checked"
											onChange={(event) =>
												setState({
													...form,
													quali: event.target.checked
												})
											}
										/>
										<label
											htmlFor="q"
											className="inline-block align-middle text-base"
										>
											{t("generate:form.qualifying")}
										</label>
									</div>

									<div className="mb-10">
										<input
											type="checkbox"
											className="form-tick mr-3 bg-white appearance-none checked:bg-light-green checked:border-transparent w-6 h-6 rounded-md border inline-block align-middle"
											name="gp"
											id="gp"
											defaultValue="on"
											defaultChecked="checked"
											onChange={(event) =>
												setState({
													...form,
													race: event.target.checked
												})
											}
										/>
										<label
											htmlFor="gp"
											className="inline-block align-middle text-base"
										>
											{t("generate:form.grandPrix")}
										</label>
									</div>
								</fieldset>

								<fieldset id="set_alarms">
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
										<input
											type="number"
											className="mr-2 text-black text-center"
											name="mins"
											id="alarm-mins"
											step="30"
											min="0"
											max="120"
											defaultValue="30"
											onChange={(event) =>
												setState({
													...form,
													mins: event.target.value
												})
											}
										/>
										<label
											htmlFor="alarms-before"
											className="inline-block align-middle text-base"
										>
											{t("generate:form.reminderContinued")}
										</label>
									</div>
								</fieldset>

								<fieldset id="buttons">
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

export const getStaticProps = async ({params}) => {
	const url = process.env.NEXT_PUBLIC_API_URL
		? `${process.env.NEXT_PUBLIC_API_URL}`
		: "f1calendar.com";

	return {
		props: {
			domain: url,
			year: process.env.NEXT_PUBLIC_CURRENT_YEAR
		}
	};
};
