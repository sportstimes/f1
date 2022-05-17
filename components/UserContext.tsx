import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import {useRouter} from "next/router";
import Router from "next/router";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";

type userContextType = {
    timeFormat: number;
    timezone: string
    updateTimezone: (timezone:string) => void;
    updateTimeFormat: (timeformat:string) => void;
};

const userContextDefaultValues: authContextType = {
    timeFormat: 24,
    timezone: "Europe/London",
    updateTimeFormat: () => {},
    updateTimezone: () => {},
};

const UserContext = createContext<userContextType>(userContextDefaultValues);

export function useUserContext() {
    return useContext(UserContext);
}

type Props = {
    children: ReactNode;
};

export function UserContextProvider({ children }: Props) {
    const [timezone, updateStateTimezone] = useState<string>("Europe/London");
    const [timeFormat, updateStateTimeFormat] = useState<number>(24);
    const [collapsePastRaces, setCollapsePastRaces] = useState(true);

    useEffect(() => {
        const {pathname} = Router
        if(pathname == '/' && process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"){
            Router.push('/maintenance')
            return
        }  
        
        const storedTimezone = localStorage.getItem("timezone");
    
        if (storedTimezone) {
            updateTimezone(storedTimezone);
        } else {
            dayjs.extend(dayjsutc);
            dayjs.extend(dayjstimezone);
            updateTimezone(dayjs.tz.guess());
        }
    
        const storedFormat = localStorage.getItem("timeFormat");
    
        if (storedFormat) {
            updateTimeFormat(storedFormat);
        } else {
            updateTimeFormat(24);
        }
        
        const storedCollapsedState = localStorage.getItem("collapasePastRaces");
        if (storedCollapsedState) {
            setCollapsePastRaces(storedCollapsedState);
        } else {
            setCollapsePastRaces(true);
        }
    }, []);

    const updateTimeFormat = (format) => {
        updateStateTimeFormat(format);
        localStorage.setItem("timeFormat", format);
    };

    const updateTimezone = (timezone) => {
        if(timezone == "Europe/Kyiv"){
            timezone = "Europe/Kiev";
        }
        
        updateStateTimezone(timezone);
        localStorage.setItem("timezone", timezone);
    };
    
    const updateCollapsePastRaces = (bool) => {
        setCollapsePastRaces(bool);
        localStorage.setItem("collapsePastRaces", bool);
    };

    const value = {
        timezone,
        timeFormat,
        updateTimezone,
        updateTimeFormat,
        collapsePastRaces,
        updateCollapsePastRaces
    };

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    );
}