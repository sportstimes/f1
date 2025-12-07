export default async (req, res) => {
  try {
    const config = await import(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)

    const localization = await import(`../../../locales/en/localization.json`)
    const strings = localization['All']
    const i18nSchedule = strings['schedule']
    const i18nRaces = strings['races']
    
    const data = await import(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${config.calendarOutputYear}.json`)
    const races = data['races'];
    
    let index = -1;
    const augmentedRaces = races.map((race) => {
      index++;
      
      let name = race.name;
      if(i18nRaces[race.localeKey]){
        name = i18nRaces[race.localeKey];
      }
      
      let sessions = race.sessions;
      let augmentedSessions = {}
      
      Object.keys(sessions).forEach((key, index) => {
        let name = i18nSchedule[key];
        augmentedSessions[name] = race.sessions[key]
      });
      
      return {...race, sessions:augmentedSessions, name:name, index:index};
    });
    
    let output = {races:augmentedRaces};
    
    if(config.notice){
      output.notice = config.notice;
    }
    
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 's-maxage=80000, stale-while-revalidate');
    res.json(output)
  } catch (err) { 
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.json({error:"Could not find year."})
  }
}