import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-[85vh] ">
        <div className="flex justify-center flex-col gap-4 items-center text-white h-[70vh]">

          <div className="font-bold text-3xl md:text-5xl">Your Own Paper Helper</div>
          <p>The paper has arrived—no need to fear, because I’m here!</p>
          <div>
            <Link href="/select" className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 w-30 h-12 text-xl p-2 mt-20 md:m-1">
              Let's go
            </Link>
          </div>

        </div>

        <div className="bg-white h-1 w-full opacity-10 my-15"></div>

        <div className="text-white container mx-auto pb-32 pt-14 px-10">
      
        <div className="flex gap-10 md:gap-5 justify-around flex-col md:flex-row">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/upload-file.gif" alt="" />
            <p className="font-bold text-center">Upload Paper</p>
            <p className="text-center">Want to upload papers to help your friends</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/read.gif" alt="" />
            <p className="font-bold text-center">Willing to study</p>
            <p className="text-center">Study for you exams</p>
          </div><div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/score.gif" alt="" />
            <p className="font-bold text-center">Want to score</p>
            <p className="text-center">Score good in exams</p>
          </div>
        </div>
      </div>
</div>
    </>
  );
}
