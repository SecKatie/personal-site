import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './content/Home.mdx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  )
}
