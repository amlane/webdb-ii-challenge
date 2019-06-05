const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3'
    },
    useNullAsDefault: true
}

const db = knex(knexConfig);

module.exports = {
    find,
    findById, 
    insert, 
    remove, 
    update
}

function find() {
    return db('bears');
}

function findById(id) {
    return db('bears')
    .where({ id })
    .first()
}

function insert(bear) {
    return db('bears').insert(bear)
}

function remove(id) {
    return db('bears')
    .where({ id })
    .delete()
}

function update(id, changes) {
    return db('bears')
    .where({ id })
    .update(changes)
} 