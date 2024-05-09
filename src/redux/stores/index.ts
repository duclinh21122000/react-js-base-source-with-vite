import { configureStore } from '@reduxjs/toolkit'

import { counterReducer } from '../reducers/counter'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
