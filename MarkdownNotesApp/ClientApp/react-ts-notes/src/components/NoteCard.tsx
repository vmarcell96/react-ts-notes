import { Badge, Card, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Tag } from "../@types/notes"
import styles from "./NoteList.module.css"

type SimplifiedNoteNote = {
    tags: Tag[]
    title: string
    id: string
}

export function NoteCard({ id, title, tags }: SimplifiedNoteNote) {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                {/* h-100 -> fills the full height, fs is fontsize */}
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-5">{title}</span>
                    {tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                            {tags.map(tag => (
                                // truncates text if it is long
                                <Badge className="text-truncate" key={tag.tagId}>{tag.label}</Badge>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    )
}