import cheerio from 'cheerio';
import { useRouter } from "next/router";
import fetchdata from 'node-fetch';

import Sidebar from '../../../../components/Sidebar';
import Videos from "../../../../components/Videos";
import Header from '../../../../components/Pornstar/Header'
import RecommendedAds from '../../../../components/Ads/RecommendedAds';
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Link from 'next/link'
import pornstarNameList from '../../../../JsonData/pornstarlist/alldata.json'
import {
    ThumbUpIcon, ClockIcon, FilmIcon, EyeIcon, PlusIcon, MinusIcon, CogIcon
} from '@heroicons/react/solid';
import { useEffect, useState } from 'react';



function Index({ video_collection, pages, pornstarInformation }) {

    const router = useRouter();
    const { code, pornstarname } = router.query
    const [imageURL, setimage] = useState('')
    const currentPageNumberURL = '1'

    useEffect(() => {
        pornstarNameList.filter(pornstar => {
            if (pornstarname.toLowerCase() === pornstar.Name.toLowerCase().replace(/ /g, "+")) {
                setimage(pornstar.thumbnail)
            }
        })
    }, [])

    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'red'} />
            </div>
        )
    }


    return (
        <>
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <title>{`${pornstarname.toUpperCase().replace('+', " ").replace("+", " ")} Pornstar Porn Videos - Chutlunds`}</title>
                <meta name="description"
                    content={`Watch ${pornstarname.toUpperCase().replace('+', " ").replace("+", " ")} HD porn video`} />
                <meta name="keywords"
                    content="porn, xxx, streaming porn, HD porn, HD adult videos, HD pussy videos, sex movies, Chutlunds" />
                <meta property="og:title" content={`${pornstarname.toUpperCase().replace('+', " ").replace("+", " ")} Pornstar Porn Videos - Chutlunds`} />
                <meta property="og:image" content={imageURL} />
                <meta property="og:url" content={`https://www.chutlunds.live/pornstar/${code}/${pornstarname.replace(/ /g, "+")}`} />
                <meta property="og:description"
                    content={`Watch ${pornstarname.toUpperCase()} HD porn video`} />

                <meta name="RATING" content="RTA-5042-1996-1400-1577-RTA" />
                <meta name="msvalidate.01" content="8214D727033ABAE57F12C69F30562622" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
                <meta name="author" content="Chutlunds" />
                <meta name="twitter:domain" content="Chutlunds.live" />
                <meta property="og:site_name" content="Chutlunds" />
            </Head>

            <div className='flex'>

                <Header keyword={pornstarname} pageNumber={currentPageNumberURL} code={code} />
            </div>
            <div className="flex">
                {/* <Sidebar /> */}
                <div>
                    <div className=' flex font-semibold  items-center justify-start  ml-4 m-2 ' >

                        <img
                            className={`object-cover w-44 h-56    rounded border-2 border-black  `}
                            src={imageURL}
                            alt='loading...'
                            loading='lazy'
                        ></img>

                        <div className=' mx-2 flex flex-col justify-start' >

                            <h2 className=' p-0.5  ' > {pornstarInformation.views}</h2>
                            <h2 className='p-0.5  ' > {pornstarInformation.videos}</h2>
                            <h2 className='p-0.5  ' > {pornstarInformation.age}</h2><h2 className='p-0.5  ' > {pornstarInformation.from}</h2>

                        </div>
                    </div>
                    <Videos data={video_collection} />
                </div>

            </div>


            {/* PAGINATION */}
            <div className='flex justify-center items-center flex-wrap'>
                <Link href={`/pornstar/${code}/${pornstarname}/page/${parseInt(currentPageNumberURL) - 1}`}>
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
                                <Link key={pagenumber} href={`/pornstar/${code}/${pornstarname}/page${pagenumber}`}  >
                                    <a className={`px-1 sm:p-2 ml-1  border-2 border-red-600 mb-1 hover:bg-red-200 rounded ${currentPageNumberURL === pagenumber ? "bg-red-300" : ""} `} >
                                        <p>{pagenumber}</p>
                                    </a>
                                </Link>
                            )
                        }
                    }


                })}
                <Link href={`/pornstar/${code}/${pornstarname}/page/${parseInt(currentPageNumberURL) + 1}`}>
                    <a className={`${parseInt(currentPageNumberURL) === parseInt(pages[pages.length - 2]) ? "hidden" : ""}`} >
                        <button className={`text-sm sm:text-med ml-1 border-2 sm:mx-4  border-gray-500 rounded bg-red-500 p-4 pt-1 pb-1 text-white hover:bg-red-700`}>Next</button>
                    </a>
                </Link>
            </div>
            <RecommendedAds />
        </>
    )
}

export default Index


export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    code: '24y',
                    pornstarname: 'mercedes+ashley'
                }
            }
        ],
        fallback: true // false or 'blocking'
    };
}



export async function getStaticProps(context) {



    const { code, pornstarname } = context.params;

    var finalDataArray = []
    var pages = []
    var pornstarInformation = {}


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



        $('.i p span:nth-child(1)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['views'] = data
        })
        $('.i p span:nth-child(2)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['videos'] = data
        })
        $('.i p span:nth-child(3)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['age'] = data
        })
        $('.i p span:nth-child(4)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['from'] = data
        })


        $('.i p span:nth-child(5)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['ethinicity'] = data
        })
        $('.i p span:nth-child(6)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['haircolor'] = data
        })
        $('.i p span:nth-child(7)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['height'] = data
        })
        $('.i p span:nth-child(8)').each((i, el) => {

            const data = $(el).text()
            pornstarInformation['weight'] = data
        })



        console.log(pornstarInformation);








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


    await scrape(`https://spankbang.com/${code}/pornstar/${pornstarname}/`)





    return {
        props: {
            video_collection: finalDataArray,
            pages: pages,
            pornstarInformation: pornstarInformation
        }
    }


}