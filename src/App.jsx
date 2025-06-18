import { HashRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './pages/Layout'
import Home from "./pages/Home"
import NotFound from './pages/NotFound'
const Builder = lazy(() => import("./pages/Build")) 
const Viewer = lazy(() => import("./pages/Viewer"))
const ViewSet = lazy(() => import("./pages/ViewSet"))
const Disclaimer = lazy(() => import("./pages/disclaimer"))
const Usage = lazy(() => import("./pages/usage"))
const Chance = lazy(() => import("./pages/Chance"))
import './App.css'
import Spinner from './components/Spinner'

const App = () => {
  const notFoundMessage = "You must've turned the wrong way. There's nothing here, mosshead."
  return (
    <HashRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<NotFound message={notFoundMessage} />} />
            <Route index element={<Home />} />
            <Route path="/build" element={<Builder />} />
            <Route path="/browse" element={<Viewer />} />
            <Route path="/share" element={<ViewSet />} />
            <Route path="/info/usage" element={<Usage />} />
            <Route path="/info/disclaimer" element={<Disclaimer />} />
            <Route path="/tools/chance" element={<Chance />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
export default App;