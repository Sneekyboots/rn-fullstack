INSERT INTO properties (title, description, address, price, type, images, beds, baths, sqft, amenities, is_featured, is_available, created_at, updated_at)
VALUES 
('Luxury Apartment in City Center', 'Modern 2-bedroom apartment with stunning city views', '123 Downtown Street, City Center', 2500.00, 'rental', 
ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'], 2, 2, 1200, 
ARRAY['Air Conditioning', 'Parking', 'Gym', 'Swimming Pool'], true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Cozy Studio in Historic District', 'Charming studio apartment in a historic building', '456 Heritage Lane, Historic District', 1200.00, 'rental',
ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'], 1, 1, 500,
ARRAY['Air Conditioning', 'High Speed Internet', 'Laundry'], false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Modern Family Home', 'Spacious 3-bedroom house with garden', '789 Suburban Ave, Green Valley', 450000.00, 'sale',
ARRAY['https://images.unsplash.com/photo-1580587771525-78b9dba3b914'], 3, 2, 2000,
ARRAY['Garden', 'Garage', 'Smart Home System', 'Security System'], true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Penthouse with Ocean View', 'Luxurious penthouse with panoramic ocean views', '101 Coastal Road, Seaside', 3500.00, 'rental',
ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750'], 3, 3, 1800,
ARRAY['Ocean View', 'Private Terrace', 'Smart Home', 'Concierge'], true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

('Downtown Loft', 'Industrial-style loft in arts district', '202 Artist Way, Downtown', 1800.00, 'rental',
ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'], 1, 1, 900,
ARRAY['High Ceilings', 'Exposed Brick', 'Artist Studio Space'], false, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 