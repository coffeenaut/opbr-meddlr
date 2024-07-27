import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
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
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/build" element={<Builder />} />
          <Route path="/view" element={<Viewer />} />
          <Route path="/share" element={<ViewSet />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default App;