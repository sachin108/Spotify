import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';


const spotifyAPI= new SpotifyWebApi({
    clientId:   process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret:   process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirectUri:    process.env.REDIRECT_URI
});


function useSpotify() {

    const {data:session, status}=useSession();
    
    useEffect(() => {
        if(session){
            // if refresh token attempt fails
            if(session.error === 'RefreshAccessTokenError'){
                signIn();
            }
            spotifyAPI.setAccessToken(session.user.accessToken);
        }
    }, [session]);
    

  return spotifyAPI;
}

export default useSpotify;
