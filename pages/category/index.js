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
                <meta name='asg_verification' content='vVcWCcbbgmnqv221hpAjPojb' />
                <meta name="exoclick-site-verification" content="6b1112fe173bdf782d96975e70bd4b95"></meta>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            </Head>
            <div className='flex items-center p-2 m-1 justify-between bg-gray-200 rounded-lg border-2 border-gray-300 shadow-md'>
                <h1 className='flex-grow text-3xl  ml-4'>Porn Categories</h1>
            </div>
            <p className="bg-yellow-100 rounded-lg border-2 border-gray-300 shadow-md p-2 m-1">
                ChutLund covers all and every possible porn category that you can think of, even the kinkiest ones that might not be as popular as anal, teen, MILF, threesome and amateur. Regardless of your taste, you can easily find what suits your interest at any given time. Today, you might be all about blowjobs, tomorrow about BBW scenes and a week from now, you would like to experience interracial category - all this one ChutLund.
            </p>

            <BannerAds />
            <div className={`grid grid-cols-3 p-1 sm:grid-cols-3 gap-x-1  md:grid-cols-4 lg:grid-cols-5`}>
                {jsonData.map(category => {
                    return (
                        <Link key={category.name} href={`/category/${category.name.toLowerCase().trim().substring(0, category.name.indexOf('.png'))}`}>
                            <a >
                                <div className='  relative m-1 sm:m-2  hover:scale-105 transform transition duration-150 rounded   aspect-box  ' >
                                    <img
                                        className='object-cover w-full'
                                        alt='loading'
                                        src={category.url}
                                        loading="lazy"
                                    ></img>
                                    <h2 className='rounded-b absolute text-md sm:text-lg font-bold p-1 bottom-0 w-full text-center  z-10 text-white bg-transparent bg-black bg-opacity-50'>{category.name.charAt(0).toUpperCase() + category.name.substring(0, category.name.indexOf('.png')).substring(1)}</h2>
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


