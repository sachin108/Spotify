import {playlistState} from '../atoms/playlistAtom';
import {useRecoilValue} from 'recoil';
import Song from './Song';
function Songs() { 

  const playlist = useRecoilValue(playlistState);
  return (
  <div className='text-white flex flex-col space-y-1 px-8 pb-28'>
    {playlist?.tracks.items.map((track, i) => (
      <Song key={track.track.id} track={track}  order={i}  />
    ))}
  </div>
  );
}

export default Songs;
