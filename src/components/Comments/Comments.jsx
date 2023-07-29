import React, {useState} from 'react'
import './Comments.css'
import {db, auth} from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'

const Comments = ({articleId}) => {

    const [user] = useAuthState(auth);

    const [newComment, setNewComment] = useState('')

  return (
    <div>
        {user ? (<form>
            <input type="text" 
            placeholder='add comment'
            onChange={(e) => setNewComment(e.target.value)}
            value = {newComment} />
        </form>) 
        : 
        (<p>Please Login to comment</p>)}
    </div>
  )
}

export default Comments