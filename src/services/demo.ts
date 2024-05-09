import { get } from '@/utils/libs/axios'

export const posts = async () => {
  const response = await get('posts')
  return response
}
