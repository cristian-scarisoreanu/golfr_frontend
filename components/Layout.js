import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getUserId, getUsername } from '../lib/userAuth'

const Layout = ({ children }) => {
  const [ username, setUsername ] = useState('')
  useEffect(() => setUsername(getUsername()), [])

  const [ userId, setUserId ] = useState('')
  useEffect(() => setUserId(getUserId()), [])

  return (
    <>
      <header className="flex flex-row w-full px-10 py-2 shadow">
        <span className="h-8 items-center space-x-6">
          <span className="text-2xl">Golfr 🏌️</span>
          <Link href="/">
            <a className="text-xl hover:underline">Home</a>
          </Link>
        </span>
        <span className="h-8 items-center text-xl ml-auto">
          <Link href={`/golfers/${userId}`}>
            <a className="hover:underline text-green-700">{username}</a>
          </Link>
          <span className="text-sm">
            {' ('}
            <Link href={'/logout'}>
              <a className="underline text-blue-700">logout</a>
            </Link>
            {')'}
          </span>
        </span>
      </header>
      <div className="px-10 py-2">
        {children}
      </div>
    </>
  )
}

export default Layout
