import cacheData from "memory-cache"
import { FileQueryObject, FileQueryResponse, Item } from "./types";

async function getDriveFolderContent(itemID: string): Promise<Item[]> {
    const url = `https://www.googleapis.com/drive/v3/files?q='${itemID}'+in+parents&key=${process.env.API_KEY}`
    const data: FileQueryResponse = await (await fetch(url)).json()
    const files = data?.files || []
    return await Promise.all(files.map(async ({ id, name, mimeType }: FileQueryObject) => {
        const href = `https://drive.google.com/open?id=${id}`
        if (mimeType === "application/vnd.google-apps.folder") {
            const files = await getDriveFolderContent(id)
            Object.freeze(files)  // prevents mutations
            return { type: "folder", files, name, id, href }
        }
        return { type: "file", name, id, href }
    }))
}

const ROOT_FOLDER = "1h0CCp6sz-PBmtun9yDDsPLrfvpOUlCBB"
export async function getRootFolder(): Promise<Item[]> {
    var data: null | Item[] = cacheData.get(ROOT_FOLDER)
    if (!data) {
        console.log("Remaking cache")
        data = await getDriveFolderContent(ROOT_FOLDER)
        cacheData.put(ROOT_FOLDER, data, 1000 * 60 * 60)
    }
    return data
}

function findFolder(data: Item[], name: string): Item | null {
    const itemQueue = [...data]
    while (itemQueue.length !== 0) {
        const item = itemQueue.shift()
        itemQueue.push(...(item?.files ? item.files : []))
        if (item?.name === name) {
            return item
        }
    }
    return null
}

export async function folderContent(name: string): Promise<Item | null> {
    return findFolder(await getRootFolder(), name)
}
