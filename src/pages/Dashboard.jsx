import React, { useState, useEffect } from 'react';
import supabase from '../helper/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Write from './Write';
import Comments from '../components/Comments';

const Dashboard = () => {
    const navigate = useNavigate();
    const [randomPost, setRandomPost] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [userId, setUserId] = useState(null);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate("/login");
    };

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
                setErrorMessage('Failed to fetch user information.');
                return;
            }
            setUserId(user.id);
        };

        fetchUser();
    }, []);

    const fetchRandomPost = async () => {
        try {
            // First fetch a random post excluding the user's own posts
            const { data: posts, error: postsError } = await supabase
                .from('Post')
                .select('id, post, created_at, user_id')
                .neq('user_id', userId) // Exclude posts by the current user
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
        if (userId) {
            fetchRandomPost(); // Only call fetchRandomPost when userId is set
        }
    }, [userId]);

    return (
        <div className="w-2/3 mx-auto p-6 rounded-lg shadow-md bg-purple-100">
            <h1 className="text-2xl font-bold text-pink-500 mb-6">Welcome to your Dashboard!</h1>
            <button 
                onClick={signOut} 
                className="text-sm font-bold text-red-500 hover:text-blue-700 underline mb-4"
            >
                Sign out
            </button>

            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            {randomPost ? (
                <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-purple-700">Random Post</h2>
                    <p className="mt-3 text-blue-700 text-lg">{randomPost.post}</p>
                    <small className="text-black block mt-2">
                        Posted on: {new Date(randomPost.created_at).toLocaleString()}
                    </small>
                    <div className="p-4 bg-purple-100 mt-4 rounded-lg shadow-sm">
                        <Comments
                            postId={randomPost.id}
                            initialComments={randomPost.Comments}
                            refreshPost={fetchRandomPost}
                        />
                    </div>
                </div>
            ) : (
                <p className="mt-6 text-blue-700 text-thin text-center">Loading a random post...</p>
            )}
        </div>
    );
};

export default Dashboard;