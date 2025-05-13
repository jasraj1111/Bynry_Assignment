import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Calendar, ArrowLeft } from 'lucide-react';
import { Profile } from '../../types';
import Button from '../common/Button';
import MapView from '../map/MapView';

interface ProfileDetailProps {
  profile: Profile;
  onBack: () => void;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ profile, onBack }) => {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <Button variant="outline" size="sm" onClick={onBack} className="mb-4">
          <ArrowLeft size={16} className="mr-1" /> Back to Profiles
        </Button>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="relative mb-4">
              <img 
                src={profile.image} 
                alt={profile.name} 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2 text-blue-500" />
                <span>
                  {profile.address.street}, {profile.address.city}, {profile.address.state} {profile.address.zipCode}, {profile.address.country}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-2 text-blue-500" />
                <span>{profile.contact.email}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Phone size={18} className="mr-2 text-blue-500" />
                <span>{profile.contact.phone}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-2 text-blue-500" />
                <span>Member since {formatDate(profile.createdAt)}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-600 whitespace-pre-line">{profile.description}</p>
            </div>
            
            <div className="h-[400px]">
              <h2 className="text-lg font-semibold mb-2">Location</h2>
              <MapView 
                profiles={[profile]} 
                selectedProfile={profile}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileDetail;