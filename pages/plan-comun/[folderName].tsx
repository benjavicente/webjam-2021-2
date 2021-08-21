import { GetStaticProps, GetStaticPaths } from "next";
import { Item } from "../../lib/types"
import { folderContent } from "../../lib/fetcher"
import Link from "next/link";
import { colors } from "../../lib/helpers"
import useCollapse from 'react-collapsed';

function Tarjeta({name, files}: {name: string, files: []}) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="">
      <button className="bg-white flex w-full items-center px-6 py-3 rounded-lg shadow-lg justify-between mx-auto" {...getToggleProps()}>
        <h1>{name}</h1>
         <span>{isExpanded ? '↑' : '↓'}</span>
      </button>
      <section className="flex flex-col items-center" {...getCollapseProps()}>{files?.map(FileContainer)}</section>
    </div>
  );
}


// elemento que contiene un resultado
// es parecido a los componentes, pero solo
// se puede usar en esta ruta
function FileContainer({ name, href }: Item) {
    let fileArr = name.split("#");
    let fileInterrogation = fileArr[0];
    let fileName = fileArr[1];

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <a className="bg-white block w-full px-6 py-3 rounded-lg shadow-lg mx-auto my-4 hover:underline" href={href} target="_blank" >
        <li className="flex items-center justify-between">
            <h4 className="flex-grow">{fileName}</h4>
            <img src="/images/pdf.png" alt="pdf icon" />
        </li>
        </a>
    )
}


export default function Folder({ folderData }: { folderData: Item | null }) {
    if (folderData) {
        const { name, files, href } = folderData
        let courseArr = name.split("-");
        let courseName = courseArr[1];
        let courseAcronym = courseArr[0];
        let courseFaculty = courseAcronym.slice(0,3);
        let courseColor = colors[courseFaculty];

        let processedFiles = {}
        for (const file of files) {
            let fileArr = file.name.split("#");
            let fileI = fileArr[0];
            let fileName = fileArr[1];
            processedFiles[fileI] = processedFiles[fileI] || []
            processedFiles[fileI].push(file) 
        }
        // console.log(processedFiles)
        // Object.fromEntries(Object.entries(processedFiles).sort());

        let tarjetas = []
        
        for (var [key, value] of Object.entries(processedFiles)) {
            tarjetas.push({name: key, files: value})
        }
        

        console.log(tarjetas);
        
        return (
            <>
            <Link href="./"><h1 className="font-bold py-4 font-inter sticky top-14 -mx-6 px-6 bg-gray-200 z-10 cursor-pointer" >←&nbsp;&nbsp;&nbsp;Plan Común</h1></Link>
            <section className="max-w-3xl mx-auto">
                
            <div className="relative pb-6">
                <h1 className="font-bold text-lg font-inter">{courseName}</h1>
                <h3 className="font-thin tracking-wider text-xs font-inter mt-1">{courseAcronym}</h3>
                {/* <div className="h-full w-0.5 absolute right-6 top-0" style={{backgroundColor: courseColor}}></div> */}
            </div>
                <section >
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
                        {/* {console.log(files)} */}
                        {/* {files?.map(FileContainer)} */}
                        {tarjetas?.map(Tarjeta)}
                    </ul>
                </section>
            </section>
            </>
        )
    }
    return (<h1>404</h1>)
}


// Abajo está el código que corre en el servidor
export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
    const folderData = (typeof params.folderName == "string")
        ? await folderContent(params.folderName)
        : null
    return {
        props: {
            folderData
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}
