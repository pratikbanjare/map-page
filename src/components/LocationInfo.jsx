import React from 'react'

export default function LocationInfo({ latitude, longitude }) {
  console.log('LocationInfo render:', { latitude, longitude })
  if (!latitude || !longitude) {
    return (
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-10">
        <p className="text-sm text-gray-500">Click on the map to select a location</p>
      </div>
    )
  }

  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-blue-200 z-10">
      <div className="text-sm font-semibold text-gray-800 mb-2">Location</div>
      <div className="space-y-1 text-sm text-gray-700">
        <div>
          <span className="font-medium">Latitude:</span>{' '}
          <span className="font-mono">{latitude.toFixed(6)}</span>
        </div>
        <div>
          <span className="font-medium">Longitude:</span>{' '}
          <span className="font-mono">{longitude.toFixed(6)}</span>
        </div>
      </div>
    </div>
  )
}
