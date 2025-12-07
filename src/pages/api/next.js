export default async (req, res) => {
  try {
    const data = await import(
      `../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${process.env.NEXT_PUBLIC_CURRENT_YEAR}.json`
    );

    const races = data['default'].races;
    const now = new Date();

    const upcomingRace = races
      .filter((race) =>
        Object.values(race.sessions).some((time) => new Date(time) > now),
      )
      .sort(
        (a, b) =>
          new Date(
            Object.values(a.sessions).find((time) => new Date(time) > now),
          ) -
          new Date(
            Object.values(b.sessions).find((time) => new Date(time) > now),
          ),
      )[0];

    if (upcomingRace) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 's-maxage=80000, stale-while-revalidate');
      res.json(upcomingRace);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.json({ error: 'No upcoming races found.' });
    }
  } catch (err) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'Could not find year.' });
  }
};
