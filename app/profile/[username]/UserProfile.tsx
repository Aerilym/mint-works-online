'use client';

import { Profile } from '@/app/types/database';
import { Button } from '@/components';
import { useState } from 'react';
import EditUser from './EditUser';

export default function UserProfile({ profile, isOwner }: { profile: Profile; isOwner: boolean }) {
  const [editing, setEditing] = useState(false);
  return (
    <div>
      <h2>Profile</h2>
      {isOwner && (
        <Button
          onClick={() => {
            setEditing(!editing);
          }}
        >
          Edit
        </Button>
      )}
      <div className="flex flex-col">
        {editing ? (
          <EditUser profile={profile} />
        ) : (
          <>
            <h3>Username: {profile.username}</h3>
            <h3>Id: {profile.id}</h3>
          </>
        )}
      </div>
    </div>
  );
}
