export default async (req, res) => {
  const {
    query: { year },
  } = req
  
  try {
    const data = await import(`../../../db/`+year+`.json`)  
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(data["default"])
  } catch (err) { 
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.json({error:"Could not find year."})
  }
}