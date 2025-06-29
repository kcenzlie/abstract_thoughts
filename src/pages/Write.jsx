import React, { useState } from 'react';
import { useAuth } from '../context/auth-context';
import { Link } from 'react-router-dom';
import supabase from '../helper/supabaseClient';

const Write = () => {
    const { user } = useAuth();
    const [post, setPost] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        setPost(e.target.value);
        e.target.style.height = 'auto'; // Reset height
        e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen text-center">
                <p className="text-gray-700">
                    You must be logged in to write a post. Please{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">log in</Link>.
                </p>
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
        <div className="flex items-center justify-center">
            <div className="bg-purple-100 p-6 rounded-lg shadow-xl w-full max-w-lg">
                {errorMessage && <div className="text-red-500 mb-4 font-semibold">{errorMessage}</div>}
                {isSubmitted && !errorMessage && <div className="text-purple-400 mb-4 font-semibold">Post submitted successfully!</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={post}
                        onChange={handleInputChange}
                        placeholder="Enter your crazy thoughts..."
                        className="border border-black-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none overflow-hidden text-blue-700"
                        rows="1"
                    />
                    <button
                        type="submit"
                        className="w-full bg-purple-300 text-white py-2 rounded-lg transition-all font-bold shadow-md"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Write;