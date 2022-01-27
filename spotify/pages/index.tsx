import Sidebar from '../components/Sidebar';
import Centre from '../components/Centre';
export default function Home() {
  return (
    <div className=' bg-black h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar/>
        <Centre/>
      </main>
      <div>{/**Player */}</div>
    </div>
  )
}
