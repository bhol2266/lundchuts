import React from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';

function Sidebar() {
    const router = useRouter();

    const categories = [
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/1.jpg',
            Title: 'Amateur'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/2.jpg',
            Title: 'Anal'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/3.jpg',
            Title: 'Asian'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/4.jpg',
            Title: 'Babe'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/5.jpg',
            Title: 'BBW'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/48.jpg',
            Title: 'Big Ass'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/6.jpg',
            Title: 'Big Dick'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/7.jpg',
            Title: 'Big Tits'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/41.jpg',
            Title: 'Blonde'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/8.jpg',
            Title: 'Blowjob'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/9.jpg',
            Title: 'Bondage'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/49.jpg',
            Title: 'Brunette'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/50.jpg',
            Title: 'Cam'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/38.jpg',
            Title: 'Compilation'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/10.jpg',
            Title: 'Creampie'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/11.jpg',
            Title: 'Cumshot'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/12.jpg',
            Title: 'Deep Throat'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/13.jpg',
            Title: 'DP'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/14.jpg',
            Title: 'Ebony'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/17.jpg',
            Title: 'Fetish'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/18.jpg',
            Title: 'Fisting'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/37.jpg',
            Title: 'Gay'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/19.jpg',
            Title: 'Groupsex'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/20.jpg',
            Title: 'Handjob'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/21.jpg',
            Title: 'Hardcore'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/39.jpg',
            Title: 'Hentai'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/15.jpg',
            Title: 'Homemade'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/46.jpg',
            Title: 'Indian'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/22.jpg',
            Title: 'Interracial'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/47.jpg',
            Title: 'Japanese'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/23.jpg',
            Title: 'Latina'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/24.jpg',
            Title: 'Lesbian'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/25.jpg',
            Title: 'Massage'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/26.jpg',
            Title: 'Masturbation'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/27.jpg',
            Title: 'Mature'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/28.jpg',
            Title: 'MILF'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/30.jpg',
            Title: 'POV'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/40.jpg',
            Title: 'Redhead'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/32.jpg',
            Title: 'Shemale'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/43.jpg',
            Title: 'Small Tits'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/33.jpg',
            Title: 'Solo'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/34.jpg',
            Title: 'Squirt'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/42.jpg',
            Title: 'Striptease'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/35.jpg',
            Title: 'Teen'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/44.jpg',
            Title: 'Threesome'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/36.jpg',
            Title: 'Toy'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/45.jpg',
            Title: 'Vintage'
        },
        {
            thumbnailImage: 'https://spankbang.com//static/desktop/Images/categories/ids/51.jpg',
            Title: 'VR'
        }
    ]
   

    return (
        <div className='pt-1 hidden md:flex md:flex-col' >
            {categories.map(category => {
                return (

                    <Link key={category.Title}  href={`/category/${category.Title.toLowerCase().trim()}`}>
                        <h2  className="w-44 text-md border-2 border-white hover:bg-red-600 rounded-md text-white  p-1 pl-4 pr-2 cursor-pointer bg-black opacity-75">{category.Title}</h2>
                    </Link>

                )
            })}

        </div>
    )
}

export default Sidebar