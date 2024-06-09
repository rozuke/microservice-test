const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(cors());
// Middleware para parsear JSON
app.use(express.json());

// Datos ficticios
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Ruta para obtener un usuario por ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// Ruta para crear un nuevo usuario
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Ruta para actualizar un usuario por ID
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    res.json(user);
});

// Ruta para eliminar un usuario por ID
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');

    users.splice(userIndex, 1);
    res.status(204).send();
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});