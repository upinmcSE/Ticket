import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'
import TicketsPage from './components/TicketsPage.jsx'
import TicketDetailPage from './components/TicketDetailPage.jsx'
import CartPage from './components/CartPage.jsx'
import BookingSuccessPage from './components/BookingSuccessPage.jsx'
import ManagerPage from './components/ManagerPage.jsx'

function App() {
  return (
    <Router>
      <Routes>
        {/* Manager — no Header/Footer */}
        <Route path="/system/manager" element={<ManagerPage />} />

        {/* Public routes */}
        <Route path="*" element={
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/ticket/:id" element={<TicketDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/booking-success" element={<BookingSuccessPage />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
