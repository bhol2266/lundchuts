import React from 'react'
import Link from 'next/link'
import jsonData from "../JsonData/categoryImages/data.json"


function Category_slider() {




    // Used like so
    var array = jsonData;

    return (
        <div className='flex items-start space-x-3 text-color overflow-x-scroll scrollbar-hide px-2 h-fit md:hidden mt-4 mb-1'>

            {array.map(category => {
                return (
                    <Link href={`/category/${category.name.substring(0, category.name.indexOf('.png')).toLowerCase()}`} key={category.name} >
                        <a className='flex flex-col justify-center items-center mx-1'>
                            <div className='w-16'>
                                <img className='shadow-md rounded-full object-cover aspect-square' src={category.url} alt='loading...'></img>
                            </div>
                            <h2 className='text-xs text-center font-theme font-semibold mt-1'>{category.name.substring(0, category.name.indexOf('.png')).toUpperCase()}</h2>
                        </a>
                    </Link>
                )
            })}

        </div>
    )
}

export default Category_slider