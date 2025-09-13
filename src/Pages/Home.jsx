import React, { useState, useEffect, Suspense } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components/index'
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  // --- If no posts (not logged in) ---
  if (posts.length === 0) {
    return (
        <div className="w-full py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <Container>
                {/* Intro / About Website */}
                <div className="max-w-3xl mx-auto p-10 rounded-3xl shadow-2xl bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-900">
                    <h1 className="text-5xl font-extrabold mb-6 text-center drop-shadow-md">
                        🚀 Welcome to <span className="text-yellow-300">BlogSpot</span>
                    </h1>
                    <p className="text-lg text-center text-gray-100 leading-relaxed mb-8">
                        A place where ideas come alive. Read inspiring articles, share your
                        thoughts, and connect with a community of curious minds.
                        <br /> Join us today and start your journey ✨
                    </p>
                    <hr className="my-6 border-gray-300 opacity-30" />
                    <div className="flex justify-center gap-6 mt-6">
                        <Link to="/login">
                            <button className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-lg hover:bg-pink-700 transition-transform transform hover:scale-105">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="px-8 py-3 bg-pink-700 text-white font-bold rounded-full shadow-lg hover:bg-yellow-400 transition-transform transform hover:scale-105">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>

                {/* --- Featured Blogs Section --- */}
                <div className="mt-20">
                    <h2 className="text-4xl font-bold text-center mb-12">Featured Blogs</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Blog Card 1 */}
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300">
                           <img
                                        src={"https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"}
                                        alt="img"
                                        className="w-full h-48 object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
                                    />
                            <h3 className="text-2xl font-semibold mb-2">The Art of Mindful Living</h3>
                            <p className="text-gray-400 mb-4">
                                Palm trees on a tropical beach. 
                                This is a summary of the first blog post. It's a great place to start your reading journey.
                            </p>
                            <Link to="/login">
                                <button className="w-full py-2 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    Read More
                                </button>
                            </Link>
                        </div>

                        {/* Blog Card 2 */}
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300">
                           <img
                                        src={"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc1ODh8MHwxfHNlYXJjaHwxfHxtaW5kZnVsJTIwbGl2aW5nfGVufDB8fHx8MTY5NDU2NzY1OHww&ixlib=rb-4.0.3&q=80&w=1080"}
                                        alt="img"
                                        className="w-full h-48 object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
                                    />
                            <h3 className="text-2xl font-semibold mb-2">Small Changes, Big Impact</h3>
                            <p className="text-gray-400 mb-4">
                                Indoor plants and natural light in a home. 
                                Learn how small daily habits can lead to a more fulfilling and balanced life.
                            </p>
                            <Link to="/login">
                                <button className="w-full py-2 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    Read More
                                </button>
                            </Link>
                        </div>

                        {/* Blog Card 3 */}
                        <div className="bg-gray-800 p-6 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300">
                           <img
                                        src={"https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc1ODh8MHwxfHNlYXJjaHwxfHxoZWFsaW5nJTIwbmF0dXJlfGVufDB8fHx8MTY5NDU2Nzk1MHww&ixlib=rb-4.0.3&q=80&w=1080"}
                                        alt="img"
                                        className="w-full h-48 object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
                                    />
                            <h3 className="text-2xl font-semibold mb-2">The Healing Power of Nature</h3>
                            <p className="text-gray-400 mb-4">
                                Sunlight shining through forest trees. 
                                Discover how spending time in nature can improve your mental and physical well-being.
                            </p>
                            <Link to="/login">
                                <button className="w-full py-2 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    Read More
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );

    
  }

  // --- If posts exist ---
 // --- Improved Latest Posts Section ---
return (

  <Suspense fallback={<div>Loading...</div>}>
      <section className="w-full py-16 px-4 bg-gradient-to-br from-purple-800 via-blue-600 to-indigo-600 text-white">
        <Container>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
            🌟 Latest Posts
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </section>
  </Suspense>




);

}

export default Home






















// import React from 'react'
// import { useState ,useEffect} from 'react'
// import appwriteService from '../appwrite/config'
// import { Container,PostCard } from '../components/index'
// import { Link } from 'react-router-dom'


// function Home() {
//     const [posts,setPosts] = useState([])

//     useEffect(()=>{
//         appwriteService.getPosts().then((posts)=>{
//             if(posts){
//                 setPosts(posts.documents)
//             }
//         })
//     },[])

//   if(posts.length === 0){
//     return (
//         <div  className='w-full py-8 mt-4 text-center'>
//             <Container>
//                 <div className='flex flex-wrap'>
//                     <h1 className='text-2xl'>
//                         Login To Read Posts
//                     </h1>
//                     <br />
//                     <hr />
//                     <div style={{display:"inline-block"}}>
//                         <Link to='/login'>
//                             <button style={{color:"white" , background:"blue" ,borderRadius:"50px"}}>LOGIN</button>
//                         </Link>
                        
//                         <Link to='/signup'>
//                             <button style={{color:"white" , background:"blue" ,borderRadius:"50px"}} >Signup</button>
//                         </Link>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     )
//   }
//   return (
//     <div className='w-full py-8'>
//         <Container>
//             <div className='flex flex-wrap'>
//                 {
//                     posts.map((post)=>(
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))
//                 }
//             </div>
//         </Container>
//     </div>
//   )
// }

// export default Home;