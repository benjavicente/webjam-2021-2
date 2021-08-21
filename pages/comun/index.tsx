import Link from "next/link";
import { GetStaticProps } from "next";
import { Item } from "../../lib/types"
import { getRootFolder } from "../../lib/fetcher"

// Estos son los elementos
function Result({ name, href, files = [] }: Item, index: number) {
  return (
    <li key={index}>
      <a href={href}>{name}</a>
      {files ? <Link href={`./comun/${name}`}><a>Ir a sus archivos</a></Link> : null}
    </li>
  )
}

export default function Home({ rootFolder }: { rootFolder: Item[] }) {
  return (
    <main>
      <h1 className="text-3xl font-bold" >Recopilación</h1>
      <ul>
        {rootFolder.map(Result)}
      </ul>
    </main>
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
