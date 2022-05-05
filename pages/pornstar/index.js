import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import RecommendedAds from '../../components/Ads/RecommendedAds';
import BannerAds from '../../components/Ads/BannerAds';
import Outstreams from '../../components/Ads/Outstream';
import Head from 'next/head'
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase'
import { BeatLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
// import pornstarNameList from '../../JsonData/pornstarlist/AllpornstarNames.json'
import pornstarNameList from '../../JsonData/pornstarlist/alldata.json'
import {
    ThumbUpIcon, ClockIcon, FilmIcon, EyeIcon, PlusIcon, MinusIcon, CogIcon
} from '@heroicons/react/solid';

function Index() {

    // var JsonObj = []
    // function runCode(index) {
    //     var array = []
    //     const jsonData = require(`../../JsonData/pornstars/page${index}.json`)
    //     jsonData.map((pornstar, i) => {
    //         getDownloadURL(ref(storage, `pornstars/${pornstar.Name.trim().replace(/ /g, "+").toLowerCase()}.jpg`))
    //             .then((url) => {
    //                 array.push({
    //                     Name: pornstar.Name,
    //                     thumbnail: url,
    //                     numberofVideos: pornstar.numberofVideos,
    //                     views: pornstar.views,
    //                     href: pornstar.href
    //                 })

    //                 if (array.length === jsonData.length) {
    //                     //Page loop finished  jsondata.map loop finished

    //                     console.log(`--------------------------------------------------------`);

    //                     console.log('Condition satisfied');
    //                     console.log(`PAGE: ${index}`);

    //                     console.log(`Above array length ${array.length}`);
    //                     console.log(`jsonData array length ${jsonData.length}`);
    //                     console.log(`--------------------------------------------------------`);
    //                     JsonObj.push(array)

    //                     if (index < 60) {
    //                         runCode(index + 1)
    //                     } else {
    //                         console.log(JSON.stringify(JsonObj));
    //                     }
    //                 }


    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     })

    // }


    // runCode(1)

    //Scroll to top
    const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };


    const router = useRouter();
    var pornstarlist = require(`../../JsonData/pornstarlist/page1.json`)



    const [data, setdata] = useState(pornstarlist)
    const [page, setpage] = useState(1)
    const [imageLoaded, setimageLoaded] = useState(false)

    const [suggestedData, setsuggestedData] = useState([])


    const fetchMoreData = () => {

        setpage(page + 1)
        var json = require(`../../JsonData/pornstarlist/page${page}.json`)
        setdata(data.concat(json));

    }

    function timeout() {
        setTimeout(() => {
            setimageLoaded(true)
        }, 1500);
    }
    timeout()



    const onChangeHandler = (key) => {

        // var ARRAY = []
        // for (let index = 1; index < 109; index++) {
        //     var json = require(`../../JsonData/pornstarlist/page${index}.json`)
        //     json.map(val => {
        //         ARRAY.push({
        //             Name: val.Name,
        //             thumbnail: val.thumbnail,
        //         })
        //     })
        // }
        // console.log(JSON.stringify(ARRAY));


        if (key.length === 0) {
            setsuggestedData([])

        }
        if (key.length > 1) {

            var array = []
            pornstarNameList.filter(name => {
                if (name.Name.toLowerCase().includes(key.trim().toLowerCase())) {
                    array.push(name)

                }
            })
            if (array) {
                if (array.length > 10) {
                    setsuggestedData(array.slice(0, 9))
                }
                else {
                    setsuggestedData(array)
                }
            }
        }

    }




    return (

        <div className="">
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Hot Pornstars and HD Adult Videos - Chutlunds</title>
                <meta name="description" content="Watch hot pornstars sex videos for free only on Chutlunds." />
                <meta name="keywords"
                    content="porn, xxx, streaming porn, HD porn, HD adult videos, HD pussy videos, sex movies, Chutlunds" />
                <meta property="og:title" content="Hot Pornstars and HD Adult Videos - Chutlunds" />
                <meta property="og:url" content="https://Chutlunds.live/pornstars" />
                <meta property="og:description" content="Watch hot pornstars sex videos for free only on Chutlunds." />
                <link rel="canonical" href="https://Chutlunds.live/pornstars" />
                <meta name="RATING" content="RTA-5042-1996-1400-1577-RTA" />
                <meta name="google-site-verification" content="Jg2WM71lJPuDrBOy8pxlRiE9o_UdZmweB2VoLUnhWLQ" />
                <meta name="msvalidate.01" content="8214D727033ABAE57F12C69F30562622" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
                <meta name="author" content="Chutlunds" />
                <meta name="twitter:domain" content="Chutlunds.live" />
                <meta property="og:site_name" content="Chutlunds" />
                <meta property="og:image" content="https://static-eu-cdn.eporner.com/oglogo.png" />
                <meta name="twitter:image" content="https://static-eu-cdn.eporner.com/oglogo.png" />

                <meta name="theme-color" content="#AE0000" />

            </Head>
            <div className='flex items-center p-2 m-1 justify-between bg-gray-200 rounded-lg border-2 border-gray-300 shadow-md'>
                <h1 className='flex-grow text-3xl  ml-4'>Trending Pornstars
                </h1>
            </div>



            <div className='flex mx-2 md:w-3/5 md:mx-auto'  >
                <input className='flex-grow mr-1 border-2 border-gray-400 rounded p-1 px-4 ' type='text' onChange={(event) => { onChangeHandler(event.target.value) }} placeholder='Search pornstar...'></input>

            </div>

            <div className='m-1 border-2 md:flex md:space-x-4 md:flex-wrap items-center justify-start '>
                {suggestedData.length != 0 && suggestedData.map(pornstar => {
                    const posrnstar_Code = pornstar.href.substring(1, pornstar.href.indexOf('/pornstar'))
                    return (

                        <Link key={pornstar.Name} href={`/pornstar/${posrnstar_Code}/${pornstar.Name.trim().toLowerCase().replace(/ /g, "+")}`}>
                            <a >
                                <div className=' flex  items-center justify-start ml-4 mb-2 ' >
                                    <img
                                        className={`object-cover w-32   rounded border-2 border-black  `}
                                        src={pornstar.thumbnail}
                                        alt='loading...'
                                        loading='lazy'
                                    ></img>

                                    <div className=' mx-2' >
                                        <h2 className=' p-0.5 font-semibold  ' > {pornstar.Name}</h2>
                                        <div className='flex flex-row items-center justify-start m-0.5'>
                                            <EyeIcon className='h-6 text-blue-600' />
                                            <h2 className=' p-0.5  ' > {pornstar.views}</h2>
                                        </div>
                                        <div className='flex flex-row items-center justify-start m-0.5'>
                                            <FilmIcon className='h-6 text-red-600' />
                                            <h2 className='p-0.5  ' > {pornstar.numberofVideos}</h2>
                                        </div>

                                    </div>
                                </div>
                            </a>
                        </Link>
                    )
                })}
            </div>




            <BannerAds />


            <div className={`flex justify-center mx-auto mt-10 ${imageLoaded ? 'hidden' : ''} `}>
                <BeatLoader loading size={25} color={'red'} />
            </div>





            {
                suggestedData.length == 0 &&
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    hasMore={data.length !== 6500}

                >
                    <div className={`grid grid-cols-3 p-1 sm:grid-cols-3 gap-x-1  md:grid-cols-5 lg:grid-cols-6 ${imageLoaded ? '' : 'invisible'}`}>
                        {data.map(pornstar => {

                            const posrnstar_Code = pornstar.href.substring(1, pornstar.href.indexOf('/pornstar'))
                            return (
                                <Link key={pornstar.Name} href={`/pornstar/${posrnstar_Code}/${pornstar.Name.trim().toLowerCase().replace(/ /g, "+")}`}>
                                    <a >
                                        <div className='  relative m-1 sm:m-2  hover:scale-105 transform transition duration-150 ' >
                                            <img
                                                className={`object-cover w-full   `}
                                                src={pornstar.thumbnail}
                                                alt='loading...'
                                                loading='lazy'
                                            ></img>

                                            <h2 className='rounded-b absolute text-md sm:text-lg font-bold p-1 bottom-0 w-full text-center  z-10 text-white bg-transparent bg-black bg-opacity-50'>{pornstar.Name}</h2>
                                        </div>
                                    </a>
                                </Link>
                                // items[i].charAt(0).toUpperCase() + items[i].substring(1);
                            )
                        })}


                    </div>

                </InfiniteScroll>
            }








            <RecommendedAds />
            <Outstreams />
        </div>
    )
}


export default Index



