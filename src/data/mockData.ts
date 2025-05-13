import { faker } from '@faker-js/faker';
import { Profile } from '../types';

// Set seed for consistent data generation
faker.seed(123);

// Generate random profiles
const generateProfiles = (count: number): Profile[] => {
  return Array.from({ length: count }, () => {
    const lat = parseFloat(faker.location.latitude({ min: 25, max: 49 }));
    const lng = parseFloat(faker.location.longitude({ min: -125, max: -70 }));
    
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      description: faker.person.bio(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: 'United States',
        zipCode: faker.location.zipCode(),
        coordinates: { lat, lng }
      },
      contact: {
        email: faker.internet.email(),
        phone: faker.phone.number()
      },
      interests: Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => faker.word.sample()
      ),
      createdAt: faker.date.recent().toISOString()
    };
  });
};

export const mockProfiles: Profile[] = generateProfiles(12);