const Fastify = require('fastify');
const cors = require('@fastify/cors');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./config/database');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const fastify = Fastify({ logger: true });

const start = async () => {
    try {
        // Registrar CORS
        await fastify.register(cors, {
            origin: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        });

        // Conectar a la base de datos
        await connectToDatabase();

        // Registrar rutas
        await fastify.register(userRoutes, { prefix: '/api/users' });
        fastify.get('/', async (request, reply) => {
            return { message: 'API de usuarios en funcionamiento' };
        });

        // Iniciar servidor
        const port = process.env.PORT || 3001;
        await fastify.listen({ port, host: '0.0.0.0' });
        console.log(`Servidor corriendo en puerto ${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();