import React, {useEffect, useState} from 'react'
import './CategoryArticle.css'
import { useParams } from 'react-router'
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from '../../config/firebaseConfig';
import ArticleCard from '../../components/ArticleCard/ArticleCard';


const CategoryArticle = () => {
  //get category from url
  const {categoryName} = useParams();

  const [articles, setArticles] = useState([]);


  useEffect(() => {
    //create refrence to firebase articles collection
    const articleRef = collection(db, 'Articles')

    //now we get the data
    //create query
    const q = query(articleRef, where('category', '==', categoryName));

    //now get the dta that matches the query
    getDocs(q, articleRef)
    .then((res) => {
      const articles = res.docs.map((item) => ({
        id:item.id,
        ...item.data(),
      }));
      //console.log(articles);
      setArticles(articles);
    })
    .catch((err)=> console.log(err))
  },[categoryName]) 



  return (
    <div className='category-articles'>
    {
      articles.length === 0?
      <p>No articles</p>
      :
      articles?.map (item => <ArticleCard article={item} />)
    }
    </div>
  )
  
}



export default CategoryArticle