export type Note = {
    noteId: string
    title: string
    markdown: string
    tags: Tag[]
}

export type NoteDto = {
    title: string
    markdown: string
    tagCreateDtos: TagDto[]
}

export type Tag = {
    tagId: string
    label: string
}

export type TagDto = {
    label: string
}


