import './App.css'
import Login from './auth/Login'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import MainLayout from './MainLayout'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    // children: [
    //   {
    //     path: '/login'
    //   }
    // ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>
  },
])

function App() {

  return (
    <RouterProvider router={appRouter}>
      <Login/>
    </RouterProvider>
  )
}

export default App
