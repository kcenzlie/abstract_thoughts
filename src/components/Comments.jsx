import React, { useState, useEffect } from 'react';
import supabase from '../helper/supabaseClient';

const Comments = ({ postId, initialComments = [], refreshPost }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(initialComments);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchComments = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('Comments')
            .select('*')
            .eq('post_id', postId)
            .order('created_at', { ascending: true });
            
        if (error) {
            console.error('Error fetching comments:', error);
            setErrorMessage('Failed to fetch comments.');
        } else {
            setComments(data || []);
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim() === '') return;

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
            console.error('Error fetching user:', userError);
            setErrorMessage('Failed to get user information.');
            return;
        }

        const { error: insertError } = await supabase.from('Comments').insert([
            {
                post_id: postId,
                comments: comment,
            },
        ]);

        if (insertError) {
            console.error('Error inserting comment:', insertError);
            setErrorMessage('Failed to submit comment. Please try again.');
        } else {
            setComment('');
            setErrorMessage('');
            await fetchComments();
            refreshPost();
        }
    };

    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment here..."
                />
                <button type="submit">Submit</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div>
                <h3>Comments:</h3>
                {isLoading ? (
                    <p>Loading comments...</p>
                ) : (
                    comments.map((c) => (
                        <div key={c.id}>
                            <p>{c.comments}</p>
                            <small>{new Date(c.created_at).toLocaleString()}</small>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Comments;