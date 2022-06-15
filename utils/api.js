import nc from 'next-connect'
import NextCors from 'nextjs-cors'

const onError = (err, _, res) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something broke!' })
}

const onNoMatch = (req, res) => {
  res.status(404).json({ error: `'${req.method}' method not supported` })
}

const corsMiddleWare = async (req, res, next) => {
  await NextCors(req, res, {
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  next()
}

const handler = nc({ onError, onNoMatch })

// Middleware to handle CORS
handler.use(corsMiddleWare)

export default handler
