import React, { useState } from 'react';
import { useAuth } from '../context/auth-context'; // 使用 useAuth 获取用户信息
import { Link } from 'react-router-dom'; // Import Link for navigation
import supabase from '../helper/supabaseClient';

const Write = () => {
    const { user } = useAuth(); // 从 AuthContext 获取当前用户
    const [post, setPost] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

    if (!user) {
        return (
            <div>
                <p>You must be logged in to write a post. Please <Link to="/login">log in</Link>.</p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (post.trim() === '') {
            setErrorMessage('Post content cannot be empty.');
            return;
        }

        console.log('Authenticated User ID:', user.id); // Debugging log

        try {
            const { error: insertError } = await supabase.from('Post').insert([
                {
                    user_id: user.id,
                    post: post,
                },
            ]);

            if (insertError) {
                console.error('Error inserting post:', insertError);
                setErrorMessage('Failed to submit post. Please try again.');
            } else {
                setPost(''); // Clear the input field
                setErrorMessage(''); // Clear the error message
                setIsSubmitted(true); // Mark as successfully submitted
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            {isSubmitted && !errorMessage && <div className="text-green-500 mb-4">Post submitted successfully!</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="Enter your crazy thoughts..."
                    className="border border-gray-300 rounded px-4 py-2 w-64 h-32"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Write;