import { useState } from 'react'
import wokvaultLogo from './assets/wokvault.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <div className="logo_container">
          <div className="logo_bg"></div>
          <img src={wokvaultLogo} className="logo" alt="WokVault logo" />
        </div>
      </div>
      <h1>WokVault</h1>
      <div className="card">
        <p>
          <code>Under development...<br/>
          an opensource hybrid password manager :)</code>
        </p>
      </div>
    </div>
  )
}

export default App
