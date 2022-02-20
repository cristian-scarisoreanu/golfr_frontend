import Layout from '../components/Layout'
import ScorePostWidget from '../components/ScorePostWidget'
import ScoreCard from '../components/ScoreCard'
import useScores from '../lib/useScores'
import { getUserId } from '../lib/userAuth'

const Home = () => {
  const { scores, error } = useScores()

  if (scores || error) {
    return (
      <Layout id={getUserId()}>
        <>
          {error ? (
            error
          ) : (
            <>
              <ScorePostWidget />
              {scores && scores.map(score => (
                <ScoreCard
                  key={score.id}
                  id={score.id}
                  totalScore={score.total_score}
                  playedAt={score.played_at}
                  userId={score.user_id}
                  userName={score.user_name}
                />
              ))}
            </>
          )}
        </>
      </Layout>
    )
  } else { return null }
}

export default Home
