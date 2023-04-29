'use client';

import { useState } from 'react';

import { Button } from '@/components';
import { useUser } from '@/providers/user-provider';
import type { Profile } from '@/types/database';

import EditUser from './EditUser';

export default function UserProfile({ profile }: { profile: Profile }) {
  const { user } = useUser();
  const [editing, setEditing] = useState(false);
  const isOwner = profile.id === user?.id;
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
