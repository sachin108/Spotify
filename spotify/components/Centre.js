import React, { useEffect, useState } from 'react';
import {useSession} from "next-auth/react"
import { ChevronDownIcon } from '@heroicons/react/outline';
import {shuffle} from "lodash";
import {playlistIdState, playlistState} from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import {signOut} from "next-auth/react";
import Songs from './Songs' ;
const colors=[
  "from-pink-500",
  "from-blue-500",
  "from-yellow-500",
  "from-indigo-500",
  "from-red-500",
  "from-green-500",
  "from-purple-500",
];

function Centre() {
  const spotifyApi = useSpotify();
  const {data:session}=useSession();
  const[color, setColor]=useState(null);
  const playlistId=useRecoilValue(playlistIdState);
  const[playlist, setPlaylist]=useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId] );
  

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) =>{
      setPlaylist(data.body);
    })
    .catch((err) => console.log("something went wrong!", err));
}, [spotifyApi, playlistId]);
  

  return (
  <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>

    <header className='absolute top-5 right-8'>

      <div className=' flex  items-center space-x-3 opacity-90 hover:opacity-80 
      bg-black cursor-pointer rounded-full p-1 pr-2' onClick={signOut}>
          <img className='w-10 h-10 rounded-full' src={session?.user.image} alt=''/>
          <h2 className='text-white'>{session?.user.name}</h2>
          <ChevronDownIcon className='h-5 w-5'/>
      </div>

    </header>

    <section className={`flex items-end space-x-7 bg-gradient-to-b to-black 
   ${color} h-80 text-white  w-full`}>
      <img className='h-full p-8 w-70 shadow-2xl ' src={playlist?.images?.[0].url} alt=''/>
      <div>
        <p className='pl-8 pb-0'>PLAYLIST</p>
        <h1 className='p-8 text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
      </div>
    </section>
    <div>
    </div>
  </div>
  );

}

export default Centre;
