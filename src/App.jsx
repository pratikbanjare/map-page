import React, { useCallback, useState } from 'react'
import Map from './components/Map'
import LocationInfo from './components/LocationInfo'
import BusinessList from './components/BusinessList'
import './App.css'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchRadius, setSearchRadius] = useState(5.0)
  const [searchLatitude, setSearchLatitude] = useState('')
  const [searchLongitude, setSearchLongitude] = useState('')
  const [searchLocation, setSearchLocation] = useState(null)
  const [searchError, setSearchError] = useState('')

  const handleLocationSelect = useCallback((location) => {
    console.log('App.handleLocationSelect:', location)
    setSelectedLocation(location)
    setLoading(true)
    setError(null)
  }, [])

  const handleBusinessesLoaded = useCallback((businessData) => {
    console.log('App.handleBusinessesLoaded:', { count: businessData?.length || 0 })
    setBusinesses(businessData || [])
    setLoading(false)
    if (!businessData || businessData.length === 0) {
      setError('No businesses found in this area')
    } else {
      setError(null)
    }
  }, [])

  const handleCoordinateSearch = useCallback((event) => {
    event.preventDefault()

    const latitude = parseFloat(searchLatitude)
    const longitude = parseFloat(searchLongitude)

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      setSearchError('Please enter valid latitude and longitude values.')
      return
    }

    if (latitude < -90 || latitude > 90) {
      setSearchError('Latitude must be between -90 and 90.')
      return
    }

    if (longitude < -180 || longitude > 180) {
      setSearchError('Longitude must be between -180 and 180.')
      return
    }

    setSearchError('')
    const nextLocation = { latitude, longitude }
    console.log('App.handleCoordinateSearch:', nextLocation)
    setSelectedLocation(nextLocation)
    setSearchLocation(nextLocation)
    setLoading(true)
    setError(null)
  }, [searchLatitude, searchLongitude])

  return (
    <div className="w-full h-screen bg-gray-50 relative">
      {/* Main Map */}
      <Map
        onLocationSelect={handleLocationSelect}
        onBusinessesLoaded={handleBusinessesLoaded}
        searchRadius={searchRadius}
        searchLocation={searchLocation}
      />

      {/* Location Info - Top Right */}
      <LocationInfo
        latitude={selectedLocation?.latitude}
        longitude={selectedLocation?.longitude}
      />

      {/* Business List - Bottom Right */}
      <BusinessList
        businesses={businesses}
        loading={loading}
        error={error}
      />

      {/* Coordinate Search - Top Left */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-10 w-72">
        <form onSubmit={handleCoordinateSearch} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              value={searchLatitude}
              onChange={(e) => setSearchLatitude(e.target.value)}
              placeholder="e.g. 40.7128"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              value={searchLongitude}
              onChange={(e) => setSearchLongitude(e.target.value)}
              placeholder="e.g. -74.0060"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Search Location
          </button>
        </form>

        {searchError && (
          <p className="mt-3 text-sm text-red-600">{searchError}</p>
        )}
      </div>

      {/* Search Radius Control */}
      {selectedLocation && (
        <div className="absolute top-4 left-[21rem] bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Radius (km)
          </label>
          <input
            type="range"
            min="1"
            max="50"
            step="0.5"
            value={searchRadius}
            onChange={(e) => setSearchRadius(parseFloat(e.target.value))}
            className="w-32"
          />
          <div className="text-sm text-gray-600 mt-2">{searchRadius} km</div>
        </div>
      )}
    </div>
  )
}

export default App
