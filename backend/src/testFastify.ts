// Import the framework and instantiate it
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

// Health check endpoint
fastify.get('/health', function (request, reply) {
  reply.send({ status: 'ok' })
})

// Database connection test endpoints
fastify.get('/postgres-test', function (request, reply) {
  // This is a placeholder - will be implemented with actual PostgreSQL connection
  reply.send({ database: 'postgres', status: 'mock connection ok' })
})

fastify.get('/mongodb-test', function (request, reply) {
  // This is a placeholder - will be implemented with actual MongoDB connection
  reply.send({ database: 'mongodb', status: 'mock connection ok' })
})

// Run the server!
fastify.listen({ port: 9090, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server is now listening on ${address}`)
})