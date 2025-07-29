
const userModel = require('../models/User');

exports.getAllUsers = async (request, reply) => {
    try {
        const users = await userModel.getAll();
        return reply.send(users);
    } catch (error) {
        return reply.status(500).send({ error: error.message });
    }
};

exports.getUserById = async (request, reply) => {
    try {
        const { id } = request.params;
        const user = await userModel.getById(id);

        if (!user) {
            return reply.status(404).send({ error: 'Usuario no encontrado' });
        }

        return reply.send(user);
    } catch (error) {
        return reply.status(500).send({ error: error.message });
    }
};

exports.createUser = async (request, reply) => {
    console.log('------ Creating user with data:', request.body);
    try {
        console.log('Creating user with data:', request.body);
        const userData = request.body;

        if (!userData.name || userData.name.trim() === '') {
            return reply.status(400).send({ error: 'El nombre es requerido' });
        }

        const user = await userModel.create(userData);
        return reply.status(201).send(user);
    } catch (error) {
        return reply.status(500).send({ error: error.message });
    }
};

exports.updateUser = async (request, reply) => {
    try {
        const { id } = request.params;
        const userData = request.body;

        const user = await userModel.update(id, userData);
        return reply.send(user);
    } catch (error) {
        return reply.status(500).send({ error: error.message });
    }
};

exports.deleteUser = async (request, reply) => {
    try {
        const { id } = request.params;
        const result = await userModel.remove(id);
        return reply.send(result);
    } catch (error) {
        return reply.status(500).send({ error: error.message });
    }
};

exports.clearUserResources = async (request, reply) => {
    try {
        const { id } = request.params;
        const user = await userModel.clearResources(id);
        return reply.send(user);
    } catch (error) {
        return reply.status(500).send({ error: error.message });
    }
};