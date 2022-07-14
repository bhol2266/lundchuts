import Script from 'next/script'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import VideoState from '../context/videos/VideoState'
import '../styles/globals.css'
import '../styles/nProgress.css'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'

function MyApp({ Component, pageProps }) {

  Router.events.on("routeChangeStart", (ur=-0) => {
    console.log('routeChangeStart');
    NProgress.start();

  })
  Router.events.on("routeChangeComplete", (url) => {
    console.log('routeChangeComplete');
    NProgress.done();
  })


  return (
    <>

      <Head>
        <meta name='asg_verification' content='vVcWCcbbgmnqv221hpAjPojb' />
        <meta name="exoclick-site-verification" content="6b1112fe173bdf782d96975e70bd4b95"></meta>
         <link rel="icon" href="/favicon.ico" />
        <meta name="hilltopads-site-verification" content="28c33bbf5c61164c74b2bdfcc2ff1d44bc9c45b5" />
      </Head>

      <VideoState>

        <Navbar />
        <div className=''>
          <Component {...pageProps} />
        </div>
        <hr />
        <Footer />
      </VideoState>
    </>
  )
}

export default MyApp
