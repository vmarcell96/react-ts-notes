import { Context, useEffect, useState, createContext, useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { NewNote } from './components/NewNote';

import './app.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Container, Row } from 'react-bootstrap';
import { NoteList } from './components/NoteList';
import { NoteLayout } from './components/NoteLayout';
import { NoteComponent } from './components/NoteComponent';
import { EditNote } from './components/EditNote';
import { useNotesService } from './services/notes.service';
import { useTagsService } from './services/tags.service';
import { Note, NoteDto, Tag, TagDto } from './@types/notes';
import ThemeProvider, { ThemeContext } from './context/themeContext';
import Footer from './components/Footer';
import ThemeWrapper from './components/ThemeWrapper';
import { Navbar } from './components/Navbar';
import { BrowserRouter } from 'react-router-dom'




function App() {

  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);


  const { getAllNotes, getNoteById, addNewNote, updateNoteById, deleteNoteById } = useNotesService();
  const { getAllTags, updateTagById, deleteTagById } = useTagsService();




  const getNotes = async () => {
    const notes: Array<Note> | null = await getAllNotes();
    if (notes !== null) {
      setNotes(notes);
    }
  };

  const getTags = async () => {
    const tags: Array<Tag> | null = await getAllTags();
    if (tags !== null) {
      setTags(tags);
    }
  };

  //Getting notes and tags on render
  useEffect(() => {
    getNotes();
    getTags();
  }, [])

  useEffect(() => {
    updateTags();
  }, [notes])

  async function onCreateNote(data: NoteDto) {
    const newNote = await addNewNote(data);
    if (newNote !== undefined) {
      setNotes([...notes, newNote]);
    }
  }

  async function updateTag(id: string, data: TagDto) {
    await updateTagById(data, id);
    const updatedTags = tags.map(tag => {
      if (tag.tagId === id) {
        tag.label = data.label;
        return tag;
      }
      return tag;
    })
    setTags(updatedTags);
  }


  function updateTags() {
    const usedTags: Array<Tag> = [];
    notes.forEach(note => {
      note.tags.forEach(tag => {
        const tagIds = usedTags.map(tag => tag.tagId);
        if (!tagIds.includes(tag.tagId)) {
          usedTags.push(tag);
        }
      })
    })
    usedTags.forEach(tag => {
      const tagIds = tags.map(tag => {
        return tag.tagId;
      })
      if (!tagIds.includes(tag.tagId)) {
        setTags([...tags, tag]);
      }
    })
  }

  async function deleteTag(id: string) {
    await deleteTagById(id);
    const remainingTags = tags.filter(tag => tag.tagId !== id);
    setTags(remainingTags);
    const newNotes = notes.map(note => {
      note.tags = note.tags.filter(tag => tag.tagId !== id)
      return note;
    });
    setNotes(newNotes);
  }

  async function onUpdateNote(id: string, data: NoteDto) {
    const updatedNote: Note | null = await updateNoteById(data, id);
    const noteToUpdate = notes.find(note => note.noteId === id);
    if (noteToUpdate === undefined) {
      console.log(`Note to update was not found with id:${id}`);
      return;
    }
    if (updatedNote === null) {
      console.log(`Something went wrong with updating note with id:${id}`);
      return;
    }
    setNotes(notes.map(note => {
      if (note.noteId === id) {
        note.title = updatedNote.title;
        note.markdown = updatedNote.markdown;
        note.tags = updatedNote.tags;
        return note;
      }
      return note;
    }))
  }

  function onDeleteNote(id: string) {
    deleteNoteById(id);
    const remainingNotes = notes.filter(note => note.noteId !== id);
    setNotes(remainingNotes);
  }

  return (
    <BrowserRouter>
      <ThemeProvider>
        <ThemeWrapper>
          <Navbar />
          <Container className='pt-4 main-container'>
            <Row >
              <Col>
                {notes && tags && <Routes>
                  <Route path="/" element={<NoteList notes={notes} availableTags={tags} onUpdateTag={updateTag} onDeleteTag={deleteTag} />} />
                  <Route path="/new"
                    element={<NewNote
                      onSubmit={onCreateNote}
                      availableTags={tags}
                    />} />
                  <Route path="/:id" element={<NoteLayout notes={notes} />}>
                    <Route index element={<NoteComponent onDelete={onDeleteNote} />} />
                    <Route path="edit" index
                      element={<EditNote
                        onSubmit={onUpdateNote}
                        availableTags={tags}
                      />} />
                  </Route>
                  {/* Redirect to homepage when invalid url is provided */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>}
              </Col>
            </Row>
          </Container>
          <Footer />
        </ThemeWrapper>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
