import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfiles } from '../context/ProfileContext';
import Layout from '../components/layout/Layout';
import AdminProfileList from '../components/admin/AdminProfileList';
import ProfileForm from '../components/admin/ProfileForm';
import { Profile, ProfileFormData } from '../types';

const AdminPage: React.FC = () => {
  const { 
    profiles, 
    loading, 
    error, 
    addProfile, 
    updateProfile, 
    deleteProfile 
  } = useProfiles();
  
  const [mode, setMode] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const selectedProfile = selectedProfileId 
    ? profiles.find(p => p.id === selectedProfileId) 
    : null;
  
  const handleAddClick = () => {
    setMode('add');
  };
  
  const handleEditClick = (profileId: string) => {
    setSelectedProfileId(profileId);
    setMode('edit');
  };
  
  const handleCancel = () => {
    setMode('list');
    setSelectedProfileId(null);
  };
  
  const handleAdd = (profileData: ProfileFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      addProfile(profileData);
      setIsSubmitting(false);
      setMode('list');
    }, 500);
  };
  
  const handleUpdate = (profileData: ProfileFormData) => {
    if (!selectedProfileId) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      updateProfile(selectedProfileId, profileData);
      setIsSubmitting(false);
      setMode('list');
      setSelectedProfileId(null);
    }, 500);
  };
  
  const handleDelete = (profileId: string) => {
    // Simulate API call delay
    setTimeout(() => {
      deleteProfile(profileId);
    }, 300);
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage profiles and their information</p>
      </div>
      
      <AnimatePresence mode="wait">
        {mode === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AdminProfileList
              profiles={profiles}
              loading={loading}
              error={error}
              onEdit={handleEditClick}
              onDelete={handleDelete}
              onAdd={handleAddClick}
            />
          </motion.div>
        )}
        
        {mode === 'add' && (
          <motion.div
            key="add"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProfileForm
              onSubmit={handleAdd}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          </motion.div>
        )}
        
        {mode === 'edit' && selectedProfile && (
          <motion.div
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProfileForm
              initialData={selectedProfile}
              onSubmit={handleUpdate}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default AdminPage;