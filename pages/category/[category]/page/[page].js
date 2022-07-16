import cheerio from 'cheerio';
import { useRouter } from "next/router";
import fetchdata from 'node-fetch';

import Sidebar from '../../../../components/Sidebar';
import Videos from "../../../../components/Videos";
import Header from '../../../../components/searchPage/Header'
import RecommendedAds from '../../../../components/Ads/RecommendedAds';
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Link from 'next/link'




function Category({ video_collection, pages }) {

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'red'} />
            </div>
        )
    }

    const { category, page } = router.query
    const currentPageNumberURL = page


    return (
        <>
            <Head>
                <title>{category} sex videos - Free download | Chutlunds | Page {page}</title>
                <meta name="description" content={`${category} sex videos, ${category} porn videos, desi mms, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection.`} />
                <meta name='asg_verification' content='vVcWCcbbgmnqv221hpAjPojb' />
                <meta name="exoclick-site-verification" content="6b1112fe173bdf782d96975e70bd4b95"></meta>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
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
            Title: 'VR'
        },
    ]


    var arrayPaths = []

    for (let index = 0; index < categories.length; index++) {
        arrayPaths.push({
            params: {
                category: categories[index].Title.toLowerCase(),
                page: '2'
            }
        })
    }
    return {

        paths: arrayPaths,
        fallback: true // false or 'blocking'
    };
}



export async function getStaticProps(context) {



    const { category, page } = context.params;
    console.log(category);
    console.log(page);
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


    await scrape(`https://spankbang.com/category/${category}/${page}/?o=hot`)


    console.log(`https://spankbang.com/category/${category}/${page}/?o=hot`)



    return {
        props: {
            video_collection: finalDataArray,
            pages: pages
        }
    }


}