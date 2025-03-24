// Connect to the database
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

// Create collections
db.createCollection('reviews');
db.createCollection('carts');

// Create indexes
db.reviews.createIndex({ productId: 1 });
db.carts.createIndex({ userId: 1 }, { unique: true });

// Insert some sample data
db.reviews.insertMany([
  {
    productId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    username: 'testuser',
    rating: 5,
    comment: 'These are the most comfortable shoes I\'ve ever worn!',
    createdAt: new Date()
  },
  {
    productId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    username: 'shoefan123',
    rating: 4,
    comment: 'Great shoes, but run a bit small.',
    createdAt: new Date()
  },
  {
    productId: '6d2946f8-e604-4086-8242-8a3c3d3c5409',
    username: 'admin',
    rating: 5,
    comment: 'The best running shoes on the market.',
    createdAt: new Date()
  }
]);

db.carts.insertMany([
  {
    userId: '550e8400-e29b-41d4-a716-446655440000',
    items: [
      {
        productId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        name: 'Air Max 90',
        price: 129.99,
        quantity: 1
      }
    ],
    updatedAt: new Date()
  },
  {
    userId: 'c2af9b9d-e76a-41a9-a230-5c22e190555b',
    items: [
      {
        productId: '6d2946f8-e604-4086-8242-8a3c3d3c5409',
        name: 'Ultra Boost',
        price: 179.99,
        quantity: 1
      },
      {
        productId: '9e7f9d71-cee8-4b5d-88d0-af5e1fbde9ff',
        name: 'Classic Leather',
        price: 89.99,
        quantity: 2
      }
    ],
    updatedAt: new Date()
  }
]);

print('MongoDB initialization completed');