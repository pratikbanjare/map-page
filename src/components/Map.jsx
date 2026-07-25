import React, { useCallback, useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { businessAPI } from '../services/api'

// Set your Mapbox token here or via environment variable
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export default function Map({ onLocationSelect, onBusinessesLoaded, searchRadius = 5.0, searchLocation }) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [error, setError] = useState(null)
  const markerRef = useRef(null)
  const updateLocationRef = useRef()

  const updateLocation = useCallback(async (latitude, longitude) => {
    console.log('Map.updateLocation called with:', { latitude, longitude, searchRadius })
    onLocationSelect({ latitude, longitude })

    if (markerRef.current) {
      markerRef.current.remove()
      markerRef.current = null
    }

    const el = document.createElement('div')
    el.className = 'w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg'

    markerRef.current = new mapboxgl.Marker({ element: el })
      .setLngLat([longitude, latitude])
      .addTo(map.current)

    if (map.current) {
      map.current.flyTo({
        center: [longitude, latitude],
        zoom: 10,
        essential: true,
      })
    }

    try {
      const businesses = await businessAPI.searchNearby(latitude, longitude, searchRadius)
      console.log('Map.updateLocation loaded businesses:', businesses?.length)
      onBusinessesLoaded(businesses)
    } catch (err) {
      console.error('Error fetching nearby businesses:', err)
      onBusinessesLoaded([])
    }
  }, [onBusinessesLoaded, onLocationSelect, searchRadius])

  useEffect(() => {
    updateLocationRef.current = updateLocation
  }, [updateLocation])

  // Initialize map
  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      setError('Mapbox token not configured. Please set VITE_MAPBOX_TOKEN in your environment.')
      return
    }

    mapboxgl.accessToken = MAPBOX_TOKEN

    if (map.current) return // Prevent reinitializing

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [0, 20],
        zoom: 2,
      })

      map.current.on('load', () => {
        console.log('Map loaded')
        setMapLoaded(true)
      })

      map.current.on('click', (e) => {
        const { lng, lat } = e.lngLat
        console.log('Map.handleMapClick:', { lng, lat })
        void updateLocationRef.current?.(lat, lng)
      })

      return () => {
        map.current?.remove()
        map.current = null
      }
    } catch (err) {
      setError(`Failed to initialize map: ${err.message}`)
      console.error('Map initialization error:', err)
    }
  }, [])

  useEffect(() => {
    if (!mapLoaded || !searchLocation) return

    const { latitude, longitude } = searchLocation
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      void updateLocationRef.current?.(latitude, longitude)
    }
  }, [mapLoaded, searchLocation])

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <p className="text-sm text-gray-600 mt-4">
            Make sure to set your Mapbox token in <code className="bg-gray-100 px-2 py-1">.env</code> file:
          </p>
          <code className="text-xs bg-gray-100 p-2 mt-2 block">VITE_MAPBOX_TOKEN=your_token_here</code>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="w-full h-full" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}
