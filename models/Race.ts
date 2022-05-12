export type Race = {
  round: number
  name: string
  location: string
  latitude: string
  longitude: string
  slug: string
  localeKey: string
  sessions: [Session]
};
