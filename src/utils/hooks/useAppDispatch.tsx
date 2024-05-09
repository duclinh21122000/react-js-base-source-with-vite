import { useDispatch } from 'react-redux'

import type { AppDispatch } from '@/redux/stores'

export const useAppDispatch = () => useDispatch<AppDispatch>()
