import React from 'react';
import { useCanister } from '../hooks/useCanister';

const PostCard: React.FC<{ post: any }> = ({ post }) => {
  const { call } = useCanister('post');
  const [liked, setLiked] = React.useState(false);

  const handleLike = async () => {
    await call('likePost', [post.id]);
    setLiked(true);
  };

  const handleShare = () => navigator.share({ url: window.location.href, title: post.content });
  const handleReport = () => call('reportPost', [post.id]);
  const handleHide = () => call('hidePost', [post.id]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold">{post.content}</h3>
      {post.media && (
        post.media.isVideo ? (
          <video src={post.media.url} controls className="w-full mt-2 rounded" />
        ) : (
          <img src={post.media.url} alt="Post media" className="w-full mt-2 rounded" />
        )
      )}
      <p className="text-sm text-[var(--light-accent2)] dark:text-[var(--dark-accent2)]">
        By: {post.author.toString()} | {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
        {post.isNSFW && ' (NSFW)'}
      </p>
      <div className="flex space-x-2 mt-2">
        <button onClick={handleLike} className={`p-1 ${liked ? 'text-red-500' : ''}`}>
          ❤️ {post.likes.length}
        </button>
        <button onClick={handleShare} className="p-1">🔗 Share</button>
        <button onClick={handleReport} className="p-1">🚨 Report</button>
        <button onClick={handleHide} className="p-1">👁️ Hide</button>
      </div>
      {post.isPremium && (
        <button className="mt-2 bg-[var(--light-accent1)] dark:bg-[var(--dark-accent1)] text-white p-2 rounded">
          Unlock for {post.price} VTC
        </button>
      )}
    </div>
  );
};

export default PostCard;