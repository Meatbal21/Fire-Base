import React, {useState, useEffect} from 'react'
import './Likes.css';
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { auth, db } from '../../config/firebaseConfig';
import { useAuthState} from 'react-firebase-hooks/auth'
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Likes = ({articleId}) => {

    const [isLiked, setIsLiked] = useState(false);

    const [likesCount, setLikesCount] = useState(0)

    const [user] = useAuthState(auth);

    const likesRef = collection(db, 'Likes');

    useEffect(() => {
        //did this user likes this article?
        //need the collection
        //const likesRef = collection(db, 'Likes');
        //should have if statement if user exists
        if(user){
            //make query to see if we liked this article
            const q = query(likesRef, 
                where('articleId', '==',articleId), 
                where('userId', '==', user?.uid)
                );

        // matching document
        getDocs(q, likesRef).then(res => {
            //is therr a match?
            if(res.size > 0) {
                setIsLiked(true)
            }
        }).catch((err)=>console.log(err))
        }else {
            setIsLiked(false)
        }
    },[user]);


    useEffect(() => {
        //find out the like count for this article
        //make a query to count likes
        const q2 = query(likesRef, where('articleId', '==', articleId));

        //look for matching document
        getDocs(q2, likesRef).then((res) => 
            setLikesCount(res.size)
        )
        .catch((err)=> console.log(err))
    }, [isLiked]);

    const handleLike = () => {
        // make sure the user is logged in
        if(user){
            //create reference to like collection
            //will create collection if not exist
            const likesRef = collection(db, 'Likes')

            //add a document with this articleid and userId
            addDoc(likesRef, {
                userId: user?.uid,
                articleId: articleId,
            }).then(res => {
                // dont need the res
                // just want to show as likes
                setIsLiked(true);
            })
            .catch((err) => console.log(err));
        }
    };

    const handleUnlike = () => {
        if(user) {
            console.log('userId', user?.uid);
            console.log('articleId', articleId);

            //need to fin docyment with this articleId and userId to get its document ID
            //const likesRef = collection(db, 'Likes');

        //setup query to find the id
        const q = query(likesRef, 
            where('articleId', '==',articleId), 
            where('userId', '==', user?.uid)
            );

            //get match
            getDocs(q,likesRef).then(res => {
                console.log(res.size);
                console.log(res.docs[0].id)
                const likeId = res.docs[0].id;
            //delete this doc from collection
                deleteDoc(doc(db,'Likes', likeId)).then(res => {
                    //change the heart icon
                    setIsLiked(false);
                })
                .catch((err)=> console.log(err));
            })
            .catch((err)=> console.log(err));
        }
    };

  return (
    <div>{
        isLiked ? (<FaHeart onClick={handleUnlike}/>) : (<FaRegHeart onClick={handleLike}/>)

    }
    <span> {likesCount}</span>
    </div>

  ) 
}

export default Likes