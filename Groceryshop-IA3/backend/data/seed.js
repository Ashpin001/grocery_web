const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Product = require('../models/productModel');
const User = require('../models/userModel');

dotenv.config();

const products = [
  { name: 'Bananas', description: 'Fresh bananas', price: 1.25, countInStock: 100, image: '/images/bananas.png' },
  { name: 'Milk 1L', description: 'Full cream milk', price: 2.5, countInStock: 50, image: '/images/milk.svg' },
  { name: 'Bread', description: 'Whole wheat bread', price: 1.75, countInStock: 40, image: '/images/bread.svg' },
  { name: 'Eggs (dozen)', description: 'Free range eggs', price: 2.0, countInStock: 60, image: '/images/eggs.svg' },
  { name: 'Cheese block', description: 'Aged cheddar', price: 4.5, countInStock: 30, image: '/images/cheese.svg' },
  { name: 'Apple (1kg)', description: 'Crisp apples', price: 3.0, countInStock: 80, image: '/images/apple.png' },
  { name: 'Orange (1kg)', description: 'Juicy oranges', price: 2.8, countInStock: 70, image: '/images/orange.svg' },
  { name: 'Tomato (1kg)', description: 'Red tomatoes', price: 2.2, countInStock: 90, image: '/images/tomato.svg' },
  { name: 'Potato (2kg)', description: 'Russet potatoes', price: 2.5, countInStock: 120, image: '/images/potato.svg' },
  { name: 'Onion (1kg)', description: 'Yellow onions', price: 1.9, countInStock: 100, image: '/images/onion.svg' },
  { name: 'Rice 1kg', description: 'Long grain rice', price: 3.5, countInStock: 60, image: '/images/rice.svg' },
  { name: 'Pasta 500g', description: 'Durum wheat pasta', price: 1.8, countInStock: 75, image: '/images/pasta.svg' },
  { name: 'Sugar 1kg', description: 'White sugar', price: 1.4, countInStock: 90, image: '/images/sugar.svg' },
  { name: 'Salt 500g', description: 'Table salt', price: 0.9, countInStock: 110, image: '/images/salt.svg' },
  // Dairy products added per request
  { name: 'Full Cream Milk 1L', description: 'Full cream milk', price: 2.8, countInStock: 60, image: '/images/milk.svg' },
  { name: 'Toned Milk 1L', description: 'Toned milk', price: 2.3, countInStock: 70, image: '/images/milk.svg' },
  { name: 'Salted Butter 200g', description: 'Salted butter', price: 2.5, countInStock: 40, image: '/images/butter.svg' },
  { name: 'Mozzarella Cheese 200g', description: 'Soft mozzarella cheese', price: 4.5, countInStock: 25, image: '/images/cheese.svg' },
  { name: 'Cheddar Cheese 200g', description: 'Sharp cheddar', price: 4.8, countInStock: 30, image: '/images/cheese.svg' },
  { name: 'Fresh Cream 200ml', description: 'Fresh cream', price: 1.9, countInStock: 50, image: '/images/cream.svg' },
  { name: 'Plain Yogurt 500g', description: 'Curd / Dahi', price: 1.6, countInStock: 55, image: '/images/yogurt.svg' },
  { name: 'Greek Yogurt 400g', description: 'Thick Greek yogurt', price: 2.8, countInStock: 35, image: '/images/yogurt.svg' },
  { name: 'Ghee 500g', description: 'Clarified butter', price: 6.5, countInStock: 20, image: '/images/ghee.svg' },
  { name: 'Milk Powder 500g', description: 'Milk powder', price: 5.0, countInStock: 30, image: '/images/milk-powder.svg' },
  { name: 'Butter 200g', description: 'Creamery butter', price: 2.2, countInStock: 40, image: '/images/butter.svg' },
  { name: 'Yogurt 500g', description: 'Natural yogurt', price: 1.6, countInStock: 55, image: '/images/yogurt.svg' },
  { name: 'Chicken 1kg', description: 'Fresh chicken', price: 6.5, countInStock: 35, image: '/images/chicken.svg' },
  { name: 'Fish 1kg', description: 'Fresh fish', price: 7.0, countInStock: 25, image: '/images/fish.svg' },
  { name: 'Cereal', description: 'Breakfast cereal', price: 3.2, countInStock: 50, image: '/images/cereal.svg' },
  { name: 'Coffee 250g', description: 'Ground coffee', price: 4.0, countInStock: 45, image: '/images/coffee.svg' },
  { name: 'Tea 100g', description: 'Black tea', price: 2.5, countInStock: 60, image: '/images/tea.svg' },
  { name: 'Flour 1kg', description: 'All-purpose flour', price: 1.5, countInStock: 80, image: '/images/cereal.svg' },
  { name: 'Basmati Rice 1kg', description: 'Aromatic basmati rice', price: 4.5, countInStock: 50, image: '/images/rice.svg' },
  { name: 'Wheat Flour (Atta) 1kg', description: 'Stone ground wheat flour', price: 1.8, countInStock: 80, image: '/images/cereal.svg' },
  { name: 'Sunflower Cooking Oil 1L', description: 'Refined sunflower oil', price: 3.9, countInStock: 70, image: '/images/oil.svg' },
  { name: 'Groundnut Oil 1L', description: 'Cold pressed groundnut oil', price: 4.2, countInStock: 60, image: '/images/oil.svg' },
  { name: 'Mustard Oil 1L', description: 'Aromatic mustard oil', price: 3.7, countInStock: 50, image: '/images/oil.svg' },
  { name: 'Coconut Oil 1L', description: 'Pure coconut oil', price: 5.5, countInStock: 40, image: '/images/oil.svg' },
  { name: 'Olive Oil 500ml', description: 'Extra virgin olive oil', price: 8.0, countInStock: 25, image: '/images/oil.svg' },
  { name: 'Rice Bran Oil 1L', description: 'Refined rice bran oil', price: 4.0, countInStock: 55, image: '/images/oil.svg' },
  { name: 'Turmeric Powder 100g', description: 'Ground turmeric powder', price: 0.9, countInStock: 100, image: '/images/turmeric.svg' },
  { name: 'Toor Dal 1kg', description: 'Pigeon pea dal', price: 3.2, countInStock: 60, image: '/images/dal.svg' },
  { name: 'Iodized Salt 1kg', description: 'Iodized table salt', price: 0.7, countInStock: 200, image: '/images/salt.svg' },
  { name: 'Cooking oil 1L', description: 'Vegetable oil', price: 3.8, countInStock: 70, image: '/images/oil.svg' },
  { name: 'Honey', description: 'Natural honey', price: 5.0, countInStock: 30, image: '/images/honey.svg' }
  ,
  // Bakery products
  { name: 'White Bread', description: 'Soft white bread loaf', price: 1.2, countInStock: 50, image: '/images/bread.svg' },
  { name: 'Whole Wheat Bread', description: 'Healthy whole wheat loaf', price: 1.5, countInStock: 45, image: '/images/bread.svg' },
  { name: 'Croissant', description: 'Buttery croissant', price: 0.9, countInStock: 60, image: '/images/bread.svg' },
  { name: 'Muffin', description: 'Blueberry muffin', price: 0.8, countInStock: 70, image: '/images/bread.svg' },
  { name: 'Cookie', description: 'Chocolate chip cookie', price: 0.5, countInStock: 100, image: '/images/bread.svg' },
  { name: 'Donut', description: 'Glazed donut', price: 0.6, countInStock: 80, image: '/images/bread.svg' }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/grocery');
  await Product.deleteMany({});
  await User.deleteMany({});
  await Product.insertMany(products);
  const admin = new User({ name: 'Admin', email: 'admin@example.com', password: await bcrypt.hash('password', 10), isAdmin: true });
  await admin.save();
  console.log('Seeded data');
  process.exit();
}

seed().catch((err) => { console.error(err); process.exit(1); });
