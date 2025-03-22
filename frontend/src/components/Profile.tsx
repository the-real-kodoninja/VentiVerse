import React from 'react';
import { useCanister } from '../hooks/useCanister';

const Profile: React.FC<{ principal: string }> = ({ principal }) => {
  const { call } = useCanister('user');
  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    call('getProfile', [principal]).then(setProfile);
  }, [principal, call]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2>{profile?.username || 'Loading...'}</h2>
      <p>{profile?.bio || 'No bio'}</p>
    </div>
  );
};

export default Profile;