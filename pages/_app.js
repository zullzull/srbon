import "../styles/globals.css";
import { AccoutProvider } from "../context/accounts";
import { GlobalProvider } from "../context/global";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Script
        src="https://kit.fontawesome.com/3b49b8af22.js"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      <AccoutProvider>
        <GlobalProvider>
          {getLayout(<Component {...pageProps} />)}
        </GlobalProvider>
      </AccoutProvider>
    </>
  );
}

export default MyApp;
