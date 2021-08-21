import Link from "next/link";
import { GetStaticProps } from "next";
import { Item } from "../lib/types"
import { getRootFolder } from "../lib/fetcher"


function Result({ name, href, files = [] }: Item, index: number) {
  // let courseArr = name.split("-");
  // let courseName = courseArr[1];
  // let courseAcronym = courseArr[0];
  // let courseFaculty = courseAcronym.slice(0,3);
  // let courseCode = courseAcronym.slice(3,);

  return (
    <li key={index} className="shadow-xl rounded-lg px-6 py-3 relative bg-white">
      <div className="absolute left-6 h-full w-2 bg-red-500 -mx-6 -my-3 rounded-l-lg"></div>
      <a href={href}>{name}</a>
      {files ? <Link href={`./${name}`}><a>Ir a sus archivos</a></Link> : null}
      {/* <div className="font-bold text-lg font-inter">{courseName}</div>
      <div className="font-thin tracking-wider text-xs font-inter mt-1">{courseAcronym}</div> */}
      
    </li>
  )
}

export default function Home({ rootFolder }: { rootFolder: Item[] }) {
  return (
    <>
      <nav className="bg-gray-200 w-full sticky top-0 flex justify-between items-center z-10 px-6 md:px-12">
        <h1 className="text-lg font-semibold py-4 font-inter">Ensaying</h1>
        <ul className="flex">
          <li className="pl-6 hover:underline cursor-pointer">
            Home
          </li>
          <li className="pl-6 hover:underline cursor-pointer">
            Contacto
          </li>
        </ul>
      </nav>
      <main className="px-4 sm:px-6 md:px-12 flex-auto">
        <h1 className="text-3xl font-bold py-6 font-inter sticky top-0 bg-gray-200 z-10" >Plan Común</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-6">
          {rootFolder.map(Result)}
        </ul>
      </main>
      <footer className=" py-2.5 w-full flex flex-col items-center justify-center">
        <div><p>{new Date().getFullYear()} - Made with 💙 at dcc-webjam</p></div>
      </footer>
    </>
  )
}

// Abajo está el código que corre en el servidor
export const getStaticProps: GetStaticProps = async () => {
  const rootFolder = await getRootFolder()
  return {
    props: {
      rootFolder
    }
  }
}
