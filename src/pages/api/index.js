export default async (req, res) => {
  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=80000, stale-while-revalidate');
  res.json({success:true})
}