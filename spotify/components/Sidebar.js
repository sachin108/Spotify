import { HomeIcon,SearchIcon,LibraryIcon, RssIcon} from "@heroicons/react/outline";
import { useSession} from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import useSpotify from '../hooks/useSpotify';
import {playlistIdState} from "../atoms/playlistAtom";
import {PlusCircleIcon, HeartIcon } from "@heroicons/react/solid";

function Sidebar() {
  const spotifyApi = useSpotify();
  const {data:session, status}=useSession();
  const[playlists, setPlaylists]=useState([]);
  const[playlistId, setPlaylistId]=useRecoilState(playlistIdState);

  useEffect(() => {
    if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then((data) =>
      {
        setPlaylists(data.body.items);
      }
      );
    }
  }, [session, spotifyApi]);
  

  return (
    <div className='text-gray-500 p-5 border-r border-gray-900 overflow-y-scroll 
    scrollbar-hide h-screen text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden
    md:inline-flex pb-36'
    >
      <div className='space-y-4'>
        <button className='flex items-center space-x-3 hover:text-white'>
          <HomeIcon className='h-5 w-5'/>
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-3 hover:text-white'>
          <SearchIcon className='h-5 w-5'/>
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-3 hover:text-white'>
          <LibraryIcon className='h-5 w-5'/>
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>
        <button className='flex items-center space-x-3 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5 text-gray-300'/>
          <p>Create PlayList</p>
        </button>
        <button className='flex items-center space-x-3 hover:text-white'>
          <HeartIcon  className='h-5 w-5 text-blue-500'/>
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-3 hover:text-white'>
          <RssIcon className='h-5 w-5 text-green-600'/>
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>

        {playlists.map((playlist) =>(
          <p key={playlist} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">{playlist.name}</p>
          ))
        }

      </div>
    </div>
  )
}

export default Sidebar;
