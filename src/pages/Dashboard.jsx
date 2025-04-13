import React, { useState, useEffect } from 'react';
import supabase from '../helper/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Write from './Write';
import Comments from '../components/Comments';

const Dashboard = () => {
    const navigate = useNavigate();
    const [randomPost, setRandomPost] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate("/login");
    };

    const fetchRandomPost = async () => {
        try {
            // First fetch a random post
            const { data: posts, error: postsError } = await supabase
                .from('Post')
                .select('id, post, created_at, user_id')
                .order('created_at', { ascending: false });

            if (postsError) {
                console.error('Error fetching posts:', postsError);
                setErrorMessage('Failed to fetch posts.');
                return;
            }

            if (posts.length === 0) {
                setErrorMessage('No posts available.');
                return;
            }

            // Select a random post
            const randomIndex = Math.floor(Math.random() * posts.length);
            const selectedPost = posts[randomIndex];

            // Then fetch comments for this specific post
            const { data: comments, error: commentsError } = await supabase
                .from('Comments')
                .select('id, comments, created_at')
                .eq('post_id', selectedPost.id)
                .order('created_at', { ascending: true });

            if (commentsError) {
                console.error('Error fetching comments:', commentsError);
                setErrorMessage('Failed to fetch comments.');
                return;
            }

            // Combine post with its comments
            const postWithComments = {
                ...selectedPost,
                Comments: comments || []
            };

            setRandomPost(postWithComments);
        } catch (error) {
            console.error('Unexpected error:', error);
            setErrorMessage('An unexpected error occurred.');
        }
    };

    useEffect(() => {
        fetchRandomPost();
    }, []);

    return (
        <div>
            <h1>Hello, you are logged in.</h1>
            <button onClick={signOut}>Sign out.</button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {randomPost ? (
                <div>
                    <h2>Random Post</h2>
                    <p>{randomPost.post}</p>
                    <small>Posted on: {new Date(randomPost.created_at).toLocaleString()}</small>
                    <Comments
                        postId={randomPost.id}
                        initialComments={randomPost.Comments}
                        refreshPost={fetchRandomPost}
                    />
                </div>
            ) : (
                <p>Loading a random post...</p>
            )}
        </div>
    );
};

export default Dashboard;