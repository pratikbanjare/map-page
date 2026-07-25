# Map-based Business Finder

A modern web application built with React and Vite that displays an interactive world map, allowing users to discover nearby businesses based on their location.

## Features

✨ **Interactive World Map** - Built with Mapbox GL for smooth, responsive mapping
📍 **Location Selection** - Click on the map to select any location
🏢 **Nearby Business Search** - Automatically finds businesses within a configurable radius
📊 **Real-time Results** - Displays search results in a scrollable sidebar
🎯 **Coordinate Display** - Shows precise latitude and longitude in top-right corner
🔧 **Adjustable Radius** - Change search radius on the fly (1-50 km)

## Tech Stack

- **Frontend**: React 18 + Vite
- **Map Library**: Mapbox GL JS
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Backend**: Express.js (your API)
- **Database**: MySQL with Geohash indexing

## Prerequisites

- Node.js 16+ and npm
- Mapbox account (free tier available)
- Running Express.js backend API

## Installation

### 1. Clone/Setup Project

```bash
cd /Users/pratikbanjare/projects/map-page
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and add your Mapbox token:

```env
# Get token from: https://account.mapbox.com/tokens/
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cm1hcGJveGF...

# Your Express.js backend API URL
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Obtain Mapbox Token

1. Go to https://account.mapbox.com/tokens/
2. Create a new token or use default public token
3. Copy and paste into your `.env` file

### 5. Start Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:3000`

## Project Structure

```
map-page/
├── src/
│   ├── components/
│   │   ├── Map.jsx              # Main Mapbox GL component
│   │   ├── LocationInfo.jsx     # Top-right coordinate display
│   │   ├── BusinessList.jsx     # Right sidebar with results
│   ├── services/
│   │   └── api.js               # API client & endpoints
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # App styles
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── package.json                # Dependencies
├── .env.example                # Environment variables template
└── .gitignore                  # Git ignore rules
```

## Usage

### Basic Workflow

1. **View Map** - The world map loads centered on Africa by default
2. **Click Location** - Click anywhere on the map to select a location
3. **View Coordinates** - Latitude/longitude appear in the top-right box
4. **See Results** - Nearby businesses appear in the bottom-right panel
5. **Adjust Radius** - Use the top-left slider to change search radius (1-50 km)
6. **Browse Businesses** - Click on any business in the list for details

### API Integration

The app communicates with your Express.js backend via these endpoints:

#### Get Nearby Businesses
```
GET /api/nearby/search/{latitude}/{longitude}?radius=5.0
```

**Response:**
```json
[
  {
    "businessId": 1,
    "businessName": "Iyengers Bakery",
    "latitude": 45.677,
    "longitude": 234.234324
  }
]
```

#### Get Business by ID
```
GET /api/business/{id}
```

#### Add New Business
```
POST /api/business
Body: { "businessName": "...", "latitude": ..., "longitude": ... }
```

#### Update Business
```
PUT /api/business/{id}
Body: { "businessName": "...", "latitude": ..., "longitude": ... }
```

#### Delete Business
```
DELETE /api/business/{id}
```

## Configuration

### Mapbox Token
- Visit https://account.mapbox.com/tokens/
- Create a token with public scope
- Add to `.env` file as `VITE_MAPBOX_TOKEN`

### API Endpoint
- Update `VITE_API_BASE_URL` in `.env` to match your Express.js server
- Default: `http://localhost:5000/api`

### Search Radius
- Default radius is 5 km
- Can be adjusted on-the-fly from 1 to 50 km
- Modify in component as needed

### Map Style
- Current style: Mapbox Streets (light theme)
- Other options: `mapbox://styles/mapbox/dark-v11`, `satellite-v9`, `outdoors-v12`
- Edit in `src/components/Map.jsx`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Serve Production Build

```bash
npm run preview
```

## Troubleshooting

### Map Not Loading
- Check that Mapbox token is valid and set in `.env`
- Ensure token has public access enabled
- Check browser console for errors

### Businesses Not Showing
- Verify Express.js backend is running
- Check API URL in `.env` matches your backend
- Ensure backend database has business data
- Check network tab in DevTools for API errors

### CORS Issues
- Backend must have CORS enabled for your frontend origin
- Add to Express.js: `app.use(cors())`

### Style/Layout Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Run `npm run dev` again
- Check Tailwind CSS is properly compiled

## Performance Tips

- Geohash indexing on backend for faster proximity searches
- Limit search radius to reduce result set
- Cache business data on frontend for repeated searches
- Use Mapbox GL optimization settings

## Development

### Hot Module Replacement (HMR)
- Changes to React components auto-update in browser
- Vite provides fast HMR during development

### Debugging
- Use browser DevTools (F12)
- Check Console tab for errors
- Network tab to inspect API calls

## Contributing

To add features:

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

MIT

## Support

For issues or questions:
- Check `.env.example` for required variables
- Review API endpoint documentation
- Check Mapbox GL documentation: https://docs.mapbox.com/mapbox-gl-js/
- Check React documentation: https://react.dev/

---

**Next Steps:**
1. ✅ Run `npm install`
2. ✅ Create `.env` file with Mapbox token
3. ✅ Start Express.js backend on port 5000
4. ✅ Run `npm run dev`
5. ✅ Click on map to test
