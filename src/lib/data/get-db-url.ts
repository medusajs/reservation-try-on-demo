export const getDbURL = async () => { 
  return await fetch(`https://api.heroku.com/apps/${process.env.HEROKU_APP_NAME}/config-vars`, {
    headers: { 
      "Accept": "application/vnd.heroku+json; version=3",
      "Authorization": `Bearer ${process.env.HEROKU_API_KEY}`
    }
  }).then((res) => res.json()).then((res) => res.DATABASE_URL)
}