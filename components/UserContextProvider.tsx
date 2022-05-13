import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Router from "next/router";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
import UserContextModel from "../models/UserContextModel"

export const UserContextProvider = ({children}) => {
	const [timezone, setTimezone] = useState("America/New_York");
	const [timeFormat, setTimeFormat] = useState(24);
	const [collapsePastRaces, setCollapsePastRaces] = useState(true);

	useEffect(() => {
		const {pathname} = Router
		if(pathname == '/' && process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"){
			Router.push('/maintenance')
			return
		}  
		
		const storedTimezone = localStorage.getItem("timezone");

		if (storedTimezone) {
			setTimezone(storedTimezone);
		} else {
			dayjs.extend(dayjsutc);
			dayjs.extend(dayjstimezone);
			setTimezone(dayjs.tz.guess());
		}

		const storedFormat = localStorage.getItem("timeFormat");

		if (storedFormat) {
			setTimeFormat(storedFormat);
		} else {
			setTimeFormat(24);
		}
		
		const storedCollapsedState = localStorage.getItem("collapasePastRaces");
		if (storedCollapsedState) {
			setCollapsePastRaces(storedCollapsedState);
		} else {
			setCollapsePastRaces(true);
		}
	}, []);

	const updateTimezone = (timezone) => {
		if(timezone == "Europe/Kyiv"){
			timezone = "Europe/Kiev";
		}
		
		setTimezone(timezone);
		localStorage.setItem("timezone", timezone);
	};

	const updateTimeFormat = (format) => {
		setTimeFormat(format);
		localStorage.setItem("timeFormat", format);
	};
	
	const updateCollapsePastRaces = (bool) => {
		setCollapsePastRaces(bool);
		localStorage.setItem("collapsePastRaces", bool);
	};

	const contextValue = {
		timezone,
		timeFormat,
		collapsePastRaces,
		updateTimezone,
		updateTimeFormat,
		updateCollapsePastRaces
	};

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};

