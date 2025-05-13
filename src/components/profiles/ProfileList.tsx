import React from 'react';
import { motion } from 'framer-motion';
import { Profile } from '../../types';
import ProfileCard from './ProfileCard';
import Spinner from '../common/Spinner';

interface ProfileListProps {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
  onSummaryClick: (profileId: string) => void;
  onViewDetails: (profileId: string) => void;
}

const ProfileList: React.FC<ProfileListProps> = ({ 
  profiles, 
  loading, 
  error, 
  onSummaryClick,
  onViewDetails
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-center">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-md text-center">
        <p className="text-gray-500 text-lg">No profiles found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onSummaryClick={onSummaryClick}
          onViewDetails={onViewDetails}
        />
      ))}
    </motion.div>
  );
};

export default ProfileList;