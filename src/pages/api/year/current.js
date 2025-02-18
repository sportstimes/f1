export default async (req, res) => {
  try {
    const data = await import(
      `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${process.env.NEXT_PUBLIC_CURRENT_YEAR}.json`
    );
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=80000, stale-while-revalidate');
    res.json(data['default']);
  } catch (err) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.json({ error: 'Could not find year.' });
  }
};
