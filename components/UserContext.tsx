import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import {useRouter} from "next/router";
import Router from "next/router";
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
        
        // Fetch the stored timezone, or guess it via dayjs and save it.
        const storedTimezone = localStorage.getItem("timezone");
        if (storedTimezone) {
            updateTimezone(storedTimezone);
        } else {
            dayjs.extend(dayjsutc);
            dayjs.extend(dayjstimezone);
            updateTimezone(dayjs.tz.guess());
        }
    
        // Fetch the stored time format (12hr/24hr)
        const storedFormat = localStorage.getItem("timeFormat");
        if (storedFormat) {
            updateTimeFormat(Number(storedFormat));
        } else {
            updateTimeFormat(24);
        }
        
        // Store whether to collapse or show the past races.
        const storedCollapsedState = localStorage.getItem("collapsePastRaces");
        updateStateCollapsePastRaces(storedCollapsedState == "true");
        
        
        // Fetch the stored UUID, utilized to configure web push notifications.
        const storedUUID = localStorage.getItem("uuid");
        if(!storedUUID){
            setUUID();
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
        updateCollapsePastRaces
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}