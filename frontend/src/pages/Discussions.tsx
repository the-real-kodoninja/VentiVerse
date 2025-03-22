import React from 'react';
import PostCard from '../components/PostCard';
import { useCanister } from '../hooks/useCanister';

const Discussions: React.FC = () => {
  const { call } = useCanister('post');
  const [posts, setPosts] = React.useState<any[]>([]);

  React.useEffect(() => {
    call('getPosts', ['General']).then(setPosts);
  }, [call]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Discussions</h1>
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default Discussions;