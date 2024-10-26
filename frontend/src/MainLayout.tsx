import Footer from "./components/Footer"
import LandingPage from "./components/LandingPage"
import Navbar from "./components/Navbar"


const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <LandingPage/>
      <Footer/>
    </div>
  )
}

export default MainLayout