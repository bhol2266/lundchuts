import VideoThumbnail from "./VideoThumbnail"
import { useState, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useContext, useEffect } from 'react'
import videosContext from '../context/videos/videosContext'

import BannerAds from './Ads/BannerAds'
import Outstream from './Ads/Outstream'
import RecommendedAds from './Ads/RecommendedAds'
import Link from 'next/link'
import {
    ChevronRightIcon
} from '@heroicons/react/outline';

function Videos({ data, title }) {



    return (
        <div className="">
            <BannerAds />

            {title &&
                <Link href={`/${title.substring(0, title.indexOf('Porn')).trim().toLowerCase()}`}>
                    <a>
                        <div className="flex justify-between items-center  rounded bg-red-500 m-1 p-2 px-3 ml-1  hover:bg-red-600  lg:w-3/4 lg:mx-auto lg:px-8">
                            <h2 className="lg:text-2xl text-lg  text-gray-800 font-arial " >{title}</h2>
                            <ChevronRightIcon className="icon" />
                        </div>
                    </a>
                </Link>
            }

            <div className='grid grid-cols-2 p-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            >
                {
                    data.map(video => {
                        return (
                            <VideoThumbnail key={video.thumbnailArray} details={video} />
                        )
                    })
                }

            </div>
            {/* <Outstream /> */}
        </div>


    )
}

export default Videos
