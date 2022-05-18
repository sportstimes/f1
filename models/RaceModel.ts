import {Sessions} from './Sessions';

export default class RaceModel {
  round: number
  name: string
  location: string
  latitude: string
  longitude: string
  slug: string
  localeKey: string
  sessions?: Sessions
  tbc: boolean
  canceled: boolean
};
