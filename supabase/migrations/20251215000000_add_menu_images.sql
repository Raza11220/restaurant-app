-- Update menu items with beautiful food images
-- Using high-quality food images from Unsplash

-- Update Caesar Salad
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80'
WHERE name = 'Caesar Salad';

-- Update Cheesecake
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&q=80'
WHERE name = 'Cheesecake';

-- Update Chicken Parmesan
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80'
WHERE name = 'Chicken Parmesan';

-- Update Chocolate Lava Cake
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80'
WHERE name = 'Chocolate Lava Cake';

-- Update Margherita Pizza
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80'
WHERE name = 'Margherita Pizza';

-- Update Spaghetti Carbonara
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80'
WHERE name = 'Spaghetti Carbonara';

-- Update Grilled Salmon
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&q=80'
WHERE name = 'Grilled Salmon';

-- Update Beef Burger
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80'
WHERE name = 'Beef Burger';

-- Update Greek Salad
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80'
WHERE name = 'Greek Salad';

-- Update Tiramisu
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80'
WHERE name = 'Tiramisu';

-- Update Mozzarella Sticks
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=800&q=80'
WHERE name = 'Mozzarella Sticks';

-- Update Garlic Bread
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1573140401552-388e259e3c8b?w=800&q=80'
WHERE name = 'Garlic Bread';

-- Update Bruschetta
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80'
WHERE name = 'Bruschetta';

-- Update Chicken Wings
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800&q=80'
WHERE name = 'Chicken Wings';

-- Update Fish and Chips
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800&q=80'
WHERE name = 'Fish and Chips';

-- Update Steak
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80'
WHERE name LIKE '%Steak%' OR name LIKE '%steak%';

-- Update Pasta dishes without specific images
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80'
WHERE image_url IS NULL AND (name LIKE '%Pasta%' OR name LIKE '%pasta%');

-- Update Seafood dishes
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1559737558-2f45a3bc9e0d?w=800&q=80'
WHERE image_url IS NULL AND (name LIKE '%Seafood%' OR name LIKE '%Shrimp%' OR name LIKE '%Lobster%');

-- Update Beverages - Coffee
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80'
WHERE name LIKE '%Coffee%' OR name LIKE '%Espresso%' OR name LIKE '%Cappuccino%' OR name LIKE '%Latte%';

-- Update Beverages - Tea
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1597318130040-ea18c77b6e0e?w=800&q=80'
WHERE name LIKE '%Tea%';

-- Update Beverages - Juice
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80'
WHERE name LIKE '%Juice%' OR name LIKE '%Orange%' OR name LIKE '%Apple%';

-- Update Beverages - Soda
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=800&q=80'
WHERE name LIKE '%Soda%' OR name LIKE '%Cola%' OR name LIKE '%Sprite%';

-- Update Beverages - Cocktails
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80'
WHERE name LIKE '%Cocktail%' OR name LIKE '%Mojito%' OR name LIKE '%Margarita%';

-- Update Ice Cream
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80'
WHERE name LIKE '%Ice Cream%' OR name LIKE '%Gelato%';

-- Update Pancakes
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80'
WHERE name LIKE '%Pancake%';

-- Default image for any remaining items
UPDATE public.menu_items
SET image_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
WHERE image_url IS NULL;
