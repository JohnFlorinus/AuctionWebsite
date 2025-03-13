//import './App.css'
import {Routes, Route} from 'react-router-dom'
import AuctionsPage from './pages/AuctionsPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import AuctionItemPage from './pages/AuctionItemPage.jsx'
import Header from './components/Header/Header.jsx'
import AuctionProvider from './contexts/AuctionProvider.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import BidProvider from './contexts/BidProvider.jsx'

function App() {

  return (
    <>
    <AuctionProvider>
    <AuthProvider>
    <BidProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<AuctionsPage />} />
        <Route path="/Account" element={<AuthPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auction/:auctionID" element={<AuctionItemPage />} />
      </Routes>
    </BidProvider>
    </AuthProvider>
    </AuctionProvider>
    </>
  )
}

export default App