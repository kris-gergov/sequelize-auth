import bcrypt from 'bcrypt';
import environment from '../config/environment';

export function hashPassword(password) {
    return bcrypt.hash(password, environment.saltRounds);
}

export function comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}
