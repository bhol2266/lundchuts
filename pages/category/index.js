import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import jsonData from "../../JsonData/categoryImages/data.json"
import Link from 'next/link'
import RecommendedAds from '../../components/Ads/RecommendedAds';
import BannerAds from '../../components/Ads/BannerAds';
import Outstreams from '../../components/Ads/Outstream';
import Head from 'next/head'





function Index() {

    const router = useRouter();




    return (

        <div className=" lg:w-11/12 mx-auto">
            <Head>
                <title>Categories | desi sex videos, desi mms</title>
                <meta name="description" content="Free desi sex videos, desi mms, Indian sex videos, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection." />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            </Head>



            <div className='flex items-center p-2 m-1 justify-between  rounded-lg  shadow-md'>
                <h2 className='flex-grow text-3xl font-Dmsans'>Porn Categories</h2>
            </div>
            <h1 className="text-center lg:text-left text-sm md:text-lg border-t-[0.5px] lg:border-0 border-slate-300  shadow-xl p-2 mx-1 my-1 font-inter">
                Collections of free desi sex videos, desi mms, Indian sex videos, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection. full hd indian sex videos download free.
            </h1>

            <BannerAds />
            <div className={`grid grid-cols-3 p-1 sm:grid-cols-3 gap-x-1  md:grid-cols-4 lg:grid-cols-5`}>
                {jsonData.map(category => {
                    return (
                        <Link key={category.name} href={`/category/${category.name.toLowerCase().trim().substring(0, category.name.indexOf('.png'))}`}>
                            <a >
                                <div className='  relative m-1 sm:m-2  hover:scale-105 transform transition duration-150 rounded   aspect-box  ' >
                                    <img
                                        className='object-cover w-full'
                                        alt={category.name}
                                        src={category.url}
                                        loading="lazy"
                                    ></img>
                                    <h2 className='font-inter rounded-b absolute text-sm sm:text-lg  px-1 bottom-0 w-full text-center  z-10 text-white bg-transparent bg-black bg-opacity-50'>{category.name.charAt(0).toUpperCase() + category.name.substring(0, category.name.indexOf('.png')).substring(1)}</h2>
                                </div>
                            </a>
                        </Link>
                        // items[i].charAt(0).toUpperCase() + items[i].substring(1);


                    )
                })}

            </div>
            <RecommendedAds />
            <Outstreams />
        </div>
    )
}


export default Index


