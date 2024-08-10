import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from "./pages/Home"
import Builder from "./pages/Build"
import Viewer from './pages/Viewer'
import ViewSet from './pages/ViewSet'
import Disclaimer from './pages/disclaimer'
import Usage from './pages/usage'
import './App.css'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/build" element={<Builder />} />
          <Route path="/browse" element={<Viewer />} />
          <Route path="/share" element={<ViewSet />} />
          <Route path="/info/usage" element={<Usage />} />
          <Route path="/info/disclaimer" element={<Disclaimer />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default App;