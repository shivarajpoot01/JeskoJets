import { useEffect, useState } from 'react'
import { LenisProvider } from '@/hooks/useLenis'
import Navbar from '@/components/layout/Navbar'
import HeroScroll from '@/components/sections/HeroScroll'
import About from '@/components/sections/About'
import PlaneMorph from '@/components/sections/PlaneMorph'
import Fleet from '@/components/sections/Fleet'
import Benefits from '@/components/sections/Benefits'
import Global from '@/components/sections/Global'
import GlobeFooter from '@/components/sections/GlobeFooter'
import BookingModal from '@/components/ui/BookingModal'
import CustomCursor from '@/components/ui/CustomCursor'
import SectionDivider from '@/components/ui/SectionDivider'
import LoadingScreen from '@/components/ui/LoadingScreen'

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 2000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <LenisProvider>
      <LoadingScreen loaded={ready} />
      <CustomCursor />
      <Navbar onBook={() => setBookingOpen(true)} />

      <main>
        <HeroScroll />
        <About />
        <SectionDivider />
        <PlaneMorph />
        <Fleet />
        <SectionDivider />
        <Benefits />
        <Global />
      </main>

      <GlobeFooter onBook={() => setBookingOpen(true)} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </LenisProvider>
  )
}
