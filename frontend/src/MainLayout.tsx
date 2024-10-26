import Footer from "./components/Footer"
import HelpingSection from "./components/HelpingSection"
import LandingPage from "./components/LandingPage"
import Navbar from "./components/Navbar"


const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <LandingPage/>
      <HelpingSection/>
      <Footer/>
    </div>
  )
}

export default MainLayout