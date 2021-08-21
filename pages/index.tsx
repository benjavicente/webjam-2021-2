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


function Result({ name }: FileQueryObject) {
  return (
    <li>
      {name}
    </li>
  )
}

export default function Home({ data }: { data: FileQueryResponse }) {
  console.log(data)
  return (
    <main>
      <h1>Recopilación</h1>
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


export async function getStaticProps(context) {
  const folderId = "1h0CCp6sz-PBmtun9yDDsPLrfvpOUlCBB"
  const data  = await getDriveFolderContent(folderId)
  console.log(data)
  return {
    props: {
      data
    }
  }
}
