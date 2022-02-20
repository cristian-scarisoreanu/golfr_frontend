import useUserScores from '../../lib/useUserScores'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import ScorePostWidget from '../../components/ScorePostWidget'
import ScoreCard from '../../components/ScoreCard'
import { getUserId } from '../../lib/userAuth'

const Golfers = () => {
  const router = useRouter()
  const userId = router.query.id
  const { user, error } = useUserScores(userId)
  let scores
  if (user) { scores = user.scores }

  if (userId) {
    return (
      <Layout id={getUserId()}>
        <>
          {error ? (
            error
          ) : (
            <>
              <h2>{user && scores && scores.length !== 0 ? (user.name + ' has ' + scores.length +
                ' scores') : (user && user.name + ' has no scores')}
              </h2>
              { user && userId === `${getUserId()}` && (
                <ScorePostWidget/> )}
              {scores && scores.map(score => (
                <ScoreCard
                  key={score.id}
                  id={score.id}
                  totalScore={score.total_score}
                  playedAt={score.played_at}
                  userId={score.user_id}
                  userName={user.name}
                />
              ))}
            </>
          )}
        </>
      </Layout>
    )
  } else { return null }
}
export default Golfers

