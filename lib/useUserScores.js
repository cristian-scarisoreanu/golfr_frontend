import useSWR from 'swr'
import { getToken } from './userAuth'

export const SHOW_URL = id => `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`

const useUserScores = id => {
  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('User not found')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.user)
  }

  const { data, error } = useSWR(SHOW_URL(id), fetcher)

  return {
    user: data,
    error: error && error.message,
  }
}

export default useUserScores
