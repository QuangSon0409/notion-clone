import { Button } from '@/components/ui/button'
import Image from 'next/image'
import HeadingPage from './_component/heading'
import Heroes from './_component/heroes'
import FooterPage from './_component/footer'

const MarketingPage = () => {
  return (
    <>
      <div className="min-h-full flex flex-col">
        <div className="flex flex-col items-center justify-center md:justify-center text-center gap-y-8 flex-1 px-6 pb-10">
          <HeadingPage />
          <Heroes />
        </div>
        <FooterPage />
      </div>
    </>
  )
}
export default MarketingPage