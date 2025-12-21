import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './content/Home.mdx'

function HomePage() {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}
