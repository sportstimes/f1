export default async (req, res) => {
  try {
    const config = await import(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)
    
    const localization = await import(`/locales/en/localization.json`)
    const strings = localization['All']
    const i18nSchedule = strings['schedule']
    const i18nRaces = strings['races']
    
    const data = await import(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${config.calendarOutputYear}.json`)
    const races = data['races'];
    
    const augmentedRaces = races.map((race) => {
      if(i18nRaces[race.localeKey]){
        race.name = i18nRaces[race.localeKey];
      }
      
      let sessions = race.sessions;
      let augmentedSessions = {}
      
      Object.keys(sessions).forEach((key, index) => {
        let name = i18nSchedule[key];
        augmentedSessions[name] = sessions[key]
      });
      
      race.sessions = augmentedSessions
      
      return race;
    });
    
    res.json({races:augmentedRaces})
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 's-maxage=80000, stale-while-revalidate');
    res.json(data["default"])
  } catch (err) { 
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.json({error:"Could not find year."})
  }
}