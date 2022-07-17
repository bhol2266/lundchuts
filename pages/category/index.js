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

        <div className="">
            <Head>
                <title>Categories | desi sex videos, desi mms</title>
                <meta name="description" content="Free desi sex videos, desi mms, Indian sex videos, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection." />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            </Head>



            <div className='flex items-center py-2 my-1 justify-between  rounded-lg'>
                <h2 className='text-center lg:text-left  flex-grow text-3xl font-Dmsans'>Porn Categories</h2>
            </div>
            <h1 className="text-center lg:text-left text-sm md:text-lg shadow-xl py-2 my-1 font-inter">
                Collections of free desi sex videos, desi mms, Indian sex videos, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection. full hd indian sex videos download free.
            </h1>

            <BannerAds />
            <div className={`grid grid-cols-3 py-3 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4  md:grid-cols-4 lg:grid-cols-5`}>
                {jsonData.map(category => {
                    return (
                        <Link key={category.name} href={`/category/${category.name.toLowerCase().trim().substring(0, category.name.indexOf('.png'))}`}>
                            <a >
                                <div className='  relative hover:scale-105 transform transition duration-150 rounded   aspect-box  ' >
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


