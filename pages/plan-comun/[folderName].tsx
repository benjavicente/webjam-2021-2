import { GetStaticProps, GetStaticPaths } from "next";
import { Item } from "../../lib/types"
import { folderContent } from "../../lib/fetcher"


// elemento que contiene un resultado
// es parecido a los componentes, pero solo
// se puede usar en esta ruta
function FileContainer({ name, href }: Item) {
    return (
    <div>
        <li className="text-red-500">{name}</li>
        <li className="text-blue-500">{href}</li>
    </div>
    )
}


export default function Folder({ folderData }: { folderData: Item | null }) {
    if (folderData) {
        const { name, files, href } = folderData
        return (
            <>
                <h1 className="text-blue-500">
                    {name}
                </h1>
                <ul >
                    {files?.map(FileContainer)}
                </ul>
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
