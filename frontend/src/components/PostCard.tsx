import React from 'react';

const PostCard: React.FC<{ post: any }> = ({ post }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold">{post.content}</h3>
      <p className="text-sm text-[var(--light-accent2)] dark:text-[var(--dark-accent2)]">
        By: {post.author.toString()} | {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
      </p>
      {post.isPremium && (
        <button className="mt-2 bg-[var(--light-accent1)] dark:bg-[var(--dark-accent1)] text-white p-2 rounded">
          Unlock for {post.price} VTC
        </button>
      )}
    </div>
  );
};

export default PostCard;