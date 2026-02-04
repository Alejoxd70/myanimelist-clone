
export default async function Home() {
  const rankingData = await fetch('https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=2', {
    headers: {
      'Authorization': `Bearer ${process.env.MAL_API_TOKEN}`
    }
  })
  const { data } = await rankingData.json()

  return (
    <>
      <h1>My Anime list Clone</h1>
      <pre>{JSON.stringify(data)}</pre>
      {data.map((anime) => {

        return (
          <div key={anime}>

          </div>
        )
      })}

    </>
  )
}