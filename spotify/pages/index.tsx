import Sidebar from '../components/Sidebar';
import Centre from '../components/Centre';
import {getsession, getSession, signIn} from "next-auth/react";

export default function Home() {
  return (
    <div className=' bg-black h-screen overflow-hidden'>
      <main className='flex text-white'>
        <Sidebar/>
        <Centre/>
      </main>
      <div>{/**Player */}</div>
    </div>
  )
}

export async  function getServerSideProps(context){
  const session = await getSession (context);
  return{
      props:{
          session,
      },
  };
}