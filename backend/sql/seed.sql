INSERT INTO manufacturers (name) VALUES
('Nissan'),
('Honda'),
('Toyota'),
('Volkswagen'),
('Fiat'),
('Chevrolet')
ON CONFLICT (name) DO NOTHING;

INSERT INTO key_types (name) VALUES
('Chave presencial (de presença)'),
('Chave com telecomando canivete'),
('Chave com telecomando não canivete (fura bolso)'),
('Chave simples (sem telecomando)'),
('Telecomando separado da chave (tipo chaveiro)')
ON CONFLICT (name) DO NOTHING;

INSERT INTO automotive_keys (title, manufacturer_id, key_type_id, year, year_range, price, in_stock, image_url)
SELECT 'Nissan Sentra', m.id, kt.id, 2018, '2016 - 2020', 280.00, TRUE, '/images/nissan-sentra-key.jpg'
FROM manufacturers m, key_types kt
WHERE m.name = 'Nissan' AND kt.name = 'Chave presencial (de presença)'
AND NOT EXISTS (SELECT 1 FROM automotive_keys ak WHERE ak.title = 'Nissan Sentra');

INSERT INTO automotive_keys (title, manufacturer_id, key_type_id, year, year_range, price, in_stock, image_url)
SELECT 'Honda Civic', m.id, kt.id, 2017, '2014 - 2019', 320.00, TRUE, '/images/honda-civic-key.jpg'
FROM manufacturers m, key_types kt
WHERE m.name = 'Honda' AND kt.name = 'Chave com telecomando canivete'
AND NOT EXISTS (SELECT 1 FROM automotive_keys ak WHERE ak.title = 'Honda Civic');

INSERT INTO automotive_keys (title, manufacturer_id, key_type_id, year, year_range, price, in_stock, image_url)
SELECT 'Toyota Corolla', m.id, kt.id, 2019, '2017 - 2021', 350.00, TRUE, '/images/toyota-corolla-key.jpg'
FROM manufacturers m, key_types kt
WHERE m.name = 'Toyota' AND kt.name = 'Chave com telecomando não canivete (fura bolso)'
AND NOT EXISTS (SELECT 1 FROM automotive_keys ak WHERE ak.title = 'Toyota Corolla');
