import Login from './auth/Login'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from './MainLayout'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import LandingPage from './components/LandingPage'
import Profile from './components/Profile'
import UnderConstruction from './components/UnderConstruction'
import SearchPage from './components/SearchPage'
import RestaurantPage from './components/RestaurantPage'
import Cart from './components/Cart'
import Restaurant from './admin/Restaurant'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/search/:id",
        element: <SearchPage />
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantPage />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      //admin
      {
        path: "/admin/restaurant",
        element: <Restaurant />
      },
      {
        path: '*',
        element: <UnderConstruction />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />
  },
  {
    path: '*',
    element: <UnderConstruction />
  },
])

function App() {

  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  )
}

export default App
