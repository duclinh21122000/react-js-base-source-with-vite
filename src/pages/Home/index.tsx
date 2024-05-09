import { useEffect } from 'react'

import { posts } from '@/services/demo'

const HomePage = () => {
  useEffect(() => {
    const getAllPosts = async () => {
      const res = await posts()
      console.log(res)
    }

    getAllPosts()
  }, [])

  return <div>HomePage</div>
}

export default HomePage
