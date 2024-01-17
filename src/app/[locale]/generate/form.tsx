"use client"

import React, { useState } from "react";
import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import {usePlausible} from "next-plausible";
import {useLocale, useTranslations} from 'next-intl';
import { notFound } from 'next/navigation'

export default function Form() {
  const plausible = usePlausible();
  const t = useTranslations('All');
	const locale = useLocale();
	
  const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
	
	var sessions = config.sessions;
	
	// F1: Sprint Qualifying Option...
	// Remove Sprint Qualifying for now and bundle it within "Sprint" selection.
	// Check back on this logic once Sprint Weekend format has been solidified.
	if(process.env.NEXT_PUBLIC_SITE_KEY == "f1"){
		sessions = sessions.filter(item => item !== "sprintQualifying");
	}
	
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
	sessions.forEach(function (session:String, index:Number) {
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
			alert(t("form.nonOptionsSelected"));
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
	
		plausibleProps["lang"] = locale;
	
		plausible("Generated Calendar", {
			props: plausibleProps
		});
	
		var calendarBaseURL = config.url + "/download";
		if(config.calendarCDN){
			calendarBaseURL = config.calendarCDN;
		}
	
		if (locale != "en") {
			setState({
				...form,
				submitted: true,
				webcalURL: `webcal://${calendarBaseURL}/${locale}/${process.env.NEXT_PUBLIC_SITE_KEY}-calendar${calendarSuffix}.ics`,
				googleURL: `https://${calendarBaseURL}/${locale}/${
					process.env.NEXT_PUBLIC_SITE_KEY
				}-calendar${calendarSuffix}.ics?t=${Date.now()}`,
				downloadURL: `https://${calendarBaseURL}/${locale}/${process.env.NEXT_PUBLIC_SITE_KEY}-calendar${calendarSuffix}.ics`
			});
		} else {
			setState({
				...form,
				submitted: true,
				webcalURL: `webcal://${calendarBaseURL}/${process.env.NEXT_PUBLIC_SITE_KEY}-calendar${calendarSuffix}.ics`,
				googleURL: `https://${calendarBaseURL}/${
					process.env.NEXT_PUBLIC_SITE_KEY
				}-calendar${calendarSuffix}.ics?t=${Date.now()}`,
				downloadURL: `https://${calendarBaseURL}/${process.env.NEXT_PUBLIC_SITE_KEY}-calendar${calendarSuffix}.ics`
			});
		}
	};
	
	return (
		<>
			{form.submitted ? (
				<>
					<h3 className="text-xl mb-4">
						{t("download.title")}
					</h3>
			
					<Card id="download_option_ical" className="mb-6">
						<h4 className="uppercase mb-4">
							{t("download.webcalTitle")}
						</h4>
						<p className="mb-4">
							{t("download.webcalDescription")}
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
							{t("download.webcalButton")}
						</a>
					</Card>
			
					<Card id="download_option_google" className="mb-6">
						<h4 className="uppercase mb-4">
							{t("download.gcalTitle")}
						</h4>
						{form.alarm && <div className="bg-yellow-200 rounded-md shadow py-4 mb-5 px-4 text-black font-bold">
							<p className="w-fill flex align-middle items-center">
								<svg
									className="flex-none w-6 h-full"
									aria-hidden="true"
									focusable="false"
									data-prefix="far"
									data-icon="bell"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="#000000"
										d="M256 32V49.88C328.5 61.39 384 124.2 384 200V233.4C384 278.8 399.5 322.9 427.8 358.4L442.7 377C448.5 384.2 449.6 394.1 445.6 402.4C441.6 410.7 433.2 416 424 416H24C14.77 416 6.365 410.7 2.369 402.4C-1.628 394.1-.504 384.2 5.26 377L20.17 358.4C48.54 322.9 64 278.8 64 233.4V200C64 124.2 119.5 61.39 192 49.88V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32V32zM216 96C158.6 96 112 142.6 112 200V233.4C112 281.3 98.12 328 72.31 368H375.7C349.9 328 336 281.3 336 233.4V200C336 142.6 289.4 96 232 96H216zM288 448C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288z"
									/>
								</svg>
								<span className="ml-2 text-black">
									{t("download.gcalNotificationNotice")}
								</span>
							</p>
						</div>}
						
						<a
							href={`https://www.google.com/calendar/render?cid=${form.webcalURL}`}
							className="btn"
							onClick={() =>
								plausible("Downloaded Calendar", {
									props: {
										type: "google"
									}
								})
							}
						>
							{t("download.gcalAddToGoogleCalendar")}
						</a>
					</Card>
			
					<Card id="download_option">
						<h4 className="uppercase mb-4">
							{t("download.icsTitle")}
						</h4>
						<p className="mb-4">
							{t("download.icsDescription")}
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
							{t("download.icsButton")}
						</a>
					</Card>
				</>
			) : (
				<>
					<h3 className="text-xl mb-4">{t("form.title")}</h3>
					<Card>
						<p className="mb-4">{t("form.description")}</p>
						
						{/*config.siteKey == "f1" &&
							<div className="bg-yellow-200 rounded-md shadow py-4 mb-4 px-4 text-black font-bold mb-8">
								{t("form.attention")}
							</div>
						*/}
			
						<form id="download_subscribe" onSubmit={handleOnSubmit}>
							<fieldset className="mb-6" key="options">
								{sessions.map((item, index) => {
									return (
										<div className="mb-4" key={item}>
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
												{t(`schedule.${item}`)}
											</label>
										</div>
									);
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
										{t("form.reminder")}
									</label>{" "}
									<select
										name="mins"
										id="alarm-mins"
										defaultValue="30"
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
										<option value="30">30</option>
										<option value="60">60</option>
										<option value="90">90</option>
										<option value="120">120</option>
									</select>
									<label
										htmlFor="alarms-before"
										className="inline-block align-middle text-base"
									>
										{t("form.reminderContinued")}
									</label>
								</div>
							</fieldset>
							
							<fieldset id="buttons" key="buttons">
								<button type="submit" className="btn">
									{!form.submitted
										? t("form.button")
										: t("form.buttonSubmitted")}
								</button>
							</fieldset>
						</form>
					</Card>
				</>
			)}
		</>
	)
  
}