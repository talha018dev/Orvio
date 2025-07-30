import React from 'react'

const PlansListSkeleton = () => {
  return (
    <section className='flex flex-col gap-3'>
        <div className='h-25 w-full bg-pageBgColor animate-pulse rounded-xl'></div>
        <div className='h-25 w-full bg-pageBgColor animate-pulse rounded-xl'></div>
        <div className='h-25 w-full bg-pageBgColor animate-pulse rounded-xl'></div>
        <div className='h-10 w-full bg-pageBgColor animate-pulse rounded-xl mt-5'></div>
    </section>
  )
}

export default PlansListSkeleton