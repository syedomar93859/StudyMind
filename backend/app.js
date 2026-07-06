import sqlite3 from 'sqlite3';
import fs from "fs";



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
    // query data after insert finishes
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

// connect to database
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
    // query data after insert finishes
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


export function getHistory(accountId) {
    return new Promise((resolve, reject) => {

        db.all(
            `SELECT role, message FROM ai_history WHERE account_id = ? ORDER BY id DESC LIMIT 40`,
            [accountId], (err, rows) => {

                if (err) {
                    reject(err);
                    return;
                }

                // reverse so the oldest message comes first
                rows.reverse();

                resolve(rows);
            }
        );
    });
}


export function updateHistory(accountId, role, message) {
    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO ai_history(account_id, role, message)
            VALUES (?, ?, ?)
        `;

        db.run(
            sql,
            [accountId, role, message],
            function(err) {

                if (err)
                    return reject(err);

                resolve(this.lastID);
            }
        );

    });
}

export function deleteHistory(deleteId) {
    return new Promise((resolve, reject) => {

        const sql = `DELETE FROM ai_history WHERE account_id = ? AND id NOT IN (SELECT id FROM ai_history 
        WHERE account_id = ? ORDER BY id DESC LIMIT 40);`

        db.run(sql, [deleteId, deleteId], function(err) {

            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
}



export function obtainEmail(accountId) {
    return new Promise((resolve, reject) => {

        db.get(
            "SELECT email FROM accounts WHERE id = ? LIMIT 1",
            [accountId],
            (err, row) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(row.email);
                
            }
        );
    });
}

export function obtainPassword(accountId) {
    return new Promise((resolve, reject) => {

        db.get(
            "SELECT encrypt_pass FROM accounts WHERE id = ? LIMIT 1",
            [accountId],
            (err, row) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(row.encrypt_pass);
                
            }
        );
    });
}


export function updateName(newName, accountId) {
    return new Promise((resolve, reject) => {

        const sql =
            `UPDATE accounts SET username=? WHERE id=?`;

        db.run(sql, [newName, accountId], function(err) {

            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
}

export function updateEmail(newEmail, accountId) {
    return new Promise((resolve, reject) => {

        const sql =
            `UPDATE accounts SET email=? WHERE id=?`;

        db.run(sql, [newEmail, accountId], function(err) {

            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
}


export function changePassword(id, pass) {
    return new Promise((resolve, reject) => {

        const sql =
            `UPDATE accounts SET encrypt_pass=? WHERE id=?`;

        db.run(sql, [pass, id], function(err) {

            if (err) {
                return reject(err);
            }

            resolve(true);
        });
    });
}


db.exec(sql, (err) => {
    if (err) console.error(err);
});
