import '../styles/globals.css'
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <NavBar />
    <main className="px-4 sm:px-6 md:px-12 flex-auto relative">
    <Component {...pageProps} />
    </main>

    <Footer />
  </>

  );
}
export default MyApp
