import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from "./pages/Home"
import Builder from "./pages/Build"
import Viewer from './pages/Viewer'
import ViewSet from './pages/ViewSet'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/opbr-meddlr" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/opbr-meddlr/build" element={<Builder />} />
          <Route path="/opbr-meddlr/view" element={<Viewer />} />
          <Route path="/opbr-meddlr/share" element={<ViewSet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;