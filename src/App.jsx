import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Header}  from './components/Header/Header'
import Homepages from './pages/Homepages/Homepages'
import CategoryArticle from './pages/CategoryArticle/CategoryArticle'
import Auth from './pages/Auth/Auth'
import AddArticle from './pages/AddArticle/AddArticle'
import ArticleDetails from './pages/ArticleDetails/ArticleDetails'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />
      <Routes >
        <Route path='/' element={<Homepages />} />
        <Route path='/addarticle' element={<AddArticle />} />
        <Route path='/category/:categoryName' element={<CategoryArticle />} />
        <Route path='/article/:articleId' element={<ArticleDetails />} />
        <Route path='/auth' element={<Auth />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
