import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Profile } from '../../types';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issue
const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

interface RecenterMapProps {
  position: [number, number];
}

// Component to handle map center changes
const RecenterMap: React.FC<RecenterMapProps> = ({ position }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(position, 13);
  }, [map, position]);
  
  return null;
};

interface MapViewProps {
  profiles: Profile[];
  selectedProfile: Profile | null;
  onMarkerClick?: (profileId: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ profiles, selectedProfile, onMarkerClick }) => {
  const defaultCenter: [number, number] = [39.8283, -98.5795]; // Center of US
  const defaultZoom = 4;
  
  const center = selectedProfile 
    ? [selectedProfile.address.coordinates.lat, selectedProfile.address.coordinates.lng] as [number, number]
    : defaultCenter;
  
  const zoom = selectedProfile ? 13 : defaultZoom;
  
  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '100%', width: '100%', minHeight: '400px' }}
      className="rounded-lg border border-gray-200 shadow-inner"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {selectedProfile && (
        <RecenterMap position={[selectedProfile.address.coordinates.lat, selectedProfile.address.coordinates.lng]} />
      )}
      
      {profiles.map(profile => (
        <Marker 
          key={profile.id}
          position={[profile.address.coordinates.lat, profile.address.coordinates.lng]}
          icon={markerIcon}
          eventHandlers={{
            click: () => {
              if (onMarkerClick) {
                onMarkerClick(profile.id);
              }
            }
          }}
        >
          <Popup>
            <div className="text-center">
              <img 
                src={profile.image} 
                alt={profile.name}
                className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
              />
              <h3 className="font-semibold">{profile.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{profile.address.city}, {profile.address.state}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;