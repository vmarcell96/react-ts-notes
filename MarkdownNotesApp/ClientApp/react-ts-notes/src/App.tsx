import { useEffect} from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { NewNote } from './components/NewNote';

import './app.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Container, Row } from 'react-bootstrap';
import { NoteList } from './components/NoteList';
import { NoteLayout } from './components/NoteLayout';
import { NoteComponent } from './components/NoteComponent';
import { EditNote } from './components/EditNote';
import ThemeProvider from './context/themeContext';
import Footer from './components/Footer';
import ThemeWrapper from './components/ThemeWrapper';
import { Navbar } from './components/Navbar';
import { BrowserRouter } from 'react-router-dom'
import useNoteFunctions from './hooks/useNoteFunctions';




function App() {

  const { notes, tags, getNotes, getTags, onCreateNote, updateTag, updateTags, deleteTag, onUpdateNote, onDeleteNote } = useNoteFunctions();

  //Getting notes and tags on render
  useEffect(() => {
    getNotes();
    getTags();
  }, [])

  //Updating tags when notes are modified
  useEffect(() => {
    updateTags();
  }, [notes])


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
