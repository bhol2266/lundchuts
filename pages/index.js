import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'


import Sidebar from '../components/Sidebar';
import Videos from '../components/Videos';
import React from 'react'

import videosContext from '../context/videos/videosContext'

import { ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";
import RecommendedAds from '../components/Ads/RecommendedAds';
import fetchdata from 'node-fetch';
import cheerio from 'cheerio';
import Category from './category/[category]/page/[page]';
import Category_slider from '../components/category_slider';

export default function Home({ video_collection, pages }) {
 
  const { setcurrentLocation } = useContext(videosContext);

 

  useEffect(() => {
    async function fetchData() {
      var location = {}
      if (!localStorage.getItem("location") === null) {
        setcurrentLocation(location)
      }
      else {
        try {
          const response = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0')
          location = await response.json()

        } catch (error) {
          try {
            const response = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0')
            location = await response.json()

          } catch (error) {
            location = { country_name: 'india' }
          }
        }
        setcurrentLocation(location)
        localStorage.setItem("location", JSON.stringify(location))
      }
    }

    fetchData()
  }, []);

  // //Upload images to firebase storages
  // const [image, setimage] = useState(null)
  // const [Url, setUrl] = useState(null)

  // const handleOnchange = (e) => {
  //   var array = []
  //   for (let index = 0; index < 6505; index++) {
  //     if (e.target.files[index]) {
  //       array.push(e.target.files[index])
  //     }
  //   }
  //   setimage(array)
  //   console.log(array.length);

  // }


  // const submit = () => {
  //   var array = []

  //   function runCode(index) {


  //     if (index < image.length) {

  //       const imageref = ref(storage, `pornstars/${image[index].name}`)
  //       uploadBytes(imageref, image[index]).then(() => {

  //         getDownloadURL(imageref).then((url_link) => {
  //           setUrl(url_link)
  //           array.push({ name: image[index].name, url: url_link })
  //           console.log(`Completed ${image[index].name}: ${url_link}`);
  //           runCode(index + 1)
  //         }).catch(error => {
  //           console.log(error);
  //         })

  //       }).catch(error => {
  //         console.log(error);
  //       })
  //     }
  //     else {
  //       runCode(index + 1)
  //     }



  //   }

  //   runCode(0)



  // }
  return (
    <div >
      <Head>
        <title>Free HD Porn Videos - Full High Definition Movies | Chutlunds</title>
        <meta name='asg_verification' content='vVcWCcbbgmnqv221hpAjPojb' />
        <meta name="exoclick-site-verification" content="6b1112fe173bdf782d96975e70bd4b95"></meta>
        <link rel="icon" href="/favicon.ico" />
        <html lang='en' />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="Watch Full HD Porn Videos for free. We have over 3,381,606 full length Hardcore HD Sex Movies in 720p, 1080p and 4K that you can watch online or download. " />

        <meta name="keywords" content="hindi porn, indian sex, Big Ass Ebony Solo, indian, Girlfriends" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free HD Porn Videos - Full High Definition Movies | Chutlunds" />
        <meta name="twitter:description"
          content="Watch Full HD Porn Videos for free. We have over 3,381,606 full length Hardcore HD Sex Movies in 720p, 1080p and 4K that you can watch online or download. " />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.chutlunds.live/" />
        <meta property="og:title" content="Free HD Porn Videos - Full High Definition Movies | Chutlunds" />
        <meta property="og:description"
          content="Watch Full HD Porn Videos for free. We have over 3,381,606 full length Hardcore HD Sex Movies in 720p, 1080p and 4K that you can watch online or download. " />
        <meta property="og:site_name" content="CHUTLUNDS.LIVE" />
        <meta property="og:image" content="https://static-eu-cdn.eporner.com/oglogo.png" />
        <meta name="twitter:image" content="https://static-eu-cdn.eporner.com/oglogo.png" />



        <meta property="article:tag" content="hindi porn" />
        <meta property="article:tag" content="indian sex" />
        <meta property="article:tag" content="housewife" />
        <meta property="article:tag" content="fingered" />
        <meta property="article:tag" content="chubby" />
        <meta property="article:tag" content="fucked" />
        <meta property="article:tag" content="indian" />


      </Head>

      <Category_slider />

      <main className="flex px-2">
        <Sidebar />
        <div>
          <p className="bg-yellow-100 rounded-lg border-2 border-gray-300 shadow-md p-2 mx-1">
            Welcome to Chutlunds - the most comprehensive source of HD porn videos that you can currently find on the internet. Regardless of the XXX content that you prefer, you will surely find it all and loads more on Chutlund, the world&apos; s best porn tube site.
          </p>


        


          <Videos data={video_collection[0].slice(0, 12)} title='Trending Porn Videos' />
          <Videos data={video_collection[1].slice(0, 12)} title='Upcoming Porn Videos' />
          <Videos data={video_collection[2].slice(0, 12)} title='Popular Porn Videos' />
          <Videos data={video_collection[3].slice(0, 12)} title='New Porn Videos' />

        </div>
      </main>

      <footer >
        <RecommendedAds />


      </footer>
    </div>
  )
}


export async function getStaticProps() {


  var finalDataArray_Arrar = []
  var finalDataArray = []
  var UpcomingVideos = []
  var PopularVidoes = []
  var NewsVideos = []
  var pages = []



  const scrape = async (url) => {

    var thumbnailArray = []
    var TitleArray = []
    var durationArray = []
    var likedPercentArray = []
    var viewsArray = []
    var previewVideoArray = []
    var hrefArray = []

    const response = await fetchdata(url)
    const body = await response.text();
    const $ = cheerio.load(body)








    $('.videos .video-list.video-rotate').each((i, el) => {


      const select = cheerio.load(el)


      select('.video-item picture img').each((i, el) => {

        const data = $(el).attr("data-src")
        thumbnailArray.push(data)


      })


      select('.video-item picture img').each((i, el) => {

        const data = $(el).attr("alt")
        TitleArray.push(data)


      })

      select('.video-item .l').each((i, el) => {

        const data = $(el).text()
        durationArray.push(data)
      })



      select('.video-item .stats').each((i, el) => {

        const views = $(el).children().eq(1).text()

        const likedPercent = $(el).children().eq(2).text()
        if (views.includes('%')) {
          likedPercentArray.push(views)
          viewsArray.push(likedPercent)

        } else {
          viewsArray.push(views)
          likedPercentArray.push(likedPercent)
        }
      })


      select('.video-item picture img').each((i, el) => {

        const data = $(el).attr("data-preview")
        previewVideoArray.push(data)
      })



      select('.video-item').each((i, el) => {

        const data = $(el).children().eq(1).attr("href")
        if (data) {
          hrefArray.push(`https://spankbang.com${data}`)
        }
      })



      for (let index = 0; index < thumbnailArray.length; index++) {

        if (hrefArray[index] != undefined && previewVideoArray[index] != undefined && !thumbnailArray[index].includes("//assets.sb-cd.com")) {

          finalDataArray.push({
            thumbnailArray: thumbnailArray[index],
            TitleArray: TitleArray[index],
            durationArray: durationArray[index],
            likedPercentArray: likedPercentArray[index],
            viewsArray: viewsArray[index],
            previewVideoArray: previewVideoArray[index],
            hrefArray: hrefArray[index],

          })
        }
      }

      if (finalDataArray.length > 2) {
        finalDataArray_Arrar.push(finalDataArray)
      }

      thumbnailArray = []
      TitleArray = []
      durationArray = []
      likedPercentArray = []
      viewsArray = []
      previewVideoArray = []
      hrefArray = []

      finalDataArray = []
    })


  }


  await scrape(`https://spankbang.com/`)

  return {
    props: {
      video_collection: finalDataArray_Arrar,
    }
  }


}

