import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './routes/Home.jsx'
import Participants from './routes/Participants.jsx'
import Analytics from './routes/Analytics.jsx'
import NotFound from './routes/NotFound.jsx'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/participants/:eventId" element={<Participants />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
