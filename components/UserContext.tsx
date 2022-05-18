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
    updateCollapsePastRaces: (state:boolean) => void;
    collapsePastRaces: boolean;
};

const userContextDefaultValues: userContextType = {
    timeFormat: 24,
    timezone: "Europe/London",
    updateTimeFormat: () => {},
    updateTimezone: () => {},
    collapsePastRaces: true,
    updateCollapsePastRaces: () => {},
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
            updateTimeFormat(Number(storedFormat));
        } else {
            updateTimeFormat(24);
        }
        
        const storedCollapsedState = localStorage.getItem("collapasePastRaces");
        if (storedCollapsedState) {
            updateStateCollapsePastRaces(Boolean(storedCollapsedState));
        } else {
            updateStateCollapsePastRaces(true);
        }
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
        updateStateCollapsePastRaces(Boolean(bool));
        localStorage.setItem("collapsePastRaces", String(bool));
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