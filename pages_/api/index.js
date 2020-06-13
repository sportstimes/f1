export default async (req, res) => {
  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json')
  res.json({success:true})
}