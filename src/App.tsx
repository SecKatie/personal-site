import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './content/Home'
import Projects from './content/Projects'
import Posts from './content/Posts'
import Post from './content/Post'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:slug" element={<Post />} />
      </Routes>
    </Layout>
  )
}
