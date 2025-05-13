export interface Profile {
  id: string;
  name: string;
  image: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    email: string;
    phone: string;
  };
  interests: string[];
  createdAt: string;
}

export interface ProfileFormData extends Omit<Profile, 'id' | 'createdAt'> {}

export interface ProfileFilters {
  searchTerm: string;
  location?: string;
}