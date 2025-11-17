import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: '192.168.1.93',
    user: 'rhea',
    password: 'Team13Capstone',
    database: 'my_database',
    port: 3306
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

// Example API route
app.get('/my_database', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        fs.writeFileSync('package.json', JSON.stringify(results, null, 2));
        res.json(results);
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));

// Test fetch
async function getData() {
    const res = await fetch("http://192.168.1.93:3006/my_database");
    const data = await res.json();
    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}
