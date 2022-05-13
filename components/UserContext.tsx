import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Router from "next/router";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
import UserContextModel from "../models/UserContextModel"

const defaultState = {
  timeFormat: 24,
  timezone: "America/New_York"
};

export const UserContext = React.createContext()<UserContextModel>(defaultState);
