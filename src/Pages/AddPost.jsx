import React from 'react';
import { PostForm } from '../components/index';
import { Container } from '../components/index';

function AddPost() {
  return (
    <div className='w-full py-16 px-4 bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 text-white'>
      <Container>
        <div className='max-w-5xl mx-auto border border-indigo-100 bg-gradient-to-br from-blue-800 via-pink-900 to-blue-800 shadow-md rounded-xl p-6'>
          <h2 className='text-2xl font-bold text-blue-50 mb-6 text-center'>
            📝 Create a New Post
          </h2>
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
