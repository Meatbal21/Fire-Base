import React, {useEffect, useState} from 'react'
import './Banner.css'
import { collection, getDocs, limit, orderBy, query } from '@firebase/firestore'
import {db} from '../../config/firebaseConfig'

const Banner = () => {

  const [mainArticle, setMainArticle] = useState([]);
  const [otherArticles, setOtherArticles] = useState([]);

  useEffect(() => {

    //create a variable to reference to the articles collection
    const articleRef = collection(db, 'Articles');

    // setup query to filter responses
    // sort and get first 5 only
    const q = query(articleRef, orderBy("createdAt", "desc"), limit(5));

    getDocs(q, articleRef)
      .then((res) => {
        //console.log(res.docs[0].data())

        const articles = res.docs.map(item =>{
            return{
              id: item.id,
              ...item.data(),
            };

        })
        //console.log(articles)
        setMainArticle(articles[0]);
        setOtherArticles(articles.splice(1));

      })
      .catch(err=> console.log(err))

  },[])

  return (
    <div className='banner-container'>
      <div className="main-article container" style={{backgroundImage:`url(${mainArticle?.imageURL})`}}>
          <div className="banner-info">
              <h2>{mainArticle?.title}</h2>
              <div className="main-article-info">
                <p>{mainArticle?.createdAt?.toDate().toDateString()}</p>
              </div>
          </div>
      </div>

      <div className="other-articles-container">
        {
          otherArticles.map(item => {
            return <div key={item?.id} className="other-article-item"
            style={{backgroundImage: `url(${item?.imageURL})`}}>
                <div className="banner-info">
                  <h3>{item?.title}</h3>
                  <small>{item?.createdAt?.toDate().toDateString()}</small>
                </div>

            </div>
          })
        }
      </div>
    </div>
  )
}

export default Banner