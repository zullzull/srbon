import { useState } from "react"
import Header from "../components/Header"
import nextConfig from "../next.config"
import Footer from "../components/Footer"

export default function LayoutDefault({ children }) {
  const [topbarText,setTopbarText] = useState(null)
  const [pageNoPaddingTop,setPageNoPaddingTop] = useState(false)
  const [isHomeTransparent,setIsHomeTransparent] = useState(nextConfig.env.HOMEPAGE_TRANSPARANT)

  const getPadding = () => {
    let padding
    if (!pageNoPaddingTop) {
      if (topbarText) {
        padding = 'pt-24 lg:pt-32'
      } else {
        padding = 'pt-16 lg:pt-24'
      }

      if (isHomeTransparent ) {
        if (topbarText) {
          padding = 'pt-8'
        }
      }
    }
    return padding
  }

  return (
    <>
      <div>
        <section className="LayoutDefault">
          <Header />
          <main className={`flex-grow w-screen overflow-x-hidden min-h-screen ${ getPadding() }`}>{children}</main>
          <Footer />
        </section>
      </div>
    </>
  )
}
