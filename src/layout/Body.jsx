import React from 'react'

export default function Body() {
    return (
        <>
            <div class="max-w-4xl text-xl sm:text-3xl text-white italic text-center mt-12 sm:mt-28 font-sans-serif px-8 mx-auto">
                <h2 class="leading-[1.7] tracking-[0.055em]"> Welcome to the NōME gallery – a space for premium 1/1 art and unique digital experiences </h2>
                <h2 class="mt-9 leading-[1.7] tracking-[0.055em]"> $NOME BRC-20 gives access to gallery <br /> exhibitions and art tools. Verify or buy tokens to enter </h2>
            </div>
                <div class="mt-16 sm:mt-40 pb-32 flex flex-col items-center" bis_skin_checked="1">
                    <div class="flex flex-col sm:flex-row gap-4" bis_skin_checked="1">
                        <button class="bg-transparent text-white rounded-lg border border-pink-600 transition-all hover:bg-pink-600 pl-6 py-1 pr-4 tracking-[0.3em] disabled:opacity-50 w-32">
                             VERIFY 
                        </button>
                        <a href="https://unisat.io/market/brc20?tick=N0ME" target="_blank" class="bg-transparent text-white rounded-lg border border-pink-600 transition-all hover:bg-pink-600 pl-6 py-1 pr-4 tracking-[0.3em] disabled:opacity-50 w-32 text-center"> BUY </a>
                </div>
            </div>
        </>
    )
}
