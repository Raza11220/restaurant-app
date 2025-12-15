-- Insert sample menu categories
INSERT INTO public.menu_categories (name, description) VALUES
('Appetizers', 'Start your meal with our delicious appetizers'),
('Main Course', 'Hearty main dishes to satisfy your appetite'),
('Salads', 'Fresh and healthy salad options'),
('Desserts', 'Sweet treats to end your meal'),
('Beverages', 'Refreshing drinks and beverages')
ON CONFLICT (name) DO NOTHING;

-- Get category IDs for inserting menu items
DO $$
DECLARE
    appetizers_id UUID;
    main_course_id UUID;
    salads_id UUID;
    desserts_id UUID;
    beverages_id UUID;
BEGIN
    SELECT id INTO appetizers_id FROM public.menu_categories WHERE name = 'Appetizers';
    SELECT id INTO main_course_id FROM public.menu_categories WHERE name = 'Main Course';
    SELECT id INTO salads_id FROM public.menu_categories WHERE name = 'Salads';
    SELECT id INTO desserts_id FROM public.menu_categories WHERE name = 'Desserts';
    SELECT id INTO beverages_id FROM public.menu_categories WHERE name = 'Beverages';

    -- Insert Appetizers with images
    INSERT INTO public.menu_items (category_id, name, description, price, image_url, is_available) VALUES
    (appetizers_id, 'Mozzarella Sticks', 'Crispy breaded mozzarella with marinara sauce', 8.99, 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=800&q=80', true),
    (appetizers_id, 'Garlic Bread', 'Toasted bread with garlic butter and herbs', 5.99, 'https://images.unsplash.com/photo-1573140401552-388e259e3c8b?w=800&q=80', true),
    (appetizers_id, 'Bruschetta', 'Grilled bread with tomatoes, basil, and olive oil', 7.99, 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80', true),
    (appetizers_id, 'Chicken Wings', 'Spicy buffalo wings with ranch dipping sauce', 10.99, 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800&q=80', true),
    (appetizers_id, 'Spring Rolls', 'Crispy vegetable spring rolls with sweet chili sauce', 6.99, 'https://images.unsplash.com/photo-1625835406499-454609c5e8c0?w=800&q=80', true),
    (appetizers_id, 'Nachos', 'Tortilla chips with cheese, jalapeños, and salsa', 9.99, 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80', true)
    ON CONFLICT DO NOTHING;

    -- Insert Main Courses with images
    INSERT INTO public.menu_items (category_id, name, description, price, image_url, is_available) VALUES
    (main_course_id, 'Margherita Pizza', 'Classic pizza with tomato, mozzarella, and basil', 14.99, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80', true),
    (main_course_id, 'Spaghetti Carbonara', 'Creamy pasta with bacon, egg, and parmesan', 16.99, 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80', true),
    (main_course_id, 'Chicken Parmesan', 'Breaded chicken with marinara and mozzarella', 18.99, 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80', true),
    (main_course_id, 'Grilled Salmon', 'Fresh salmon with lemon butter sauce and vegetables', 22.99, 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&q=80', true),
    (main_course_id, 'Beef Burger', 'Juicy beef patty with lettuce, tomato, and cheese', 15.99, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', true),
    (main_course_id, 'Fish and Chips', 'Crispy battered fish with french fries', 17.99, 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800&q=80', true),
    (main_course_id, 'Ribeye Steak', 'Tender 12oz ribeye with roasted potatoes', 28.99, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80', true),
    (main_course_id, 'Chicken Alfredo', 'Fettuccine pasta with creamy alfredo sauce and grilled chicken', 17.99, 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80', true),
    (main_course_id, 'Beef Tacos', 'Three soft tacos with seasoned beef, lettuce, and cheese', 13.99, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80', true),
    (main_course_id, 'Vegetable Stir Fry', 'Fresh vegetables with tofu in savory sauce', 14.99, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80', true)
    ON CONFLICT DO NOTHING;

    -- Insert Salads with images
    INSERT INTO public.menu_items (category_id, name, description, price, image_url, is_available) VALUES
    (salads_id, 'Caesar Salad', 'Romaine lettuce with caesar dressing and croutons', 12.99, 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80', true),
    (salads_id, 'Greek Salad', 'Fresh vegetables with feta cheese and olives', 11.99, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80', true),
    (salads_id, 'Cobb Salad', 'Mixed greens with chicken, bacon, egg, and avocado', 14.99, 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&q=80', true),
    (salads_id, 'Caprese Salad', 'Fresh mozzarella, tomatoes, and basil with balsamic', 10.99, 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&q=80', true)
    ON CONFLICT DO NOTHING;

    -- Insert Desserts with images
    INSERT INTO public.menu_items (category_id, name, description, price, image_url, is_available) VALUES
    (desserts_id, 'Cheesecake', 'New York style cheesecake with berry sauce', 7.99, 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&q=80', true),
    (desserts_id, 'Chocolate Lava Cake', 'Warm chocolate cake with molten center', 9.99, 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80', true),
    (desserts_id, 'Tiramisu', 'Classic Italian dessert with espresso and mascarpone', 8.99, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80', true),
    (desserts_id, 'Ice Cream Sundae', 'Three scoops with toppings and whipped cream', 6.99, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80', true),
    (desserts_id, 'Apple Pie', 'Homemade apple pie with vanilla ice cream', 7.99, 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80', true),
    (desserts_id, 'Chocolate Brownie', 'Rich chocolate brownie with vanilla ice cream', 6.99, 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80', true)
    ON CONFLICT DO NOTHING;

    -- Insert Beverages with images
    INSERT INTO public.menu_items (category_id, name, description, price, image_url, is_available) VALUES
    (beverages_id, 'Coffee', 'Freshly brewed hot coffee', 3.99, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', true),
    (beverages_id, 'Cappuccino', 'Espresso with steamed milk foam', 4.99, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80', true),
    (beverages_id, 'Iced Tea', 'Refreshing iced tea with lemon', 2.99, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80', true),
    (beverages_id, 'Fresh Orange Juice', 'Freshly squeezed orange juice', 4.99, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80', true),
    (beverages_id, 'Coca Cola', 'Classic Coca Cola', 2.49, 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800&q=80', true),
    (beverages_id, 'Lemonade', 'Homemade fresh lemonade', 3.49, 'https://images.unsplash.com/photo-1523677011781-c91d1bbe4a5f?w=800&q=80', true),
    (beverages_id, 'Smoothie', 'Mixed berry smoothie', 5.99, 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800&q=80', true),
    (beverages_id, 'Mojito', 'Classic mojito cocktail', 8.99, 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80', true)
    ON CONFLICT DO NOTHING;
END $$;
