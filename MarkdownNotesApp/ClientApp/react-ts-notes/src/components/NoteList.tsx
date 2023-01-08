import { Dispatch, SetStateAction, useMemo, useState } from "react"
import { Row, Col, Stack, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Note, Tag, TagDto } from "../@types/notes"
import { EditTagsModal } from "./EditTagsModal"
import { NoteCard } from "./NoteCard"

type NoteListProps = {
    availableTags: Tag[]
    notes: Note[]
    onUpdateTag: (id: string, data: TagDto) => void
    onDeleteTag: (id: string) => void
}

export function NoteList({ availableTags, notes, onUpdateTag, onDeleteTag }: NoteListProps) {

    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState<string>("")
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && 
            (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.tagId === tag.tagId)))
        })
    }, [title, selectedTags, notes])

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/new">
                            <Button variant="primary">Create</Button>
                        </Link>
                        <Button onClick={() => setEditTagsModalIsOpen(true)} variant="outline-secondary">Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control className="input-field" type="text" value={title}
                                onChange={e => setTitle(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect className="input-field"
                                options={availableTags.map(tag => {
                                    return { label: tag.label, value: tag.tagId }
                                })}
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.tagId }
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, tagId: tag.value }
                                    }))
                                }}
                                isMulti />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
                {filteredNotes.map(note => (
                    <Col key={note.noteId}>
                        <NoteCard id={note.noteId} title={note.title} tags={note.tags} />
                    </Col>
                ))}
            </Row>
            <EditTagsModal 
                availableTags={availableTags} 
                show={editTagsModalIsOpen} 
                handleClose={() => setEditTagsModalIsOpen(false)} 
                onDeleteTag={onDeleteTag}
                onUpdateTag={onUpdateTag}
                />
        </>
    )

}