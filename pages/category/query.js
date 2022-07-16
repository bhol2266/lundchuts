import cheerio from 'cheerio';
import { useRouter } from "next/router";
import fetchdata from 'node-fetch';
import Sidebar from "../../components/Sidebar";
import Videos from "../../components/Videos";
import Header from '../../components/searchPage/Header'
import Link from 'next/link'
import { BeatLoader } from 'react-spinners'
import { useContext, useState } from 'react';
import videosContext from '../../context/videos/videosContext';
import Router from 'next/router'
import RecommendedAds from '../../components/Ads/RecommendedAds';
import Head from 'next/head'


function Category({ video_collection, pages, query, keyword, currentPage, filteredObjsArray }) {



  const router = useRouter();
  const currentPageNumberURL = currentPage

  const context = useContext(videosContext);
  const { spinnerLoading, setSpinner, } = context;


  const clickHandler = (pageNumber) => {
    setSpinner(true)


    var queryObj = {
      category: keyword,
      page: pageNumber
    }
    if (filteredObjsArray) {
      for (let index = 0; index < filteredObjsArray.length; index++) {

        queryObj[filteredObjsArray[index].substring(0, filteredObjsArray[index].indexOf('='))] = filteredObjsArray[index].substring(filteredObjsArray[index].indexOf('=') + 1, filteredObjsArray[index].length)
      }
    }
    Router.push({
      pathname: `/category/query/`,
      query: queryObj
    })
  }
  console.log(filteredObjsArray);
  return (

    <>

      <Head>
        <title>{keyword} sex videos - Free download | Chutlunds</title>
        <meta name="description" content={`${keyword} sex videos, ${keyword} porn videos, desi mms, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection.`}/>
        <meta name='asg_verification' content='vVcWCcbbgmnqv221hpAjPojb' />
        <meta name="exoclick-site-verification" content="6b1112fe173bdf782d96975e70bd4b95"></meta>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

      <div>

        <Header keyword={keyword} pageNumber={currentPageNumberURL} filteredObjsArrayProps={filteredObjsArray} />
        <div className="flex">
          <Sidebar />
          <Videos data={video_collection} />

        </div>


        {/* PAGINATION */}
        <div className='flex justify-center items-center flex-wrap'>

          <button onClick={() => { clickHandler(parseInt(currentPageNumberURL) - 1) }} className={`${parseInt(currentPageNumberURL) === 1 ? "hidden" : ""}  text-sm sm:text-med border-2 sm:mx-4 border-gray-500 rounded bg-red-500 p-1 pt-1 pb-1 text-white hover:bg-red-700`}>Previous</button>

          {pages.map((pagenumber, index) => {

            if (index != 0 && index != pages.length - 1) {

              var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
              if (format.test(pagenumber)) {
                return <p className='px-2 sm:p-2 ml-1 border-2 border-red-600 mb-1  rounded '>{pagenumber}</p>

              } else {
                return (
                  <p key={pagenumber} onClick={() => { clickHandler(pagenumber) }} className={`px-1 sm:p-2 ml-1  border-2 border-red-600 mb-1 hover:bg-red-200 rounded `} >
                    {pagenumber}
                  </p>

                )
              }
            }


          })}


          <button onClick={() => { clickHandler(parseInt(currentPageNumberURL) + 1) }} className={`${parseInt(currentPageNumberURL) === parseInt(pages[pages.length - 2]) ? "hidden" : ""}  text-sm sm:text-med ml-1 border-2 sm:mx-4  border-gray-500 rounded bg-red-500 p-4 pt-1 pb-1 text-white hover:bg-red-700`}>Next</button>

        </div>
      </div>

      <RecommendedAds />

    </>
  )
}

export default Category




export async function getServerSideProps(context) {
  const { category, page } = context.query;
  var finalDataArray = []
  var pages = []


  const { o, q, d, p, } = context.query;

  var filteredObjsArray = []
  var completeSearch = ''
  if (o) {
    filteredObjsArray.push(`o=${o}`)
  }
  if (q) {
    filteredObjsArray.push(`q=${q}`)

  }
  if (d) {
    filteredObjsArray.push(`d=${d}`)
  }
  if (p) {
    filteredObjsArray.push(`p=${p}`)
  }

  if (page > 1) {
    for (let index = 0; index < filteredObjsArray.length; index++) {
      filteredObjsArray[index].replace('o=', '');

    }
  }

  if (filteredObjsArray.length === 1) {
    completeSearch = filteredObjsArray[0]
  }
  if (filteredObjsArray.length === 2) {
    completeSearch = `${filteredObjsArray[0]}&${filteredObjsArray[1]}`
  }
  if (filteredObjsArray.length === 3) {
    completeSearch = `${filteredObjsArray[0]}&${filteredObjsArray[1]}&${filteredObjsArray[2]}`
  }
  if (filteredObjsArray.length === 4) {
    completeSearch = `${filteredObjsArray[0]}&${filteredObjsArray[1]}&${filteredObjsArray[2]}&${filteredObjsArray[3]}`
  }


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





    $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

      const data = $(el).attr("data-src")
      thumbnailArray.push(data)


    })
    $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

      const data = $(el).attr("alt")
      TitleArray.push(data)


    })
    $('.video-list.video-rotate.video-list-with-ads .video-item .l').each((i, el) => {

      const data = $(el).text()
      durationArray.push(data)
    })



    $('.video-list.video-rotate.video-list-with-ads .video-item .stats').each((i, el) => {

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


    $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

      const data = $(el).attr("data-preview")
      previewVideoArray.push(data)
    })



    $('.video-list.video-rotate.video-list-with-ads .video-item').each((i, el) => {

      const data = $(el).children().eq(1).attr("href")
      if (data) {
        hrefArray.push(`https://spankbang.com${data}`)
      }


    })
    $('.pagination ul li').each((i, el) => {


      const data = $(el).text()
      pages.push(data)


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
  }

  if (filteredObjsArray.length > 0) {

    await scrape(`https://spankbang.com/category/${category}/${page}/?${completeSearch}`)
    console.log(`https://spankbang.com/category/${category}/${page}/?${completeSearch}`);
  }
  else {
    await scrape(`https://spankbang.com/category/${category}/${page}/`)
    console.log(`https://spankbang.com/category/${category}/${page}/`);


  }

  return {
    props: {
      video_collection: finalDataArray,
      pages: pages,
      query: filteredObjsArray,
      keyword: category,
      currentPage: page,
      filteredObjsArray: filteredObjsArray
    }
  }


}