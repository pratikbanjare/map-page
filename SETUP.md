# Setup and Getting Started Guide

## ✅ Installation Complete

Your React + Vite + Mapbox GL project has been successfully created with all dependencies installed.

## 🚀 Quick Start

### Step 1: Create `.env` File

```bash
cd /Users/pratikbanjare/projects/map-page
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Get your free token from https://account.mapbox.com/tokens/
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cm1hcGJveGFjY291bnQiLCJhIjoiY2...

# Point to your Express.js backend API server
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 2: Start the Development Server

```bash
npm run dev
```

The app will automatically open at `http://localhost:3000`

### Step 3: Ensure Your Backend is Running

Your Express.js API must be running on `http://localhost:5000` with these endpoints:

- `GET /api/nearby/search/{latitude}/{longitude}?radius=5.0` - Search nearby businesses
- `GET /api/business/{id}` - Get business details
- `POST /api/business` - Add new business
- `PUT /api/business/{id}` - Update business
- `DELETE /api/business/{id}` - Delete business

## 📋 Getting Your Mapbox Token

1. Visit https://account.mapbox.com
2. Sign up for a free account (if you don't have one)
3. Go to the Tokens page
4. Create a new token with "Public scopes"
5. Copy the token and paste it in your `.env` file

## 🛠️ Project Commands

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📂 Project Structure

```
src/
├── components/
│   ├── Map.jsx              # Mapbox GL map with click handler
│   ├── LocationInfo.jsx     # Coordinates display (top-right)
│   └── BusinessList.jsx     # Business results (bottom-right)
├── services/
│   └── api.js               # API client for your backend
├── App.jsx                  # Main app component
├── App.css                  # App styles
├── index.css                # Global Tailwind styles
└── main.jsx                 # React entry point
```

## 🎯 How It Works

1. **Load Map** - Mapbox GL renders an interactive world map
2. **Click Location** - Click anywhere on the map
3. **Show Coordinates** - Latitude/longitude appears in top-right
4. **Search Nearby** - App calls `/api/nearby/search/{lat}/{lng}?radius=5.0`
5. **Display Results** - Businesses appear in the right sidebar
6. **Adjust Radius** - Change search area with the slider (top-left)

## 🔌 API Integration

The app uses `axios` to communicate with your backend. The API client is in [src/services/api.js](src/services/api.js):

```javascript
// Example: Search for nearby businesses
const businesses = await businessAPI.searchNearby(latitude, longitude, 5.0);
```

All endpoints follow the specification in Requirements.md.

## 🎨 Customization

### Change Map Style
Edit [src/components/Map.jsx](src/components/Map.jsx#L29):
```javascript
style: 'mapbox://styles/mapbox/dark-v11',  // Change to dark theme
```

Available styles:
- `streets-v12` (default)
- `dark-v11`
- `light-v11`
- `satellite-v9`
- `outdoors-v12`

### Change Search Radius Range
Edit [src/App.jsx](src/App.jsx#L38):
```javascript
<input type="range" min="1" max="100" ... />  // Change max to 100
```

### Styling
- Tailwind CSS is configured globally
- Edit [src/App.css](src/App.css) for app-specific styles
- Edit [src/index.css](src/index.css) for global styles

## 🐛 Troubleshooting

### "Map not loading" / "Error loading Mapbox"
- Check that `VITE_MAPBOX_TOKEN` is set in `.env`
- Ensure the token is valid (visit token page)
- Check browser console for exact error

### "No businesses found" or API errors
- Verify Express.js backend is running on port 5000
- Check that `VITE_API_BASE_URL` matches your backend URL
- Ensure backend database has business data
- Check Network tab in DevTools to see API responses

### Node/npm command not found
```bash
# Add Node.js to shell PATH
eval "$(/opt/homebrew/bin/brew shellenv)"

# Or add to ~/.zshrc for permanent fix:
export PATH="/opt/homebrew/bin:$PATH"
```

### Tailwind styles not showing
- Clear browser cache (Cmd+Shift+Delete)
- Restart dev server: `npm run dev`

## 📦 Building for Production

```bash
# Create optimized production build
npm run build

# Test the production build locally
npm run preview
```

Build output goes to `dist/` folder.

## 🤝 Next Steps

1. ✅ Install Node.js - Done
2. ✅ Install dependencies - Done
3. **Create `.env` file with Mapbox token** ← You are here
4. Ensure Express.js backend is running
5. Run `npm run dev`
6. Click on the map to test

## 📚 Useful Resources

- **Mapbox GL JS Docs**: https://docs.mapbox.com/mapbox-gl-js/
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Axios Docs**: https://axios-http.com/

---

**Ready to start?** Create your `.env` file and run `npm run dev`! 🚀
