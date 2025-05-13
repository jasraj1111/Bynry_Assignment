import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Info } from 'lucide-react';
import { Profile } from '../../types';
import Button from '../common/Button';
import Card from '../common/Card';

interface ProfileCardProps {
  profile: Profile;
  onSummaryClick: (profileId: string) => void;
  onViewDetails: (profileId: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSummaryClick, onViewDetails }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative">
        <img 
          src={profile.image} 
          alt={profile.name} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-semibold">{profile.name}</h3>
          <div className="flex items-center mt-1">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{profile.address.city}, {profile.address.state}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <p className="text-gray-600 line-clamp-3 mb-4">
          {profile.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Mail size={16} className="mr-2" />
            <span className="truncate">{profile.contact.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Phone size={16} className="mr-2" />
            <span>{profile.contact.phone}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {profile.interests.map((interest, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4 pt-0 mt-auto flex gap-2">
        <Button 
          variant="primary" 
          size="sm" 
          fullWidth
          onClick={() => onSummaryClick(profile.id)}
        >
          <MapPin size={16} className="mr-1" /> Map
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          fullWidth
          onClick={() => onViewDetails(profile.id)}
        >
          <Info size={16} className="mr-1" /> Details
        </Button>
      </div>
    </Card>
  );
};

export default ProfileCard;