"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import {useRouter} from "next/router";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
import { v4 as uuidv4 } from 'uuid';

type userContextType = {
    timeFormat: number;
    timezone: string
    updateTimezone: (timezone:string) => void;
    updateTimeFormat: (timeformat:number) => void;
    updateCollapsePastRaces: (state:boolean) => void;
    collapsePastRaces: boolean;
    isHydrated: boolean;
};

const userContextDefaultValues: userContextType = {
    timeFormat: 24,
    timezone: "Europe/London",
    updateTimeFormat: () => {},
    updateTimezone: () => {},
    collapsePastRaces: true,
    updateCollapsePastRaces: () => {},
    isHydrated: false,
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
    const [collapsePastRaces, updateStateCollapsePastRaces] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Extend dayjs with timezone support
        dayjs.extend(dayjsutc);
        dayjs.extend(dayjstimezone);

        // Fetch the stored timezone, or guess it via dayjs and save it.
        const storedTimezone = localStorage.getItem("timezone");
        if (storedTimezone) {
            updateStateTimezone(storedTimezone === "Europe/Kyiv" ? "Europe/Kiev" : storedTimezone);
        } else {
            const guessedTimezone = dayjs.tz.guess();
            updateStateTimezone(guessedTimezone === "Europe/Kyiv" ? "Europe/Kiev" : guessedTimezone);
            localStorage.setItem("timezone", guessedTimezone);
        }

        // Fetch the stored time format (12hr/24hr)
        const storedFormat = localStorage.getItem("timeFormat");
        if (storedFormat) {
            updateStateTimeFormat(Number(storedFormat));
        }

        // Store whether to collapse or show the past races.
        // Default to true (hide past races) for new users who haven't set a preference
        const storedCollapsedState = localStorage.getItem("collapsePastRaces");
        if (storedCollapsedState === null) {
            updateStateCollapsePastRaces(true);
            localStorage.setItem("collapsePastRaces", "true");
        } else {
            updateStateCollapsePastRaces(storedCollapsedState === "true");
        }

        // Fetch the stored UUID, utilized to configure web push notifications.
        const storedUUID = localStorage.getItem("uuid");
        if(!storedUUID){
            setUUID();
        }

        // Mark as hydrated after all localStorage values are loaded
        setIsHydrated(true);
    }, []);

    const updateTimeFormat = (format:number) => {
        updateStateTimeFormat(format);
        localStorage.setItem("timeFormat", String(format));
    };

    const updateTimezone = (timezone:string) => {
        if(timezone == "Europe/Kyiv"){
            timezone = "Europe/Kiev";
        }
        
        updateStateTimezone(timezone);
        localStorage.setItem("timezone", timezone);
    };
    
    const updateCollapsePastRaces = (bool:Boolean) => {
        updateStateCollapsePastRaces(bool);
        localStorage.setItem("collapsePastRaces", String(bool));
    };
    
    const setUUID = () => {
        localStorage.setItem("uuid", uuidv4());
    };

    const value = {
        timezone,
        timeFormat,
        updateTimezone,
        updateTimeFormat,
        collapsePastRaces,
        updateCollapsePastRaces,
        isHydrated
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}