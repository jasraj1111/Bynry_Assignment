# Profile Map Explorer

A modern, interactive web application for exploring user profiles with integrated map visualization, built with React, TypeScript, and Leaflet.

![Profile Map Explorer](https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- **Interactive Profile Browsing**: View and explore user profiles with detailed information
- **Map Integration**: Visualize profile locations using interactive maps powered by Leaflet
- **Advanced Search & Filtering**: Search profiles by name, description, or interests, and filter by location
- **Responsive Design**: Fully responsive interface that works seamlessly across all devices
- **Admin Dashboard**: Complete profile management system with CRUD operations
- **Real-time Updates**: Smooth animations and transitions for a polished user experience

## Live Demo

Check out the live demo: [Profile Map Explorer](https://bynry-assignment-jasraj.netlify.app/)

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Map Integration**: React Leaflet for interactive maps
- **Icons**: Lucide React for beautiful, consistent iconography
- **Animations**: Framer Motion for smooth transitions
- **Development**: Vite for fast development and building

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/profile-map-explorer.git
cd profile-map-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── admin/         # Admin dashboard components
│   ├── common/        # Shared components (Button, Card, etc.)
│   ├── layout/        # Layout components
│   ├── map/          # Map-related components
│   └── profiles/     # Profile-related components
├── context/          # React context for state management
├── data/            # Mock data and data utilities
├── pages/           # Page components
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Features in Detail

### Profile Management
- Create, read, update, and delete user profiles
- Rich profile information including contact details and interests
- Profile image management with preview

### Map Features
- Interactive map view of all profiles
- Individual profile location highlighting
- Smooth animations when switching between profiles
- Custom markers with profile information

### Search and Filtering
- Real-time search functionality
- Location-based filtering
- Combined search with multiple criteria

### Admin Dashboard
- Secure admin interface
- Bulk operations support
- Profile management tools
- Data validation and error handling


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Profile images from [Pexels](https://www.pexels.com)
- Map data from [OpenStreetMap](https://www.openstreetmap.org)
- Icons from [Lucide](https://lucide.dev)

## Contact

Your Name - Jasraj Shendge
Email ID: jasrajshen2020@gmail.com

Project Link: [GitHub](https://github.com/jasraj1111/Bynry_Assignment)
