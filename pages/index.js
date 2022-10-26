import Head from 'next/head'
import Image from 'next/image'
import LayoutDefault from '../layouts/default'

export default function Home() {
  return (
    <div className='text-3xl font-bold underline'>
      INI BODY
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <LayoutDefault>
      {page}
    </LayoutDefault>
  )
}