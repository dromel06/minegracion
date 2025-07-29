const { getCollection } = require('../config/database');
const { ObjectId } = require('mongodb');

const collectionName = 'users';

exports.getAll = async () => {
    const col = await getCollection(collectionName);
    const data = await col.find().toArray();
    return data;
};

exports.getById = async (id) => {
    const col = await getCollection(collectionName);
    const data = await col.findOne({ _id: new ObjectId(id) });
    return data;
};

exports.create = async (userData) => {
    console.log('Creating user with data:', userData);
    const col = await getCollection(collectionName);

    const newUser = {
        name: userData.name,
        resources: {
            diamonds: userData.diamonds || 0,
            gold: userData.gold || 0,
            iron: userData.iron || 0,
            emeralds: userData.emeralds || 0,
            coal: userData.coal || 0,
            redstone: userData.redstone || 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const result = await col.insertOne(newUser);
    return { _id: result.insertedId, ...newUser };
};

exports.update = async (id, userData) => {
    const col = await getCollection(collectionName);

    const updateData = {
        ...userData,
        updatedAt: new Date()
    };

    const result = await col.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );

    if (result.matchedCount === 0) {
        throw new Error('Usuario no encontrado');
    }

    return await exports.getById(id);
};

exports.remove = async (id) => {
    const col = await getCollection(collectionName);
    const result = await col.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
        throw new Error('Usuario no encontrado');
    }

    return { message: 'Usuario eliminado exitosamente' };
};

exports.clearResources = async (id) => {
    const col = await getCollection(collectionName);

    const result = await col.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                resources: {
                    diamonds: 0,
                    gold: 0,
                    iron: 0,
                    emeralds: 0,
                    coal: 0,
                    redstone: 0
                },
                updatedAt: new Date()
            }
        }
    );

    if (result.matchedCount === 0) {
        throw new Error('Usuario no encontrado');
    }

    return await exports.getById(id);
};