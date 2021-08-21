import { GetStaticProps, GetStaticPaths } from "next";
import { Item } from "../lib/types"
import { folderContent } from "../lib/fetcher"



function FileContainer({ name }: Item) {
    return (<li>{name}</li>)
}
export default function Folder({ folderData }: { folderData: Item | null }) {
    if (folderData) {
        const { name, files, href } = folderData
        return (
            <>
                <h1>
                    {name}
                </h1>
                <ul>
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
