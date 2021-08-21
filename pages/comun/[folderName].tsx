import { GetStaticProps, GetStaticPaths } from "next";
import { Item } from "../../lib/types"
import { folderContent } from "../../lib/fetcher"
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

// elemento que contiene un resultado
// es parecido a los componentes, pero solo
// se puede usar en esta ruta
function FileContainer({ name }: Item) {
    return (<li>{name}</li>)
}


export default function Folder({ folderData }: { folderData: Item | null }) {
    if (folderData) {
        const { name, files, href } = folderData
        return (
            <>
                <NavBar />
                <h1>
                    {name}
                </h1>
                <ul>
                    {files?.map(FileContainer)}
                </ul>
                <Footer />
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
