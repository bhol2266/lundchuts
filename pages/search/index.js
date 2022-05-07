import React from 'react'
import cheerio from 'cheerio';
import { useState, useRef, } from 'react';
import fetchdata from 'node-fetch';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Head from 'next/head'

function Search({ TrendingKeywords, PopularKeywords }) {


    const searchInputref = useRef('')
    const router = useRouter()

    const goSearch = (e) => {
        e.preventDefault();

        if (e.target[0].value) {
            router.push(`/search/${e.target[0].value.trim()}`)

        }

    }


    return (
        <div className='m-4'>
            <Head>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Most popular and trending porn searches- Chutlunds</title>
                <meta name="description"
                    content="Most popular and trending porn searches - HD porn videos and adult movies- Chutlunds" />
                <meta name="keywords"
                    content="porn, xxx, streaming porn, HD porn, HD adult videos, HD pussy videos, sex movies, Chutlunds" />
                <meta property="og:title" content="Most popular and trending porn searches- Chutlunds" />
                <meta property="og:url" content="https://Chutlunds.com/search/" />
                <meta property="og:description"
                    content="Most popular and trending porn searches - HD porn videos and adult movies- Chutlunds" />
                <link rel="canonical" href="https://Chutlunds.live/search/" />
                <meta name="RATING" content="RTA-5042-1996-1400-1577-RTA" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
                <meta name="author" content="Chutlunds" />
                <meta name="twitter:domain" content="Chutlunds.live" />
                <meta property="og:site_name" content="Chutlunds" />
            </Head>

            <div className={`my-2  transition ease-in-out delay-150 mt-2 `}>

                <form className=' w-full flex ' onSubmit={goSearch}>

                    <input ref={searchInputref} className='flex-grow border-2 border-gray-400 rounded pl-2  ' type="text" placeholder='Search your favourite porn video...' />

                    <button type="submit" className='bg-red-800  hover:bg-red-900 text-white text-sm p-2 pl-4 pr-4 m-1 rounded '>Search</button>

                </form>
            </div>
            <h1 className='text-lg font-bold md:text-2xl'>Most Popular and Trending Porn Searches</h1>
            <h2 className='text-md font-semibold md:text-xl'>Trending porn searches</h2>

            <div className='my-2 flex flex-wrap'>
                {TrendingKeywords.map(keyword => {
                    return (
                        <Link key={keyword} href={`/search/${keyword.trim().replace(/ /g, "+")}`}>
                            <a className='border-2 text-xs border-red-400 rounded font-semibold hover:bg-red-500 m-1 my-0.5 px-1 hover:text-white md:text-lg text-gray-600 '>
                                {keyword}
                            </a>
                        </Link>
                    )
                })}
            </div>

            <h2 className='text-md font-semibold md:text-xl'>Popular porn searches</h2>

            <div className='my-2 flex flex-wrap'>
                {PopularKeywords.map(keyword => {
                    return (
                        <Link key={keyword} href={`/search/${keyword.trim().replace(/ /g, "+")}`}>
                            <a className='border-2 text-xs border-red-400 rounded font-semibold hover:bg-red-500 m-1 my-0.5 px-1 hover:text-white md:text-lg text-gray-600 '>
                                {keyword}
                            </a>
                        </Link>
                    )
                })}
            </div>

        </div>
    )
}

export default Search



export async function getServerSideProps() {


    var TrendingKeywords = []
    var PopularKeywords = []





    const scrape = async (url) => {



        const response = await fetchdata(url)
        const body = await response.text();
        const $ = cheerio.load(body)





        $('.keyword_list').each((i, el) => {

            const selector = cheerio.load(el)
            if (i == 0) {
                selector('li a').each((i, el) => {
                    const data = $(el).text()
                    TrendingKeywords.push(data)
                })
            }
            else if (i === 1) {
                selector('li a').each((i, el) => {
                    const data = $(el).text()
                    PopularKeywords.push(data)
                })
            }


        })






    }


    await scrape(`https://spangbang.com/s/`)





    return {
        props: {
            TrendingKeywords: TrendingKeywords,
            PopularKeywords: PopularKeywords
        }
    }


}