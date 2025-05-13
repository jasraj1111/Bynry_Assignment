import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile, ProfileFormData, ProfileFilters } from '../types';
import { mockProfiles } from '../data/mockData';

interface ProfileContextProps {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
  selectedProfile: Profile | null;
  filteredProfiles: Profile[];
  filters: ProfileFilters;
  addProfile: (profile: ProfileFormData) => void;
  updateProfile: (id: string, profile: ProfileFormData) => void;
  deleteProfile: (id: string) => void;
  selectProfile: (id: string | null) => void;
  setFilters: (filters: ProfileFilters) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [filters, setFilters] = useState<ProfileFilters>({ searchTerm: '' });
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);

  // Load mock data
  useEffect(() => {
    try {
      // Simulate API delay
      const timer = setTimeout(() => {
        setProfiles(mockProfiles);
        setLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    } catch (err) {
      setError('Failed to load profiles');
      setLoading(false);
    }
  }, []);

  // Filter profiles based on search term and location
  useEffect(() => {
    if (profiles.length === 0) return;

    const { searchTerm, location } = filters;
    let filtered = [...profiles];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(profile => 
        profile.name.toLowerCase().includes(term) || 
        profile.description.toLowerCase().includes(term) ||
        profile.interests.some(interest => interest.toLowerCase().includes(term))
      );
    }

    if (location) {
      const locationTerm = location.toLowerCase();
      filtered = filtered.filter(profile => 
        profile.address.city.toLowerCase().includes(locationTerm) ||
        profile.address.state.toLowerCase().includes(locationTerm) ||
        profile.address.country.toLowerCase().includes(locationTerm)
      );
    }

    setFilteredProfiles(filtered);
  }, [profiles, filters]);

  const addProfile = (profileData: ProfileFormData) => {
    const newProfile: Profile = {
      ...profileData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    setProfiles(prevProfiles => [...prevProfiles, newProfile]);
  };

  const updateProfile = (id: string, profileData: ProfileFormData) => {
    setProfiles(prevProfiles => 
      prevProfiles.map(profile => 
        profile.id === id 
          ? { ...profile, ...profileData } 
          : profile
      )
    );

    if (selectedProfile?.id === id) {
      setSelectedProfile({ ...selectedProfile, ...profileData });
    }
  };

  const deleteProfile = (id: string) => {
    setProfiles(prevProfiles => 
      prevProfiles.filter(profile => profile.id !== id)
    );
    
    if (selectedProfile?.id === id) {
      setSelectedProfile(null);
    }
  };

  const selectProfile = (id: string | null) => {
    if (!id) {
      setSelectedProfile(null);
      return;
    }
    
    const profile = profiles.find(p => p.id === id) || null;
    setSelectedProfile(profile);
  };

  const value = {
    profiles,
    loading,
    error,
    selectedProfile,
    filteredProfiles,
    filters,
    addProfile,
    updateProfile,
    deleteProfile,
    selectProfile,
    setFilters
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};