import { useTranslation } from 'react-i18next'

import reactLogo from './assets/react.svg'
import { increment } from './redux/reducers/counter'
import { useAppDispatch } from './utils/hooks/useAppDispatch'
import { useAppSelector } from './utils/hooks/useAppSelector'

import './App.css'

import viteLogo from '/vite.svg'

function App() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { value } = useAppSelector((state) => state.counter)

  return (
    <>
      <div className='flex items-center justify-center gap-8'>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1 className='text-5xl text-red'>Vite + React</h1>
      <div className='flex flex-col gap-4 card'>
        <button onClick={() => dispatch(increment())}>count is {value}</button>
      </div>
      <p className='read-the-docs'>{t('app.titleApp')}</p>
    </>
  )
}

export default App
