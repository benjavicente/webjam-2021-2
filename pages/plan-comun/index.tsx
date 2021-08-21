import Link from "next/link";
import { GetStaticProps } from "next";
import { Item } from "../../lib/types"
import { colors } from "../../lib/helpers"
import { getRootFolder } from "../../lib/fetcher"

function Result({ name, href, files = [] }: Item, index: number) {
  let courseArr = name.split("-");
  let courseName = courseArr[1];
  let courseAcronym = courseArr[0];
  let courseFaculty = courseAcronym.slice(0,3);
  let courseCode = courseAcronym.slice(3,);
  let courseColor = colors[courseFaculty];
  return (
    <div className='flex'>
        {/* <a href={href}>{name}</a> */}
        {files ? <Link href={`./plan-comun/${name}`}>
          <li className="shadow-xl rounded-lg px-6 py-3 relative bg-white cursor-pointer flex-1 flex flex-col justify-between">
        
          <div className="absolute left-6 h-full w-2 -mx-6 -my-3 rounded-l-lg" style={{backgroundColor: courseColor}}></div>
          <div>
            <h1 className="font-bold text-lg font-inter">{courseName}</h1>
            <h3 className="font-thin tracking-wider text-xs font-inter mt-1">{courseAcronym}</h3>
          </div>
          <div className="font-thin tracking-wider text-xs font-inter mt-1 text-right">{files.length} archivos</div>
          </li>
        </Link> : null}
      </div>
      
  )
}

export default function Index({ rootFolder }: { rootFolder: Item[] }) {
  
  // rootFolder.sort((a, b) => (a.name > b.name) ? 1 : -1)
  // console.log(rootFolder)

  return (      
        <>
          <h1 className="text-3xl font-bold py-5 font-inter sticky top-14 -mx-6 px-6 bg-gray-200 z-10" >Plan Común</h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-6">
            {rootFolder.sort((a, b) => (a.name > b.name) ? 1 : -1).reverse().map(Result)}
          </ul>
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
