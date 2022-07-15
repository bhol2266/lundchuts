import {
    ClockIcon,
    ThumbUpIcon
} from '@heroicons/react/outline';
import {
    EyeIcon
} from '@heroicons/react/solid';
import Head from 'next/head';
import { useState } from 'react';







function VideoThumbnail({ details }) {


    const video = details;

    const key = details.hrefArray.substring(details.hrefArray.indexOf('video/') + 6, details.hrefArray.length)
    const [spinnerloader, setspinnerloader] = useState(false);




    const OnClickHandler = () => {
        const object = {
            Title: video.TitleArray,
            duration: video.durationArray,
            likedPercent: video.likedPercentArray,
            thumbnail: video.thumbnailArray,
            views: video.viewsArray,

        }

        localStorage.setItem('videoplayer', JSON.stringify(object));
    }



    const stopMovie = (e) => {
        e.target.load();
        setspinnerloader(false)

    }

    const playMovie = (e) => {
        e.target.play();
        setspinnerloader(true)


    }

    var key_title = video.hrefArray.substring(video.hrefArray.indexOf('com/') + 4, video.hrefArray.length)
    var keyy = key_title.substring(0, key_title.indexOf('/video'))
    var title = key_title.substring(key_title.indexOf('video/') + 6, key_title.length)

    return (
        <div className="">


            <a href={`/video/${keyy}*${title}`} onClick={OnClickHandler} data-title={video.TitleArray} >
                <div className={`mb-2 animate-fade flex  items-start  flex-col justify-center  cursor-pointer  shadow-md  rounded-lg overflow-hidden transform transition duration-150 bg-red-100  `}>



                    <video
                        className={`w-full aspect-video object-contain ${spinnerloader ? "" : ""} lazy`}
                        onMouseOver={playMovie}
                        onMouseLeave={stopMovie}
                        src={video.previewVideoArray}
                        poster={video.thumbnailArray}
                        preload='none'
                        muted="muted"
                    />



                    <h2 className=" text-sm sm:text-md  pl-1  lg:pl-4  whitespace-nowrap overflow-hidden font-inter  text-gray-800 ">{video.TitleArray}</h2>


                    <div className="flex justify-start space-x-3 md:justify-start lg:space-x-6 
                        overflow-hidden w-full pl-1 pt-1 lg:pl-4  font-arial ">

                        <div className="flex justify-center items-center ">
                            <ClockIcon className="icon text-red-500" />
                            <p className='text-sm md:text-md text-gray-700 font-light font-inter'>{video.durationArray}</p>
                        </div>
                        {/* <div className="flex justify-center items-center ">
                            <EyeIcon className="icon text-yellow-400" />
                            <p className='text-sm md:text-md'>{video.viewsArray}</p>
                        </div> */}

                        <div className="flex justify-center items-center ">
                            <ThumbUpIcon className="icon text-green-500" />
                            <p className='text-sm md:text-md text-gray-700 font-light font-inter'>{video.likedPercentArray}</p>
                        </div>


                    </div>

                </div>

            </a>
            {/* </Link> */}



        </div >
    )
}

export default VideoThumbnail
