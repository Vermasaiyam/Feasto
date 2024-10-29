import Login from './auth/Login'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
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
import AddMenu from './admin/AddMenu'
import Orders from './admin/Orders'
import Success from './components/Success'
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'
import Loading from './components/Loading'


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />
  }

  return children;
}


const appRouter = createBrowserRouter([
  {
    path: '/',
    element:
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>,
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
      {
        path: "/order/status",
        element: <Success />
      },
      //admin
      {
        path: "/admin/restaurant",
        element: <AdminRoute><Restaurant /></AdminRoute>,
      },
      {
        path: "/admin/menu",
        element: <AdminRoute><AddMenu /></AdminRoute>,
      },
      {
        path: "/admin/orders",
        element: <AdminRoute><Orders /></AdminRoute>,
      },

      // Under construction page
      {
        path: '*',
        element: <UnderConstruction />
      },
    ]
  },
  {
    path: "/login",
    element: <AuthenticatedUser><Login /></AuthenticatedUser>,
  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser>,
  },
  {
    path: "/forgot-password",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />
  },
  // Under construction page
  {
    path: '*',
    element: <UnderConstruction />
  },
])



function App() {

  const { checkAuthentication, isCheckingAuth } = useUserStore();
  // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
    // initializeTheme();
  }, [checkAuthentication])

  if (isCheckingAuth) return <Loading />

  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  )
}

export default App
