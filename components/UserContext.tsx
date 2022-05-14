import { createContext, useContext, ReactNode, useState } from "react";
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
    const [timezone, updateStateTimezone] = useState<string>(null);
    const [timeFormat, updateStateTimeFormat] = useState<string>(null);

    const updateTimeFormat = (string) => {
      
    };

    const updateTimezone = (string) => {
      
    };

    const value = {
        timezone,
        timeFormat,
        updateTimezone,
        updateTimeFormat,
    };

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    );
}