import React from 'react'
import './ArticleCard.css'

const ArticleCard = ({article}) => {
  return (
    <div className='article-card'>
        <img src={article?.imageURL}/>
        <div className="article-card-info">
            <p>{article.title}</p>
            <p>Read</p>
        </div>
    </div>
  )
}

export default ArticleCard