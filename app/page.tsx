import Image from "next/legacy/image"

function Row({
  image,
  name,
  score,
  win,
}: {
  image: string
  name: string
  score: string
  win: boolean
}) {
  return (
    <>
      <div className='flex border-b border-gray-200 justify-between px-4 py-2'>
        <div className='flex'>
          <Image src={image} alt='Iowa State Cyclones' width={20} height={20} />
          <p className='font-semibold ml-2'>{name}</p>
        </div>
        <div className='flex text-right'>
          <p className='text-gray-700'>{score}</p>
          {win ? (
            <p className='font-semibold text-green-700 ml-2'>W</p>
          ) : (
            <p className='font-semibold text-red-700 ml-2'>L</p>
          )}
        </div>
      </div>
    </>
  )
}
export default async function Page() {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/66/schedule"
  )
  const data = await res.json()

  const events = data.events.map(
    (event: { competitions: { competitors: any[] }[] }) => {
      const competitors = event.competitions[0].competitors.map(
        (competitor) => {
          return {
            id: competitor.team.id,
            name: competitor.team.displayName,
            logo: competitor.team.logos[0].href,
            score: competitor.score,
            winner: competitor.winner,
          }
        }
      )

      const favoriteTeam = competitors.find(
        (competitor) => competitor.id === "66"
      )
      const otherTeam = competitors.find((competitor) => competitor.id !== "66")

      return {
        name: otherTeam.name,
        logo: otherTeam.logo,
        score:
          favoriteTeam.score &&
          `${otherTeam.score.displayValue}-${favoriteTeam.score.displayValue}`,
        winner: favoriteTeam.winner,
      }
    }
  )

  return (
    <div>
      {events
        .slice(0, 5)
        .map(
          (event: {
            logo: string
            name: string
            score: string
            winner: boolean
          }) => {
            return (
              <Row
                key={event.name}
                image={event.logo}
                name={event.name}
                score={event.score}
                win={event.winner}
              />
            )
          }
        )}
    </div>
  )
}
