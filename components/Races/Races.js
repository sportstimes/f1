import {useContext} from "react";
import UserContext from "components/UserContext";
import dayjs from "dayjs";
import Race from "components/Race/Race";
import useTranslation from "next-translate/useTranslation";
const config = require(`../../db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

const Races = (props) => {
	const {t} = useTranslation();

	let {timezone} = useContext(UserContext);
	const races = props.races;

	if (props.timezone) {
		timezone = props.timezone;
	}

	if (props.locale) {
		locale = props.locale;
	}

	// TODO Improve this isNextRace logic
	let isNextRace = false;
	let nextRace = null;

	console.log(config.featuredSessions.length);

	/*
    {config.featuredSessions.length === 1 ? (
        <thead className="hidden">
            <tr>
                <th scope="col" className="w-1/8"></th>
                <th scope="col" className="w-1/2">
                    {t("calendar:event")} {props.year}
                </th>
                <th scope="col" className="w-1/3">
                    {t("calendar:date")}
                </th>
            </tr>
        </thead>
    ) : (
        <thead>
            <tr>
                <th scope="col" className=""></th>
                <th scope="col" className=""></th>
                <th scope="col" className=""></th>
                {config.featuredSessions.map((item, index) => {
                    return <th scope="col" className=""></th>;
                })}
                <th scope="col" className=""></th>
            </tr>
        </thead>
    )}
    */

	return (
		<div>
			<table id="events-table" className="table-fixed w-full">
				{config.featuredSessions.length === 1 ? (
					<thead className="hidden">
						<tr>
							<th scope="col" className="w-1/8"></th>
							<th scope="col" className="w-1/2">
								{t("calendar:event")} {props.year}
							</th>
							<th scope="col" className="w-1/6">
								{t("calendar:date")}
							</th>
							<th scope="col" className="w-1/6">
								{t("calendar:time")}
							</th>
						</tr>
					</thead>
				) : (
					<thead>
						<tr>
							<th scope="col" className=""></th>
							<th scope="col" className=""></th>
							<th scope="col" className="">
								1
							</th>
							{config.featuredSessions.map((item, index) => {
								return <th scope="col" className=""></th>;
							})}
							<th scope="col" className=""></th>
						</tr>
					</thead>
				)}
				{races.map((item, index) => {
					isNextRace = false;
					if (
						item.sessions &&
						dayjs(item.sessions.race).isAfter() &&
						!nextRace &&
						!item.canceled &&
						!item.tbc
					) {
						isNextRace = true;
						nextRace = item;
					}
					return (
						<Race
							item={item}
							index={index}
							timezone={timezone}
							key={item.slug}
							isNextRace={isNextRace}
						/>
					);
				})}
			</table>
		</div>
	);
};

export default Races;
