import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
    const imageUrl = appwriteService.getFilePreview(featuredImage);

    return (
        <Link to={`/post/${$id}`}>
            <div className="bg-transparent rounded-xl overflow-hidden transform transition hover:scale-105 hover:-translate-y-1">
                <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-xl">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-fit-cover"
                    />
                </div>
                <div className="p-3">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
