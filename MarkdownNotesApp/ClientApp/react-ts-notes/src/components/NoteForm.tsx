import { FormEvent, useEffect, useRef, useState } from "react";
import { Form, Stack, Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteDto, Tag, TagDto } from "../@types/notes";

type NoteFormProps = {
    onSubmit: (data: NoteDto) => void
    availableTags: Tag[]
    title?: string
    markdown?: string
    tags?: TagDto[]
}
//NoteData is optional this way and newNote and editNote can both use this component

export function NoteForm({ onSubmit, availableTags, title = "", markdown = "", tags = [] }: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<TagDto[]>(tags)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        //if we are editing a note, save it every 5 minutes
        if (location.pathname.slice(-4) === "edit") {
            const timerId = setTimeout(() => {
                //if the user already wrote something
                if (markdownRef.current!.value !== "" && titleRef.current!.value !== "") {
                    onSubmit({
                        // We made sure with the "required" parameter that they are not going to be null(!)
                        title: titleRef.current!.value,
                        markdown: markdownRef.current!.value,
                        tagCreateDtos: selectedTags
                    });
                    console.log("Autosave");
                }
            }, 300000)
            return () => clearTimeout(timerId);
        }
    });

    function onCancelClick() {

    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        onSubmit({
            // We made sure with the "required" parameter that they are not going to be null(!)
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tagCreateDtos: selectedTags
        });

        navigate("..");
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control className="input-field" required ref={titleRef} defaultValue={title} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                options={availableTags.map(tag => {
                                    return { label: tag.label, value: tag.label }
                                })}
                                onCreateOption={label => {
                                    const newTag = { label: label }
                                    setSelectedTags(prev => [...prev, newTag])
                                }}
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.label }
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label }
                                    }))
                                }}
                                isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control className="input-field" required as="textarea" ref={markdownRef} rows={15} defaultValue={markdown} />
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to="..">
                        <Button onClick={onCancelClick} type="button" variant="outline-secondary">Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}