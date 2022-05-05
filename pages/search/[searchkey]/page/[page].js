import cheerio from 'cheerio';
import { useRouter } from "next/router";
import fetchdata from 'node-fetch';
import Sidebar from '../../../../components/Sidebar';
import Videos from "../../../../components/Videos";
import Header from '../../../../components/searchPage/Header'
import RecommendedAds from '../../../../components/Ads/RecommendedAds';
import Head from 'next/head'


function Category({ video_collection, pages }) {

    const router = useRouter();
    const { searchkey, page } = router.query
    const currentPageNumberURL = page


    return (
        <>
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <title>{`${searchkey.toUpperCase()} ${page} Porn Videos - Chutlunds`}</title>
                <meta name="description" content={`${searchkey.toUpperCase()} Porn Videos! - Chutlunds`} />
                <meta name="keywords" content={searchkey.toUpperCase()} />
                <meta property="og:title" content={`${searchkey.toUpperCase()} Porn Videos - Chutlunds`} />
                <meta property="og:url" content={`https://www.chutlunds.live/search/boobs/${page}`} />
                <meta property="og:description" content={`${searchkey.toUpperCase()} Porn Videos! - Chutlunds`} />
                <meta name="RATING" content="RTA-5042-1996-1400-1577-RTA" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
                <meta name="author" content="Chutlunds" />
                <meta name="twitter:domain" content="Chutlunds.live" />
                <meta property="og:site_name" content="Chutlunds" />
            </Head>
            <Header keyword={searchkey} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
                <Videos data={video_collection} />

            </div>

            {/* PAGINATION */}
            <div className='flex justify-center items-center flex-wrap'>
                <a className={`${parseInt(currentPageNumberURL) === 1 ? "hidden" : ""}`} href={`/search/${searchkey.toLowerCase().trim()}/page/${parseInt(currentPageNumberURL) - 1}`}>
                    <button className={`text-sm sm:text-med border-2 sm:mx-4 border-gray-500 rounded bg-red-500 p-1 pt-1 pb-1 text-white hover:bg-red-700`}>Previous</button>
                </a>
                {pages.map((pagenumber, index) => {

                    if (index != 0 && index != pages.length - 1) {

                        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                        if (format.test(pagenumber)) {
                            return <p className='px-2 sm:p-2 ml-1 border-2 border-red-600 mb-1  rounded '>{pagenumber}</p>

                        } else {
                            return (
                                <a href={`/search/${searchkey.toLowerCase().trim()}/page/${pagenumber}`} className={`px-1 sm:p-2 ml-1  border-2 border-red-600 mb-1 hover:bg-red-200 rounded `} key={pagenumber}>
                                    <p>{pagenumber}</p>
                                </a>
                            )
                        }
                    }


                })}
                <a className={`${parseInt(currentPageNumberURL) === parseInt(pages[pages.length - 2]) ? "hidden" : ""}`} href={`/search/${searchkey.toLowerCase().trim()}/page/${parseInt(currentPageNumberURL) + 1}`}>
                    <button className={`text-sm sm:text-med ml-1 border-2 sm:mx-4  border-gray-500 rounded bg-red-500 p-4 pt-1 pb-1 text-white hover:bg-red-700`}>Next</button>
                </a>
            </div>
            <RecommendedAds />
        </>
    )
}

export default Category




export async function getServerSideProps(context) {

    const { searchkey, page } = context.query;
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
    }


    await scrape(`https://spankbang.com/s/${searchkey.toLowerCase().trim()}/${page}/`)





    return {
        props: {
            video_collection: finalDataArray,
            pages: pages
        }
    }


}