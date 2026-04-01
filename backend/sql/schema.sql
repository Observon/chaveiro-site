CREATE TABLE IF NOT EXISTS manufacturers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS key_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS automotive_keys (
    id SERIAL PRIMARY KEY,
    title VARCHAR(140) NOT NULL,
    manufacturer_id INTEGER NOT NULL REFERENCES manufacturers(id),
    key_type_id INTEGER NOT NULL REFERENCES key_types(id),
    year INTEGER NOT NULL,
    year_range VARCHAR(30) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quotes (
    id SERIAL PRIMARY KEY,
    automotive_key_id INTEGER NOT NULL REFERENCES automotive_keys(id),
    customer_name VARCHAR(120) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_automotive_keys_year ON automotive_keys(year);
CREATE INDEX IF NOT EXISTS idx_automotive_keys_stock ON automotive_keys(in_stock);
