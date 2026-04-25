import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ToastProvider } from '@/components/ui/toast'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { QuestionnairePage } from '@/pages/QuestionnairePage'
import { RecommendationsPage } from '@/pages/RecommendationsPage'
import { DestinationsPage } from '@/pages/DestinationsPage'
import { DestinationDetailPage } from '@/pages/DestinationDetailPage'
import { BookingPage } from '@/pages/BookingPage'
import { MyBookingsPage } from '@/pages/MyBookingsPage'
import { AdminDashboard } from '@/pages/AdminDashboard'

const authPages = ['/login', '/signup']

function App() {
  const location = useLocation()
  const isAuthPage = authPages.includes(location.pathname)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!isAuthPage && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destination/:id" element={<DestinationDetailPage />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
      {!isAuthPage && <Footer />}
      <ToastProvider />
    </div>
  )
}

export default App
