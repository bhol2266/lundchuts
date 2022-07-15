// import cheerio from 'cheerio';
import { useRouter } from "next/router";
// import fetchdata from 'node-fetch';
import Sidebar from "../../../components/Sidebar";
import Videos from "../../../components/Videos";
import Header from '../../../components/searchPage/Header'
import RecommendedAds from '../../../components/Ads/RecommendedAds';
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Link from 'next/link'
import fetchdata from 'node-fetch';
import cheerio from 'cheerio';




function Category({ video_collection, pages }) {


  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex justify-center mx-auto mt-10 ">
        <BeatLoader loading size={25} color={'red'} />
      </div>
    )
  }

  const { category } = router.query
  const currentPageNumberURL = '1'

  return (
    <>
      <Head>
        <title>{`${category.toUpperCase()} Porn Videos - Chutlunds`}</title>
        <meta name="robots" content="index, follow" />
        <meta name="description"
          content={`Watch ${category.toUpperCase()} HD porn videos for free on Chutlunds.live. We have 56,446 full length hd movies with  ${category.toUpperCase()} in our database available for free streaming. `} />

        <meta name="rating" content="RTA-5042-1996-1400-1577-RTA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${category.toUpperCase()} Porn Videos - Chutlunds`} />
        <meta name="twitter:description"
          content={`Watch ${category.toUpperCase()} HD porn videos for free on Chutlunds.live. We have 56,446 full length hd movies with  ${category.toUpperCase()} in our database available for free streaming. `} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.chutlunds.live/category/${category.toUpperCase()}/`} />
        <meta property="og:title" content={`${category.toUpperCase()} Porn Videos - Chutlunds`} />
        <meta property="og:description"
          content={`Watch ${category.toUpperCase()} HD porn videos for free on Chutlunds.live. We have 56,446 full length hd movies with  ${category.toUpperCase()} in our database available for free streaming. `} />
        <meta property="og:site_name" content="Chutlunds.live" />
        <meta property="og:image" content="https://static-eu-cdn.Chutlunds.live/oglogo.png" />
        <meta name="twitter:image" content="https://static-eu-cdn.Chutlunds.live/oglogo.png" />

        <meta name="theme-color" content="#AE0000" />

      </Head>
      <Header keyword={category} pageNumber={currentPageNumberURL} />
      <div className="flex">
        <Sidebar />
        <Videos data={video_collection} />

      </div>



      {/* PAGINATION */}
      <div className='flex justify-center items-center flex-wrap'>
        <Link href={`/category/${category}/page/${parseInt(currentPageNumberURL) - 1}`}>
          <a className={`${parseInt(currentPageNumberURL) === 1 ? "hidden" : ""}`} >
            <button className={`text-sm sm:text-med border-2 sm:mx-4 border-gray-500 rounded bg-red-500 p-1 pt-1 pb-1 text-white hover:bg-red-700`}>Previous</button>
          </a>
        </Link>
        {pages.map((pagenumber, index) => {

          if (index != 0 && index != pages.length - 1) {

            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if (format.test(pagenumber)) {
              return <p key={pagenumber} className='px-2 sm:p-2 ml-1 border-2 border-red-600 mb-1  rounded '>{pagenumber}</p>

            } else {
              return (
                <Link key={pagenumber} href={`/category/${category}/page/${pagenumber}`}  >
                  <a className={`px-1 sm:p-2 ml-1  border-2 border-red-600 mb-1 hover:bg-red-200 rounded ${currentPageNumberURL === pagenumber ? "bg-red-300" : ""} `} >
                    <p>{pagenumber}</p>
                  </a>
                </Link>
              )
            }
          }


        })}
        <Link href={`/category/${category}/page/${parseInt(currentPageNumberURL) + 1}`}>
          <a className={`${parseInt(currentPageNumberURL) === parseInt(pages[pages.length - 2]) ? "hidden" : ""}`} >
            <button className={`text-sm sm:text-med ml-1 border-2 sm:mx-4  border-gray-500 rounded bg-red-500 p-4 pt-1 pb-1 text-white hover:bg-red-700`}>Next</button>
          </a>
        </Link>
      </div>
      <RecommendedAds />
    </>
  )
}

export default Category

export async function getStaticPaths() {

  const categories = [
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/1.jpg',
      Title: 'Amateur'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/2.jpg',
      Title: 'Anal'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/3.jpg',
      Title: 'Asian'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/4.jpg',
      Title: 'Babe'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/5.jpg',
      Title: 'BBW'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/48.jpg',
      Title: 'Big Ass'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/6.jpg',
      Title: 'Big Dick'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/7.jpg',
      Title: 'Big Tits'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/41.jpg',
      Title: 'Blonde'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/8.jpg',
      Title: 'Blowjob'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/9.jpg',
      Title: 'Bondage'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/49.jpg',
      Title: 'Brunette'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/50.jpg',
      Title: 'Cam'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/38.jpg',
      Title: 'Compilation'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/10.jpg',
      Title: 'Creampie'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/11.jpg',
      Title: 'Cumshot'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/12.jpg',
      Title: 'Deep Throat'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/13.jpg',
      Title: 'DP'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/14.jpg',
      Title: 'Ebony'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/17.jpg',
      Title: 'Fetish'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/18.jpg',
      Title: 'Fisting'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/37.jpg',
      Title: 'Gay'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/19.jpg',
      Title: 'Groupsex'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/20.jpg',
      Title: 'Handjob'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/21.jpg',
      Title: 'Hardcore'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/39.jpg',
      Title: 'Hentai'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/15.jpg',
      Title: 'Homemade'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/46.jpg',
      Title: 'Indian'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/22.jpg',
      Title: 'Interracial'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/47.jpg',
      Title: 'Japanese'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/23.jpg',
      Title: 'Latina'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/24.jpg',
      Title: 'Lesbian'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/25.jpg',
      Title: 'Massage'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/26.jpg',
      Title: 'Masturbation'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/27.jpg',
      Title: 'Mature'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/28.jpg',
      Title: 'MILF'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/30.jpg',
      Title: 'POV'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/40.jpg',
      Title: 'Redhead'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/32.jpg',
      Title: 'Shemale'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/43.jpg',
      Title: 'Small Tits'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/33.jpg',
      Title: 'Solo'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/34.jpg',
      Title: 'Squirt'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/42.jpg',
      Title: 'Striptease'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/35.jpg',
      Title: 'Teen'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/44.jpg',
      Title: 'Threesome'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/36.jpg',
      Title: 'Toy'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/45.jpg',
      Title: 'Vintage'
    },
    {
      thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/51.jpg',
      Title: 'VR'
    }
  ]


  var arrayPaths = []

  for (let index = 0; index < categories.length; index++) {
    arrayPaths.push({ params: { category: categories[index].Title.toLowerCase().trim() } })
  }
  return {
    paths: arrayPaths,
    fallback: true // false or 'blocking'
  };
}



export async function getStaticProps(context) {



  const { category } = context.params;
  // var data = require(`../../../JsonData/category/${category}.json`)
  // var finalDataArray = data.data
  // var pages = data.pages

  var finalDataArray = []
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


    // if (finalDataArray.length < 2) {
    //   console.log(`!!! ALERT !!!  :  https://spankbang.com/category/${category}?o=hot `);
    //   fs.writeFileSync('Home.html', body)
    // }
  }


  await scrape(`https://spankbang.com/category/${category}?o=hot`)
  console.log(`https://spankbang.com/category/${category}?o=hot`)



  return {
    props: {
      video_collection: finalDataArray,
      pages: pages
    }
  }


}