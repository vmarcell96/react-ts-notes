import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag, TagDto } from "../App";

type EditTagsModalProps = {
    availableTags: Tag[]
    handleClose: () => void
    show: boolean
    onUpdateTag: (id: string, data: TagDto) => void
    onDeleteTag: (id: string) => void
}

export function EditTagsModal({availableTags, handleClose, show, onDeleteTag, onUpdateTag}: EditTagsModalProps) {
    return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={2}>
                    {availableTags.map(tag => (
                        <Row key={tag.tagId}>
                            <Col>
                                <Form.Control type="text" defaultValue={tag.label} onBlur={e => {onUpdateTag(tag.tagId, {label: e.target.value})}} onChange={e => {tag.label = e.target.value}}/>
                            </Col>
                            <Col xs="auto">
                                <Button onClick={() => onDeleteTag(tag.tagId)} variant="outline-danger">
                                    &times;
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Form>
        </Modal.Body>
    </Modal>)

}