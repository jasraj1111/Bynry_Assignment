import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfiles } from '../context/ProfileContext';
import Layout from '../components/layout/Layout';
import ProfileList from '../components/profiles/ProfileList';
import ProfileDetail from '../components/profiles/ProfileDetail';
import MapView from '../components/map/MapView';
import SearchBar from '../components/common/SearchBar';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  const { 
    filteredProfiles, 
    loading, 
    error, 
    selectedProfile, 
    selectProfile,
    setFilters,
    filters
  } = useProfiles();
  
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'map'>('list');
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [locationInput, setLocationInput] = useState(filters.location || '');
  
  const navigate = useNavigate();
  
  // Reset view mode when selected profile changes
  useEffect(() => {
    if (!selectedProfile && viewMode === 'detail') {
      setViewMode('list');
    }
  }, [selectedProfile, viewMode]);

  const handleSearch = (term: string) => {
    setFilters({ ...filters, searchTerm: term });
  };
  
  const handleLocationFilter = () => {
    setFilters({ ...filters, location: locationInput });
    setShowLocationFilter(false);
  };
  
  const handleResetFilters = () => {
    setFilters({ searchTerm: '', location: '' });
    setLocationInput('');
  };

  const handleSummaryClick = (profileId: string) => {
    selectProfile(profileId);
    setViewMode('map');
  };
  
  const handleViewDetails = (profileId: string) => {
    selectProfile(profileId);
    setViewMode('detail');
  };
  
  const handleBackToList = () => {
    setViewMode('list');
  };
  
  const handleMapMarkerClick = (profileId: string) => {
    selectProfile(profileId);
    setViewMode('detail');
  };
  
  return (
    <Layout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Profile Explorer</h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search profiles..."
              className="w-full sm:w-64"
            />
            
            <div className="relative">
              <Button 
                variant="outline" 
                onClick={() => setShowLocationFilter(!showLocationFilter)}
                className="flex items-center"
              >
                <Filter size={16} className="mr-1" />
                {filters.location ? 'Location filter active' : 'Filter by location'}
              </Button>
              
              {showLocationFilter && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-3 border border-gray-200">
                  <div className="mb-2">
                    <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      id="location-filter"
                      type="text"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      placeholder="City, state or country"
                      className="w-full p-2 border rounded-md text-sm"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button size="sm" variant="outline" onClick={() => setShowLocationFilter(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleLocationFilter}>
                      Apply
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {(filters.searchTerm || filters.location) && (
              <Button variant="outline" onClick={handleResetFilters} size="sm">
                Clear filters
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={viewMode === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            Profiles
          </Button>
          <Button
            variant={viewMode === 'map' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
          >
            <MapPin size={16} className="mr-1" /> Map View
          </Button>
        </div>
        
        {filters.searchTerm || filters.location ? (
          <div className="mb-4 p-2 bg-blue-50 text-blue-800 rounded-md">
            <div className="flex items-center">
              <Search size={16} className="mr-1" />
              <span className="text-sm">
                Showing {filteredProfiles.length} result{filteredProfiles.length !== 1 ? 's' : ''}
                {filters.searchTerm && <> for "{filters.searchTerm}"</>}
                {filters.location && <> in "{filters.location}"</>}
              </span>
            </div>
          </div>
        ) : null}
      </div>
      
      <AnimatePresence mode="wait">
        {viewMode === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProfileList
              profiles={filteredProfiles}
              loading={loading}
              error={error}
              onSummaryClick={handleSummaryClick}
              onViewDetails={handleViewDetails}
            />
          </motion.div>
        )}
        
        {viewMode === 'detail' && selectedProfile && (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProfileDetail
              profile={selectedProfile}
              onBack={handleBackToList}
            />
          </motion.div>
        )}
        
        {viewMode === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[calc(100vh-260px)] min-h-[500px]"
          >
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedProfile 
                    ? `Location: ${selectedProfile.address.city}, ${selectedProfile.address.state}` 
                    : 'All Profiles'
                  }
                </h2>
                {selectedProfile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => selectProfile(null)}
                  >
                    Show All Profiles
                  </Button>
                )}
              </div>
              <MapView
                profiles={filteredProfiles}
                selectedProfile={selectedProfile}
                onMarkerClick={handleMapMarkerClick}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default HomePage;