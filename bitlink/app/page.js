import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});
export default function Home() {
  return (
    
    <>
    <main className="bg-purple-100">
      <section className="grid grid-cols-2 h-[50vh]">
        <div className=" flex flex-col gap-4 items-center justify-center">
          <p className={`text-3xl font-bold ${poppins.className}`}>The best URL shortener in the market</p>
          <p className="px-56 text-center">We are the most straight forward URL shortener in the world, most of the url shortener will track you or ask you to give your details for login, we understand your needs and hence created the URL shortener.</p>
          <div className='flex justify-start gap-3 text-white'>
                <Link href="/shorten"><button className='bg-purple-500 shadow-lg p-3 rounded-lg font-bold py-1'>Try Now</button></Link>
                <Link href="/github"><button className='bg-purple-500 shadow-lg p-3 rounded-lg font-bold py-1'>GitHub</button></Link>
                </div>
        </div>
        <div className=" flex justify-start relative">
          <Image alt="vector image" src={"/vector.jpg"} fill={true} className="mix-blend-darken"/>
        </div>

      </section>
    </main>
    </>
  );
}
