import React from 'react';
import { useCanister } from '../hooks/useCanister';
import PostCard from '../components/PostCard';

const Search: React.FC = () => {
  const { call } = useCanister('post');
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<any[]>([]);

  const handleSearch = async () => {
    const posts = await call('getPosts', ['General']); // Placeholder; enhance with real search
    setResults(posts.filter((p: any) => p.content.includes(query)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search VentiVerse</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-2 border rounded mb-4"
      />
      <button onClick={handleSearch} className="bg-[var(--light-accent1)] dark:bg-[var(--dark-accent1)] text-white p-2 rounded">
        Search
      </button>
      <div className="space-y-4 mt-4">
        {results.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;