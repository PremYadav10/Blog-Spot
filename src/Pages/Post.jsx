import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import appwriteService from "../appwrite/config";
import { AuthService } from "../appwrite/auth";
import { Button, Container } from "../components";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!slug) return navigate("/");
    appwriteService.getPost(slug).then((post) => {
      if (post) setPost(post);
      else navigate("/");

    // const user = AuthService.getUserById(post.userId);
    // const authorName = user ? user.name : "Unknown Author";
    // console.log("Author Name:", authorName);      
    });
  }, [slug, navigate]);

  const deletePost = () => {
    if (!post) return;
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };



  


  if (!post) return null;

  return (
    <div className="py-12 bg-gradient-to-br from-purple-700 via-indigo-600 to-purple-800 min-h-screen">
      <Container>
        {/* Featured Image */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl shadow-md"
          />

          {/* Edit/Delete buttons */}
          {isAuthor && (
            <div className="flex justify-end mt-4 gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Post Title & Metadata */}
        <div className="max-w-4xl mx-auto mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-black bg-white mb-2">{post.title}</h1>
          <p className="text-black-600"> | {new Date(post.$createdAt).toDateString()} |</p>
          
        </div>

        {/* Post Content */}
        <div className=" mx-auto prose prose-lg prose-black text-2xl font-bold ">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  );
}
