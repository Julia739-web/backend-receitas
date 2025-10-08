import Fastify from 'fastify';
import pkg from 'pg';

const server = Fastify();

const { Pool } = pkg;
const pool = new Pool({
    user: 'local',
    host: 'localhost',
    database: 'receitas',
    password: '12345',
    port: 5432,
});

server.get('/usuarios', async (req, reply) => {
    const retorno = await pool.query('SELECT * FROM usuarios');
    try {
        reply.status(200).send(retorno.rows);
    } catch (error) {
        reply.status(500).send({ error: 'Erro carregando os usuários'})
    }
})

server.post('/usuarios', async (req, reply) => {
    const { nome, senha ,email, telefone } = req.body;
    try {
        const retorno = await pool.query(
            'INSERT INTO usuarios (nome, senha, email, telefone) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, senha, email, telefone]
        );
        reply.status(201).send(retorno.rows[0]);
    } catch (error) {
        reply.status(500).send({ error: 'Erro criando o usuário' })
}
})

server.listen({
    port: 3000,
    host: '0.0.0.0'
})
