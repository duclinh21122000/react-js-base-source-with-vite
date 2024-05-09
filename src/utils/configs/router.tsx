import { createBrowserRouter } from 'react-router-dom'

import DefaultLayout from '@/components/layouts/DefaultLayout'
import AboutPage from '@/pages/About'
import BlogPage from '@/pages/Blog'
import ContactPage from '@/pages/Contact'
import HomePage from '@/pages/Home'
import UiPage from '@/pages/Ui'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/blog',
        element: <BlogPage />
      },
      {
        path: '/contact',
        element: <ContactPage />
      },
      {
        path: '/ui',
        element: <UiPage />
      }
    ]
  }
])
