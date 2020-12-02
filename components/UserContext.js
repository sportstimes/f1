import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [timezone, setTimezone] = useState("America/New_York");
  
  useEffect(() => {
	  const storedTimezone = localStorage.getItem("timezone");
	  
	  if(storedTimezone){
		  setTimezone(storedTimezone)
	  } else {
		  dayjs.extend(dayjsutc);
		  dayjs.extend(dayjstimezone);
		  setTimezone(dayjs.tz.guess());
	  }
  }, []);
  
  const updateTimezone = timezone => {
	  setTimezone(timezone)
	  localStorage.setItem('timezone', timezone);
  }
  
  const contextValue = {
	  timezone,
	  updateTimezone
  };
  
  return (
	<UserContext.Provider value={contextValue}>
	  {children}
	</UserContext.Provider>
  );
};

// 
// 
// import React, { createContext, useState, useEffect } from 'react'
// 
// export const UserContext = createContext();
// 
// const UserProvider = UserContext.Provider;
// 
// const UserContextProvider = ({children}) => {
//   const [locale, setLocale] = React.useState(null);
//   const [timezone, setTimezone] = React.useState(null);
// 
//   React.useEffect(() => {
// 	// hydrate on mount
// 	const timezone = localStorage.getItem("timezone");
// 	if (timezone) {
// 	  setTimezone(timezone);
// 	} else {
// 		dayjs.extend(dayjsutc);
// 		dayjs.extend(dayjstimezone);
// 		setTimezone(dayjs.tz.guess());
// 	}
// 	
// 	setTimezone("America/New_York");
// 	
// 	const locale = localStorage.getItem("locale");
// 	if (locale) {
// 	  setLocale(locale);
// 	} else {
// 		setLocale("en");
// 	}
// 	
// 	console.log("Use Effect!!!");
// 	
// 	console.log(timezone);
// 	console.log(locale);
// 	
//   }, []);
// 
//   return (
// 	<UserProvider value={{ timezone, setTimezone, locale, setLocale }}>
// 	  {children}
//    </UserProvider> 
//   );
// }
// 
// export default UserContextProvider;
