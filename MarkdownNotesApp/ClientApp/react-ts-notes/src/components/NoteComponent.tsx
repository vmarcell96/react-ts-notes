import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { Note } from "../@types/notes";
import { useNote } from "./NoteLayout"

type NoteProps = {
    onDelete: (id: string) => void
}


export function NoteComponent({onDelete}: NoteProps) {
    const note: Note = useNote();
    const navigate = useNavigate();

    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        < Stack gap={1} direction="horizontal" className="flex-wrap">
                            {note.tags.map(tag => (
                                // truncates text if it is long
                                <Badge className="text-truncate" key={tag.tagId}>{tag.label}</Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${note.noteId}/edit`}>
                            <Button variant="primary">Edit</Button>
                        </Link>
                        <Button onClick={() => {
                            onDelete(note.noteId);
                            navigate("/");
                        }} variant="outline-danger">Delete</Button>
                        <Link to="/">
                            <Button variant="outline-secondary">Back</Button>
                        </Link>

                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    )
}