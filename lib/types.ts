export type FileQueryObject = {
    kind: string, id: string, name: string, mimeType: string
}

export type FileQueryResponse = {
    kind: string, incompleteSearch: boolean, files: FileQueryObject[]
}

export type Item = {
    type: string, name: string, files?: Item[], id: string, href: string
}
