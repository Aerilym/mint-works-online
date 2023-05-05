import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Profile } from '@/types/database';

import { Avatar } from './Avatar';

interface ProfileCardAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {
  profile: Profile;
}

export const ProfileCard = forwardRef<HTMLButtonElement, ProfileCardAttributes>(
  ({ className, profile, ...rest }, ref) => {
    return (
      <button
        className={clsx(
          'h-13 w-48 rounded bg-lime-500 p-2 transition-colors hover:bg-lime-400',
          className
        )}
        type="button"
        ref={ref}
        {...rest}
      >
        <div className="relative flex h-10 w-10 flex-row">
          <Avatar
            src={`/api/profile/${profile.username}/avatar`}
            alt={`Profile picture for ${profile.username}`}
          />
          <div>
            <span className="ml-2">{profile.username}</span>
          </div>
        </div>
      </button>
    );
  }
);

ProfileCard.displayName = 'ProfileCard';
