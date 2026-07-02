import sqlite3 from 'sqlite3';
import fs from "fs";



export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function insertNote(accountId, title, content) {
    return new Promise((resolve, reject) => {

        const sql = `INSERT INTO notes(account_id, title, content) VALUES(?, ?, ?)`;

        db.run(
            sql,
            [accountId, title, content],
            function(err) {
                if (err) return reject(err);

                resolve(this.lastID);
            }
        );
    });
}

export function viewNoteTable(){
    // Query data AFTER insert finishes
    const sql = `SELECT * FROM notes`;

    db.all(sql, [], (err, rows) => {
        if (err) return console.error(err.message);

        rows.forEach((row) => {
            console.log(row);
        });
    });
}

export function deleteNoteTable(){
    db.run("DROP TABLE notes")
    console.log("This should delete the table.");
}

export function getAllNotes(accountId) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM notes WHERE account_id = ?`;

        db.all(sql, [accountId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

// removeNote(deleteId)

export function removeNote(deleteId, accountId) {
    return new Promise((resolve, reject) => {

        const sql = `DELETE FROM notes WHERE id = ? AND account_id = ?`

        db.run(sql, [deleteId, accountId], function(err) {

            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
}

export function editNote(accountId, noteId, title, content) {
    return new Promise((resolve, reject) => {

        const sql =
            `UPDATE notes SET title=?, content=? WHERE id=? AND account_id=?`;

        db.run(sql, [title, content, noteId, accountId], function(err) {

            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
}

// Connect to database
const db = new sqlite3.Database(
    './studymind.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) return console.error(err.message);
        console.log('Connected to database.');
    }
);

const sql = fs.readFileSync("./schema.sql", "utf8");




export function insertAccount(username, email, password) {
    return new Promise((resolve, reject) => {

        const sql = `INSERT INTO accounts(username, email, encrypt_pass) VALUES(?, ?, ?)`;

        db.run(
            sql,
            [username, email, password],
            function(err) {
                if (err) return reject(err);

                resolve(this.lastID);
            }
        );
    });
}


export function viewAccountTable(){
    // Query data AFTER insert finishes
    const sql = `SELECT * FROM accounts`;

    db.all(sql, [], (err, rows) => {
        if (err) return console.error(err.message);

        rows.forEach((row) => {
            console.log(row);
        });
    });
}

export function checkAccountExists(email) {
    return new Promise((resolve, reject) => {

        const sql = `SELECT * FROM accounts WHERE email = ?`;

        db.get(sql, [email], function(err, row) {

            console.log(email);
            // console.log(row);

            if (err) {
                return reject(err);
            }

            if (row) {
                resolve({
                    exists: true,
                    id: row.id,
                    username: row.username,
                    password: row.encrypt_pass
                });
            }else {
                resolve({
                    exists: false,
                    id: null,
                    username: null,
                    password: null
                });
            }
        });
    });
}

export function doesNameExist(name) {
    return new Promise((resolve, reject) => {

        db.get(
            "SELECT 1 FROM accounts WHERE username = ? LIMIT 1",
            [name],
            (err, row) => {

                if (err) {
                    reject(err);
                    return;
                }

                if (row) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        );
    });
}

export function doesEmailExist(email) {
    return new Promise((resolve, reject) => {

        db.get(
            "SELECT 1 FROM accounts WHERE email = ? LIMIT 1",
            [email],
            (err, row) => {

                if (err) {
                    reject(err);
                    return;
                }

                if (row) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        );
    });
}



// // Create table
// sql = `
// CREATE TABLE IF NOT EXISTS notes (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT,
//     content TEXT
// )
// `;

// db.run(sql, (err) => {
//     if (err) return console.error(err.message);
// });

db.exec(sql, (err) => {
    if (err) console.error(err);
});
