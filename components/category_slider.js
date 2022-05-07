import React from 'react'
import Link from 'next/link'
import jsonData from "../JsonData/categoryImages/data.json"


function Category_slider() {



    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    // Used like so
    var array = shuffle(jsonData);

    return (
        <div className='flex items-start space-x-3 text-[#5b5b5b] overflow-x-scroll scrollbar-hide px-2 h-fit md:hidden mt-4 mb-1'>

            {array.map(category => {
                return (
                    <Link href={`/category/${category.name.substring(0, category.name.indexOf('.png')).toLowerCase()}`} key={category.name} >
                        <a className='flex flex-col justify-center items-center mx-1'>
                            <div className='w-16'>
                                <img className='border-gray-500 border-2 rounded-full object-cover aspect-square' src={category.url} alt='loading...'></img>
                            </div>
                            <h2 className='text-xs text-center font-semibold'>{category.name.substring(0, category.name.indexOf('.png')).toUpperCase()}</h2>
                        </a>
                    </Link>
                )
            })}

        </div>
    )
}

export default Category_slider