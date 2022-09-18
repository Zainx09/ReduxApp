import React from "react"
import { useState } from "react"
import "./App.css"

import Header from "./components/header"
import Footer from "./components/footer"
import HomePage from './components/homePage'
import ContactPage from "./components/contactPage"





const App= () => {

  const [navigate, setNavigate] = useState(0)
  
  return(
    <div className='container'>

      <Header setNavigate={setNavigate}/>
      {navigate === 0 ? <HomePage /> : <ContactPage />}
      <Footer />

    </div>
  )
}

export default App