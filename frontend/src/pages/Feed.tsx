import React from 'react';
import PostCard from '../components/PostCard';
import { useCanister } from '../hooks/useCanister';

const Feed: React.FC = () => {
  const { call } = useCanister('post');
  const [posts, setPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    call('getPosts', ['General']).then(setPosts); // Fetch all posts for feed
  }, [call]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Feed</h1>
      <div className="space-y-4 animate-fade-in">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;