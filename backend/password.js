import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

//encrypts/hashes a password

export async function encryptPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

//checks whether the user-submitted password matches a hash

export async function verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}