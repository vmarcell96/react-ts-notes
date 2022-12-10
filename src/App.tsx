import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { NewNote } from './components/NewNote';

import './app.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap';

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {

  return (
    <Container className='my-4'>
      <Routes>
        <Route path="/" element={<h1>Hi</h1>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" index element={<h1>Edit</h1>} />
        </Route>
        {/* Redirect to homepage when invalid url is provided */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
