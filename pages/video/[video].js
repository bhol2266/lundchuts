import Head from 'next/head';
import { useEffect, useState } from 'react';
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import { useRouter } from "next/router";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Videos from '../../components/Videos'
import fetchdata from 'node-fetch';
import {
    ThumbUpIcon, ClockIcon, FilmIcon, EyeIcon, PlusIcon, MinusIcon, CogIcon
} from '@heroicons/react/solid';
import { useRef } from 'react';
import BannerAds from '../../components/Ads/BannerAds';
import Outstream from '../../components/Ads/Outstream';
import RecommendedAds from '../../components/Ads/RecommendedAds';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Videoplayer({ videolink_qualities_screenshots, preloaded_video_quality, relatedVideos, pornstar, video_details }) {

    let uniquePornstars = pornstar.filter((element, index) => {
        return pornstar.indexOf(element) === index;
    });


    const videoPlayerRef = useRef(null)
    const [screenshotlayoutToggle, setscreenshotlayoutToggle] = useState('hidden')
    const [PlusVisible, setPlusVisible] = useState('flex')
    const [MinusVisible, setMinusVisible] = useState('hidden')
    const [Quality, setQuality] = useState(preloaded_video_quality)
    const [VideoSrc, setVideoSrc] = useState(videolink_qualities_screenshots.default_video_src)
    const [tags, settags] = useState([]);

    useEffect(() => {
        let uniqarray = [...new Set(videolink_qualities_screenshots.tagsArray)];
        settags(uniqarray)

    }, []);


    const openScreenShotLayout = () => {
        if (screenshotlayoutToggle === 'flex') {
            setscreenshotlayoutToggle('hidden')
            setPlusVisible('flex')
            setMinusVisible('hidden')
        } else {

            setscreenshotlayoutToggle('flex')
            setPlusVisible('hidden')
            setMinusVisible('flex')
        }
    }

    //Quality Changer Onclick
    const menuItemOnClick = (quality) => {
        if (quality != Quality) {

            const currentTime = videoPlayerRef.current.currentTime;
            setQuality(quality);
            const index = videolink_qualities_screenshots.video_qualities_available.indexOf(quality)
            videoPlayerRef.current.load()
            videoPlayerRef.current.currentTime = currentTime
            videoPlayerRef.current.play();
            setVideoSrc(videolink_qualities_screenshots.video_qualities_available_withURL[index])
        }

    }

    const seekTimeOnclick = (obj) => {
        const time = obj.seekTime;

        const extractMinute = parseInt(time.substring(0, time.indexOf(":")))
        const extractSeconds = parseInt(time.substring(time.indexOf(":") + 1, time.length))

        console.log(`extractMinute:${extractMinute}`);
        console.log(`extractSeconds:${extractSeconds}`);

        //videotime will is set in seconds by default
        videoPlayerRef.current.currentTime = (extractMinute * 60) + extractSeconds
        videoPlayerRef.current.play();
        console.log((extractMinute * 60) + extractSeconds);

    }


    return (
        <>

            <Head>
                <title>{video_details.Title}</title>

                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

            </Head>


            {video_details.Title && <div>

                <div className='flex pl-1 text-sm md:text-lg'>

                    <div className='flex items-center space-x-1'>
                        <FilmIcon className='h-[20px] md:h-9 hover:scale-100 text-red-600' />
                        {videolink_qualities_screenshots.video_qualities_available.map(quality => {
                            return (
                                <p key={quality} className='font-poppins pr-1 '>{quality}</p>

                            )
                        })}
                    </div>

                </div>




                <h1 className='text-md sm:text-lg font-semibold px-2 pt-1 text-wrap text-gray-700 md:text-2xl font-inter'>{video_details.Title}</h1>


                <div className='p-1 border-2 border-gray-200 rounded overflow-hidden sm:cursor-pointer md:w-4/5'>

                    <div className=' hover:brightness-75 group  relative'>


                        <video ref={videoPlayerRef} poster={video_details.thumbnail} autoPlay className={`w-full aspect-video object-contain`} width="1280" height="720" controls >
                            <source src={VideoSrc} type="video/mp4" />

                        </video>

                    </div>

                    <div className="flex justify-between p-2 text-sm md:text-lg   ">



                        <div className="flex justify-around items-center space-x-2 md:space-x-4 md:text-lg ">

                            <div className='flex items-center space-x-1'>
                                <ClockIcon className='h-6 hover:scale-100 text-red-700 md:h-9' />
                                <p className=' font-bold'>{video_details.duration}</p>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <EyeIcon className="h-6 text-blue-600  md:h-9" />
                                <p className=' font-bold'>{video_details.views.length > 1 ? video_details.views : "46513"}</p>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <ThumbUpIcon className="h-6 text-green-500  md:h-9" />
                                <p className=' font-bold'>{video_details.likedPercent}</p>
                            </div>



                        </div>
                        <div>
                            <Menu as="div" className="relative  text-left">
                                <div className=' w-fit relative '>
                                    <Menu.Button className="flex items-center space-x-1">
                                        <CogIcon className="h-9 text-gray-600 m-1 " />
                                        <p className={`${Quality === '720p' || Quality === '1080p' || Quality === '4k' ? "" : "hidden"} text-xs bg-red-500 rounded text-white absolute top-1 right-0`}>HD</p>
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="z-50 origin-top-right absolute right-0 bottom-11 mt-2 w-fit rounded-md shadow-lg bg-transparent bg-white bg-opacity-75  ">
                                        <div className=" border-2 border-gray-400 rounded">

                                            {videolink_qualities_screenshots.video_qualities_available.map(quality => {
                                                return (
                                                    <Menu.Item key={quality} onClick={() => { menuItemOnClick(quality) }}>
                                                        {({ active }) => (
                                                            <div className={`${quality === Quality ? "text-red-500" : ""} relative px-4 hover:bg-gray-300 `}>
                                                                <a
                                                                    href="#"
                                                                    className={classNames(
                                                                        active ? ' ' : '',
                                                                        'block   py-2 text-sm font-semibold  text-left'
                                                                    )}
                                                                >
                                                                    {quality}
                                                                </a>
                                                                <p className={`${quality === '720p' || quality === '1080p' || quality === '4k' ? "" : "hidden"} text-xs bg-red-500 rounded text-white absolute top-1 right-0`}>HD</p>
                                                            </div>
                                                        )}
                                                    </Menu.Item>
                                                )
                                            })}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>


                        </div>

                    </div>

                    {/* Tags */}
                    <div className='p-1 flex flex-wrap'>
                        {
                            tags.map(key => {
                                if (key.length >= 1) {

                                    return (
                                        <a key={key} href={`/search/${key.trim()}**1`}>
                                            <p className='text-xs md:text-sm ml-1 mt-1 cursor-pointer hover:bg-gray-900 rounded px-[5px] py-[2px]  font-inter text-white bg-gray-600'>{key}</p>
                                        </a>
                                    )
                                }
                            })
                        }
                    </div>

                    {uniquePornstars.length >= 1 && <div className='flex items-center py-2'>
                        <span className='font-semibold text-lg'>Pornstar:</span>
                        {uniquePornstars.map(pornstars => {
                            return (

                                <a key={pornstars}>
                                    <p className='pl-1 pr-1 text-xs md:text-sm ml-1 mt-1 cursor-pointer hover:bg-green-300 rounded bg-green-100 border-gray-400 border-2'>
                                        {pornstars}
                                    </p>
                                </a>


                            )
                        })}
                    </div>
                    }



                    {/* ScreenShots  */}

                    <div onClick={openScreenShotLayout} className='flex  justify-between p-1 hover:bg-gray-300 bg-gray-200 rounded border-2 border-gray-300 m-1 md:w-fit md:space-x-4'>

                        <p className='text-black font-bold text-2xl text-center '>Screenshots</p>
                        <PlusIcon className={`icon hover:scale-100 ${PlusVisible}`} />
                        <MinusIcon className={`icon hover:scale-100 ${MinusVisible}`} />

                    </div>
                    <div className={`flex-wrap items-center justify-center md:justify-start  ${screenshotlayoutToggle} `}>
                        {videolink_qualities_screenshots.screenshotsArray.map(shot => {
                            return (
                                <div onClick={() => { seekTimeOnclick(shot) }} className='p-1 relative' key={shot}>
                                    <img
                                        className='rounded'
                                        alt='loading'
                                        src={shot.url}
                                        layout='fixed'
                                        height={108}
                                        width={192}
                                    ></img>
                                    <strong className='absolute bottom-0 right-0 text-white m-2 bg-transparent bg-black bg-opacity-50 text-sm '>{shot.seekTime}</strong>
                                </div>
                            )
                        })}

                    </div>


                </div>






                <div className='flex p-1 flex-col  items-center md:flex-row sm:justify-items-start'>
                    <p className='font-bold text-red-500 text-lg'>Videos related to</p>
                    <p className='font-bold text-lg pl-1'>{video_details.Title}</p>
                </div>
                <Videos data={relatedVideos} />
            </div>
            }



            <Outstream />
            <RecommendedAds />


        </>

    )
}





export default Videoplayer


export async function getServerSideProps(context) {


    const { video } = context.query;
    const keyy = video.substring(video.indexOf("video/"), video.indexOf("*"))
    const title = video.substring(video.indexOf("*") + 1, video.length).trim();


    var finalDataArray = {}
    var preloaded_video_quality = ''
    var relatedVideos = []
    var pornstar = []
    var videodetails = {}



    const scrape = async (body) => {

        //Related Videos

        var thumbnailArray = []
        var TitleArray = []
        var durationArray = []
        var likedPercentArray = []
        var viewsArray = []
        var previewVideoArray = []
        var hrefArray = []

        const $ = cheerio.load(body)



        $('.right .video-item picture img').each((i, el) => {

            const data = $(el).attr("data-src")
            thumbnailArray.push(data)


        })
        $('.right .video-item picture img').each((i, el) => {

            const data = $(el).attr("alt")
            TitleArray.push(data)


        })
        $('.right .video-item .l').each((i, el) => {

            const data = $(el).text()
            durationArray.push(data)
        })



        $('.right .video-item .stats').each((i, el) => {

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


        $('.right .video-item picture img').each((i, el) => {

            const data = $(el).attr("data-preview")
            previewVideoArray.push(data)
        })



        $('.right .video-item').each((i, el) => {

            const data = $(el).children().eq(1).attr("href")
            if (data) {
                hrefArray.push(`https://spankbang.com${data}`)
            }


        })



        for (let index = 0; index < thumbnailArray.length; index++) {

            if (hrefArray[index] != undefined && previewVideoArray[index] != undefined && !thumbnailArray[index].includes("//assets.sb-cd.com")) {

                relatedVideos.push({
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



    const scrape2 = async (url) => {


        var default_video_src = ''
        var video_qualities_available_withURL = []
        var screenshotsArray = []
        var video_qualities_available = []

        var tagsArray = []
        var categoriesArray = []


        const response = await fetchdata(url)
        const body = await response.text();
        const $ = cheerio.load(body)




        await scrape(body)


        $('video source').each((i, el) => {
            const data = $(el).attr("src")
            default_video_src = data
        })

        const cut1 = body.substring(body.indexOf('<main id="container">'), body.indexOf(`<main id="container">`) + 1000);
        const cut2 = cut1.substring(cut1.indexOf('var stream_data'), body.indexOf("mpd"));
        let video_qualities_url_array = extractUrls(cut2)

        //remove unwanted urls from "video_qualities_url_array"
        video_qualities_url_array = video_qualities_url_array.filter(url => {
            if (url.includes("https://vdownload")) {
                return url
            }
        })


        // Sometime the default_video_src is null in that case assinging second last url from "video_qualities_url_array"
        if (default_video_src.length < 5) {
            default_video_src = video_qualities_url_array[video_qualities_url_array.length - 2]
        }

        //Know which quality is set by default on spangbang website
        if (default_video_src.includes("240p.mp4")) {
            preloaded_video_quality = "240p"
        }
        if (default_video_src.includes("320p.mp4")) {
            preloaded_video_quality = "320p"
        }
        if (default_video_src.includes("480p.mp4")) {
            preloaded_video_quality = "480p"
        }
        if (default_video_src.includes("720p.mp4")) {
            preloaded_video_quality = "720p"
        }
        if (default_video_src.includes("1080p.mp4")) {
            preloaded_video_quality = "1080p"
        }
        if (default_video_src.includes("4k.mp4")) {
            preloaded_video_quality = "4k"
        }





        //Extract available video qualities
        for (let index = 0; index < video_qualities_url_array.length; index++) {
            if (video_qualities_url_array[index].includes("vdownload")) {

                if (video_qualities_url_array[index].includes("240p.mp4")) {
                    video_qualities_available.push("240p")
                }
                if (video_qualities_url_array[index].includes("320p.mp4")) {
                    video_qualities_available.push("320p")
                }
                if (video_qualities_url_array[index].includes("480p.mp4")) {
                    video_qualities_available.push("480p")

                }
                if (video_qualities_url_array[index].includes("720p.mp4")
                ) {
                    video_qualities_available.push("720p")

                }
                if (video_qualities_url_array[index].includes("1080p.mp4")) {
                    video_qualities_available.push("1080p")

                }
                if (video_qualities_url_array[index].includes("4k.mp4")) {
                    video_qualities_available.push("4k")

                }
            }

        }


        //This is just replacing quality query from default_video_src according to vailable qualities 
        for (let index = 0; index < video_qualities_available.length; index++) {
            video_qualities_available_withURL.push(default_video_src.replace(preloaded_video_quality, video_qualities_available[index]))
        }




        var sreenshots = []
        var seektime = []
        $('.timeline div span img').each((i, el) => {
            const data = $(el).attr("data-src")
            sreenshots.push(data)
        })
        $('.timeline div strong').each((i, el) => {
            const data = $(el).text()
            seektime.push(data)
        })

        for (let index = 0; index < sreenshots.length; index++) {
            screenshotsArray.push({ url: sreenshots[index], seekTime: seektime[index] })
        }


        $('.cat .ent a').each((i, el) => {

            const data = $(el).text()
            tagsArray.push(data)
        })
        $('.cat .ent a').each((i, el) => {
            if ($(el).attr('href').includes('/pornstar/')) {
                const data = $(el).text()
                pornstar.push(data)
            }

        })


        // This is the data for video Details which was getting from localstorage previosly
        var Title = ''
        var duration = ''
        var likedPercent = ''
        var thumbnail = ''
        var views = ''
        $('.left h1').each((i, el) => {

            const data = $(el).text()
            Title = data
        })
        $('.i-length').each((i, el) => {

            const data = $(el).text()
            duration = data
        })
        $('.rate').each((i, el) => {

            const data = $(el).text()
            likedPercent = data
        })
        $('.play_cover img').each((i, el) => {

            const data = $(el).attr('src')
            thumbnail = data
        })
        $('.i-plays').each((i, el) => {

            const data = $(el).text()
            views = data
        })

        videodetails = {
            Title: Title,
            duration: duration,
            likedPercent: likedPercent,
            thumbnail: thumbnail,
            views: views,
        }









        finalDataArray = {
            default_video_src: default_video_src,
            video_qualities_available: video_qualities_available,
            video_qualities_available_withURL: video_qualities_available_withURL,
            screenshotsArray: screenshotsArray,
            tagsArray: tagsArray,
        }

    }


    await scrape2(`https://spankbang.com/${keyy}/video/${title}`)
    // console.log(`https://spankbang.com/${keyy}/video/${title}`);




    return {
        props: {
            videolink_qualities_screenshots: finalDataArray,
            preloaded_video_quality: preloaded_video_quality,
            relatedVideos: relatedVideos,
            pornstar: pornstar,
            video_details: videodetails
        }
    }


}






