# Create a web page using node.js 

- The web page shows map of the world. 
- THe top right corener shows lattitute and longitude of the location on map when user clicks on it.
- THe web page should show business close to point clicked on map by user.
- Nearby business should pop on right corner of page as list. 

# Source of business 


## Database Schema

### Business Table
```sql
CREATE TABLE business (
    business_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    business_name VARCHAR(255) NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL
);
```

### Geohash Table
```sql
CREATE TABLE geohash (
    geohash_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    business_id BIGINT NOT NULL,
    geohash_value VARCHAR(255)
);
```

## API Endpoints

### 1. Business Management Endpoints

#### Get Business by ID
```
GET /api/business/{id}
```
Returns details of a business by its ID.

**Response:**
```json
{
    "businessId": 1,
    "businessName": "Iyengers Bakery",
    "latitude": 45.677,
    "longitude": 234.234324
}
```

#### Add New Business
```
POST /api/business/{id}
```
Adds a new business to the database.

**Request Body:**
```json
{
    "businessName": "Iyengers Bakery",
    "latitude": 45.677,
    "longitude": 234.234324
}
```

#### Update Business
```
PUT /api/business/{id}
```
Updates an existing business or adds a new entry if it doesn't exist.

**Request Body:**
```json
{
    "businessName": "Updated Business Name",
    "latitude": 45.678,
    "longitude": 234.234325
}
```

#### Delete Business
```
DELETE /api/business/{id}
```
Deletes an existing business from the database.

### 2. Proximity Search Endpoint

#### Search Nearby Businesses
```
GET /api/nearby/search/{latitude}/{longitude}?radius=5.0
```
Finds all businesses within the specified radius (in kilometers) from the given coordinates.

**Query Parameters:**
- `radius` (optional, default: 5.0 km): Search radius in kilometers

**Response:**
```json
[
    {
        "businessId": 1,
        "businessName": "Iyengers Bakery",
        "latitude": 45.677,
        "longitude": 234.234324
    },
    {
        "businessId": 2,
        "businessName": "Another Business",
        "latitude": 45.680,
        "longitude": 234.235000
    }
]
```


# Technicals
- Use recommended framework to create the web page. 
- Ask for confirmation before making major decicions. 
- Use the details provided above to make call to API for business and search . 
- Install required tools.
- Discuss technical architecture before implementation 

