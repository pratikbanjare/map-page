import React from 'react'

export default function BusinessList({ businesses, loading, error }) {
  console.log('BusinessList render:', { count: businesses?.length || 0, loading, error })
  if (!businesses || businesses.length === 0) {
    return (
      <div className="absolute right-4 bottom-4 w-80 max-h-96 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Nearby Businesses</h3>
        <p className="text-sm text-gray-500">
          {loading ? 'Searching...' : error ? 'Error loading businesses' : 'Click on the map to find nearby businesses'}
        </p>
      </div>
    )
  }

  return (
    <div className="absolute right-4 bottom-4 w-80 max-h-96 bg-white rounded-lg shadow-lg border border-green-200 z-10 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <h3 className="font-semibold text-gray-800">
          Nearby Businesses ({businesses.length})
        </h3>
      </div>

      {loading && (
        <div className="p-4 text-center">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      )}

      {error && (
        <div className="p-4 text-center">
          <div className="text-sm text-red-500">Error: {error}</div>
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-y-auto flex-1">
          {businesses.map((business) => (
            <div
              key={business.businessId}
              className="p-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer last:border-b-0"
            >
              <h4 className="font-medium text-gray-800 text-sm mb-1">
                {business.businessName}
              </h4>
              <div className="text-xs text-gray-600 space-y-0.5">
                <div>
                  📍 Lat: <span className="font-mono">{business.latitude.toFixed(4)}</span>
                </div>
                <div>
                  📍 Lng: <span className="font-mono">{business.longitude.toFixed(4)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
