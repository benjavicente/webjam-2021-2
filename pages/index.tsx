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
  return (
    <li key={index}>
      {name}
    </li>
  )
}

export default function Home({ data }: { data: FileQueryResponse }) {
  console.log(data)
  return (
    <main>
<<<<<<< HEAD
      <h1 className="text-3xl font-bold" >Recopilación</h1>
=======
      <h1 className="text-5xl">Recopilación</h1>
>>>>>>> e9749def5f3671850bc9adbdf581a42d4203b6ca
      <ul>
        {data.files.map(Result)}
      </ul>
    </main>
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
