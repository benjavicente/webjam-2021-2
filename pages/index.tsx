type FileQueryObject = {
  kind: string
  id: string
  name: string
  mimeType: string
}

type FileQueryResponse = {
  kind: string
  incompleteSearch: boolean
  files: FileQueryObject[]
}


function Result({ name }: FileQueryObject, index: number) {
  let courseArr = name.split("-");
  let courseName = courseArr[1];
  let courseAcronym = courseArr[0];
  let courseFaculty = courseAcronym.slice(0,3);
  let courseCode = courseAcronym.slice(3,);

  return (
    <li key={index} className="shadow-xl rounded-lg px-6 py-3 relative bg-white">
      <div className="absolute left-6 h-full w-2 bg-red-500 -mx-6 -my-3 rounded-l-lg"></div>
      <div className="font-bold text-lg font-inter">{courseName}</div>
      <div className="font-thin tracking-wider text-xs font-inter mt-1">{courseAcronym}</div>
      
    </li>
  )
}

export default function Home({ data }: { data: FileQueryResponse }) {
  console.log(data)
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
          {data.files.map(Result)}
        </ul>
      </main>
      <footer className=" py-2.5 w-full flex flex-col items-center justify-center">
        <div><p>{new Date().getFullYear()} - Made with 💙 at dcc-webjam</p></div>
      </footer>
    </>
  )
}


async function getDriveFolderContent(itemID: string) {
  const url = `https://www.googleapis.com/drive/v3/files?q='${itemID}'+in+parents&key=${process.env.API_KEY}`  
  return await (await fetch(url)).json()


  // recursive strategy to obtain folders content
  // return await Promise.all(data.map(async (file) => {
  //   if (file.mimeType === "application/vnd.google-apps.folder") {
  //     const files = await getDriveFolderContent(file.id)
  //     return {type: "folder", files, name: file.name}
  //   }
  //   return {type: "file", name: file.name}
  // }))
}


export async function getStaticProps() {
  const folderId = "1h0CCp6sz-PBmtun9yDDsPLrfvpOUlCBB"
  const data  = await getDriveFolderContent(folderId)
  return {
    props: {
      data
    }
  }
}
