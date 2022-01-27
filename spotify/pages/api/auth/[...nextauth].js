
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/Spotify";

async function refreshAccessToken(token){
    try{
        spotifyAPI.setAccessToken(token.accessToken);
        spotifyAPI.setRefreshToken(token.refreshToken);

        const {body:refreshedToken}=await spotifyApi.refreshAccessToken();
        console.log("REFRESHED TOKEN IS", refreshedToken);

        return{
            ...token,
            accessToken:refreshedToken.access_token,
            accessTokenExpires:Date.now + refreshedToken.expires_in*1000,
            refreshToken:refreshedToken.refresh_token ?? token.refreshToken

        };
    }
    catch(error){
        console.error(error);
        return{
            ...token,
            error:"RefreshAccessTokenError",
        };
    }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret:process.env.JWT_SECRET,
  pages:{
      signIn:"/login",
  },
  callbacks:{
        async jwt({token, account, user}){
            //initial sign in
            if(user && account){
                 return{
                     ...token,
                     accessToken:account.access_token,
                     refreshToken: account.refresh_token,
                     userName:account.provideAccountId,
                     accessTokenExpires:account.expires_at*1000 //handling expiry time in milliseconds
                 }
            }
            //return prv token if access token has not expired yet
            if(Date.now()<token.accessTokenExpires){
                console.log("EXISTING ACCESS TOKEN IS VALID");
                return token;
            }
            // if not expires
            console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
            return await refreshAccessToken(token);
        },
        async session({session, token}){
            session.user.accessToken=token.accessToken;
            session.user.refreshToken=token.refreshToken;
            session.user.username=token.username;
            return session;
        }
    }
});