import SpotifyWebApi from "spotify-web-api-node";
const scopes = [
    "user-read-email",
    "streaming",
    "user-library-read",
    "playlist-modify-private",
    "playlist-read-private",
    "user-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read",
].join(',');

const params={
    scope:scopes,  
}

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL="https://accounts.spotify.com/authorize?"+queryParamString.toString();

const spotifyAPI= new SpotifyWebApi({
    clientId:   process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret:   process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirectUri:    process.env.REDIRECT_URI
});

export default spotifyAPI;

export {LOGIN_URL};