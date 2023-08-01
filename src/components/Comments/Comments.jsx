import React, {useState, useEffect} from 'react'
import './Comments.css'
import {db, auth} from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import { toast } from 'react-toastify'

const Comments = ({articleId}) => {

    const [user] = useAuthState(auth);

    const [newComment, setNewComment] = useState('');

    const [comments, setComments] = useState([]);

    useEffect(() => {
        //get reference to comment selection
        const commentRef = collection(db, 'Comments');

        //filter to show only comments for this article
        const q = query(commentRef, where('articleId', '==', articleId))

        //get the comment
        onSnapshot(q, (snapshot) => {
            //convert to array
            const comments = snapshot.docs.map((item) => {
                return{
                    id: item.id,
                    ...item.data(),
                };
            });
            setComments(comments);
        });
    },[]);

    const addNewComment = (e) => {
        e.preventDefault();

        //need to make a new document in comment selection
        //include newComment, the articleId, and the user who creTED THIS COMMENT
        //create reference to the comment collection
        //will create the collection if it doesn't exist
        const commentRef = collection(db, 'Comments');

        //adding a document with this artilceId and userId
        addDoc(commentRef, {
            articleId: articleId,
            userId: user?.uid,
            content: newComment,
            username: user?.displayName,
        }).then((res) => {
            toast('Comment saved successfully', 
            {type: "success", 
            autoClose: 2000,});
            //clear input on the comment, remember to set value in textbox
            setNewComment('');
        }).catch(err=> console.log(err))
    };

    const deleteComment = (id) => {
        //needs the id of the comment to delete
        //get the particular document
        deleteDoc(doc(db, 'Comments', id)).then((res) => 
        toast('Comment deleted successfully', 
        {type: "success", 
        autoClose: 2000,
        })
        ).catch(err => console.log(err));
    };

  return (
    <div>
        <div className="comments-container">
            {comments.map((item) => (
            <div className='comment' key={item.id}>
                    <p>
                        <span>{item.username}</span>
                        {item.content}
                    </p>
                    {
                        //each comment has uid
                        //compare to see if i can delete the comment

                        user?.uid === item.userId && (
                        <button onClick={() => deleteComment(item.id)}>Delete</button>
                        )
                    }
                </div>
                ))
            }
        </div>

        {user ? (
        <form onSubmit={addNewComment}>
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