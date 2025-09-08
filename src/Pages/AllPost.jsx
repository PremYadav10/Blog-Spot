import { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import authService from '../appwrite/auth';
import { Container, PostCard } from '../components/index';
import { Query } from 'appwrite';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook for programmatically navigating

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const user = await authService.getCurrentUser();
                
                if (user) {
                    const response = await appwriteService.getPosts([
                        Query.equal("userId", user.$id)
                    ]);
                    
                    if (response) {
                        setPosts(response.documents);
                    }
                } else {
                    setPosts([]);
                }
            } catch (err) {
                console.error("Failed to fetch user posts:", err);
                setError("Failed to load your posts. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    if (loading) {
        return <div className="py-8 text-center text-lg text-white">Loading posts...</div>;
    }

    if (error) {
        return <div className="py-8 text-center text-lg text-red-500">{error}</div>;
    }

    // New condition to handle when no posts are found
    if (posts.length === 0) {
        return (
            <div className="w-full py-20 px-4 text-center bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 text-white">
                <Container>
                    <div className="max-w-2xl mx-auto p-8 rounded-xl bg-gradient-to-br from-red-600 via-blue-800 to-red-600  backdrop-filter backdrop-blur-sm shadow-lg">
                        <h1 className="text-4xl font-extrabold text-white mb-4">
                            You don't have any posts yet! 📝
                        </h1>
                        <p className="text-lg text-gray-200 mb-6">
                            Start your blogging journey by creating your first post.
                        </p>
                        <button 
                            onClick={() => navigate("/add-post")}
                            className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition-colors"
                        >
                            Create Post
                        </button>
                    </div>
                </Container>
            </div>
        );
    }
 
    return (
        <div className='w-full py-16 px-4 bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 text-white'>
            <Container>
                <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-12 text-center">
                    Your Posts
                </h2>
                <div className='flex flex-wrap -mx-2'>
                    {
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    );
}

export default AllPost;