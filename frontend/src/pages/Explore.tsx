import React from 'react';
import { useCanister } from '../hooks/useCanister';

const Explore: React.FC = () => {
  const { call } = useCanister('post');
  const [trending, setTrending] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Simulate trending by fetching recent posts
    call('getPosts', ['Redpill Philosophy']).then(setTrending);
  }, [call]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Trending</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trending.map((post) => (
          <div key={post.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow animate-slide-up">
            <h3>{post.content}</h3>
            <p className="text-sm">{post.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;