import React from 'react';

const PostCard: React.FC<{ post: any }> = ({ post }) => {
  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h3>{post.content}</h3>
      <p className="text-sm text-gray-500">By: {post.author.toString()}</p>
      <p className="text-sm text-gray-500">{new Date(Number(post.timestamp) / 1000000).toLocaleString()}</p>
    </div>
  );
};

export default PostCard;