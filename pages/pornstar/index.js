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

        <div className=" lg:w-11/12 mx-auto">
            <Head>
                <title>free sunny leone sex videos, mia khalifa sex videos</title>
                <meta name="description" content="Free sunny leone sex videos, mia khalifa sex videos, mia malkova sex videos, dani daniels sex videos, Indian college girls." />
            </Head>



            <div className=' items-center p-2 m-1 justify-between bg-gray-100 rounded-lg shadow-lg'>
                <h1 className='flex-grow text-lg'>Free sunny leone sex videos, Lana Rhoades sex videos, Mia Khalifa, Abella Dange, Riley Rei, Brandi Love, Mia Malkova, Nicole Aniston, Adriana Chechik, Lisa Ann, Madison Ivy sex vidoes and many more pornstars.
                </h1>

            </div>

            <h2 className='flex-grow text-lg  m-1 p-2 font-semibold font-inter'>Trending Pornstars</h2>


            <div className='flex m-1 pr-2 md:w-3/5 md:mx-auto'  >
                <input className='focus:outline-none flex-grow mr-1 font-inter rounded p-1 px-2  bg-slate-100' type='text' onChange={(event) => { onChangeHandler(event.target.value) }} placeholder='Search pornstar...'></input>

            </div>

            <div className='m-1 mt-6 grid grid-cols-3 p-1 sm:grid-cols-3 gap-x-1  md:grid-cols-5 lg:grid-cols-6'>
                {suggestedData.length != 0 && suggestedData.map(pornstar => {
                    const posrnstar_Code = pornstar.href.substring(1, pornstar.href.indexOf('/pornstar'))
                    return (

                        <Link key={pornstar.Name} href={`/pornstar/${posrnstar_Code}/${pornstar.Name.trim().toLowerCase().replace(/ /g, "+")}`}>
                            <a >
                            <div className='  relative m-1 sm:m-2  hover:scale-105 transform transition duration-150 ' >
                                    <img
                                        className={`object-cover w-full rounded  `}
                                        src={pornstar.thumbnail}
                                        alt={pornstar.Name}
                                        loading='lazy'
                                    ></img>

                                    <h2 className='rounded-b absolute text-sm lg:text-lg font-inter p-1 bottom-0 w-full text-center  z-10 text-white bg-transparent bg-black bg-opacity-50'>{pornstar.Name}</h2>

                                    {/* 
                                    <div className='p-0.5 lg:p-1 md:space-y-1 items-center text-sm md:text-lg absolute bottom-0 bg-transparent bg-black bg-opacity-50 text-white right-0 left-0' >
                                        <h2 className='font-semibold ml-0.5 lg:ml-2  lg:text-[22px]' > {pornstar.Name}</h2>
                                        <div className='flex flex-row items-center justify-start '>
                                            <EyeIcon className='h-5 text-blue-600' />
                                            <h2 className='ml-0.5 text-xs lg:text-[16px]' > {pornstar.views}</h2>
                                        </div>
                                        <div className='flex flex-row items-center justify-start '>
                                            <FilmIcon className='h-5 text-red-600' />
                                            <h2 className='ml-0.5 text-xs lg:text-[16px]' > {pornstar.numberofVideos}</h2>
                                        </div>
                                    </div> */}
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
                                                className={`object-cover w-full rounded  `}
                                                src={pornstar.thumbnail}
                                                alt={pornstar.Name}
                                                loading='lazy'
                                            ></img>

                                            <h2 className='rounded-b absolute text-sm lg:text-lg font-inter p-1 bottom-0 w-full text-center  z-10 text-white bg-transparent bg-black bg-opacity-50'>{pornstar.Name}</h2>
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



