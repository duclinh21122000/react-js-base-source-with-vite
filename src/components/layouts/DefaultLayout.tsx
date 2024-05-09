import { Outlet } from 'react-router-dom'

import Header from './Header'

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div className='max-w-[1220px] mx-auto my-[60px]'>
        <Outlet />
      </div>
    </>
  )
}

export default DefaultLayout
