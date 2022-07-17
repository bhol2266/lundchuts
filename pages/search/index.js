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
        <div className=" ">

            <Head>
                <title>Most popular and trending porn searches- Chutlunds</title>
                <meta name="description"
                    content="Most popular and trending porn searches - HD porn videos and adult movies- Chutlunds" />
            </Head>


            <div className={`my-2  transition ease-in-out delay-150 mt-2 `}>

                <form className='w-full sm:w-[400px] lg:w-[600px] flex items-center' onSubmit={goSearch}>

                    <input ref={searchInputref} className='shadow-lg mr-3 flex-grow   outline-none text-inter text-sm sm:text-md  border-gray-300 rounded pl-2  h-[35px]' type="text" placeholder='Search your favourite porn video...' />

                    <button type="submit" className='bg-red-800  hover:bg-red-900 text-white text-sm p-2 pl-4 pr-4 m-1 rounded '>Search</button>

                </form>
            </div>
            <h1 className='text-lg font-bold md:text-2xl font-poppins'>Most Popular and Trending Porn Searches</h1>
            <h2 className='text-md font-semibold md:text-xl font-poppins text-red-700'>Trending porn searches</h2>

            <div className='my-2 flex flex-wrap '>
                {TrendingKeywords.map(keyword => {
                    return (
                        <Link key={keyword} href={`/search/${keyword.trim().replace(/ /g, "+")}`}>
                            <a className='my-1 mr-1.5 lg:mr-3 p-1 px-2 text-xs text-black bg-gray-300 rounded font-semibold hover:bg-red-700  font-poppins hover:text-white md:text-lg  '>
                                {keyword}
                            </a>
                        </Link>
                    )
                })}
            </div>

            <h2 className='text-md font-semibold md:text-xl font-poppins text-red-700'>Popular porn searches</h2>

            <div className='my-2 flex flex-wrap '>
                {PopularKeywords.map(keyword => {
                    return (
                        <Link key={keyword} href={`/search/${keyword.trim().replace(/ /g, "+")}`}>
                            <a className='my-1 mr-1.5 lg:mr-3 p-1 px-2 text-xs text-black bg-gray-300 rounded font-semibold hover:bg-red-700  font-poppins hover:text-white md:text-lg  '>
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


    await scrape(`https://spankbang.com/s/`)





    return {
        props: {
            TrendingKeywords: TrendingKeywords,
            PopularKeywords: PopularKeywords
        }
    }


}