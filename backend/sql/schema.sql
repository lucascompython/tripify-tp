-- Table for storing users (optional feature: account registration and session control)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password BYTEA NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table for storing trips
CREATE TABLE IF NOT EXISTS trips (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    -- The user who created the trip (trip owner)
    description TEXT NOT NULL,
    type VARCHAR(50),
    -- E.g., "Leisure", "Business"
    status VARCHAR(50),
    -- E.g., "Planned", "Completed", "Canceled"
    location VARCHAR(255),
    -- E.g., city or country
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table for sharing trips with other users
CREATE TABLE IF NOT EXISTS trip_shares (
    id SERIAL PRIMARY KEY,
    trip_id INT REFERENCES trips(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    -- The user with whom the trip is shared
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table for trip comments
CREATE TABLE IF NOT EXISTS trip_comments (
    id SERIAL PRIMARY KEY,
    trip_id INT REFERENCES trips(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table for locations associated with trips
CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    trip_id INT REFERENCES trips(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    type VARCHAR(50),
    -- E.g., "Tourist Spot", "Hotel"
    status VARCHAR(50),
    -- E.g., "Planned", "Visited"
    location VARCHAR(255),
    -- E.g., address or coordinates
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Table for location comments
CREATE TABLE IF NOT EXISTS location_comments (
    id SERIAL PRIMARY KEY,
    location_id INT REFERENCES locations(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);