import TestsHelpers from '../tests-helpers';
import models from '../../src/models';

describe('User', () => {
    beforeAll(async () => {
        await TestsHelpers.startDb();
    });

    afterAll(async () => {
        await TestsHelpers.stopDb();
    });

    describe('static methods', () => {
        describe('hashPassword', () => {
            it('should encrypt password correctly', async () => {
                const { User } = models;
                const password = 'Test123';
                const hashedPassword = await User.hashPassword(password);

                expect(hashedPassword).toEqual(expect.any(String));
                expect(hashedPassword).not.toEqual(password);
            });
        });

        describe('comparePasswords', () => {
            it('should return true if hash password matches entered password', async () => {
                const { User } = models;
                const password = 'Test123';
                const hashedPassword = await User.hashPassword(password);
                const arePasswwordsEqual = await User.comparePasswords(password, hashedPassword);

                expect(arePasswwordsEqual).toBeTruthy();
            });

            it('should return false if hash password does not match entered password', async () => {
                const { User } = models;
                const password = 'Test123';
                const hashedPassword = await User.hashPassword(password);
                const arePasswwordsEqual = await User.comparePasswords('WrongPassword', hashedPassword);

                expect(arePasswwordsEqual).toBeFalsy();
            });
        });

        describe('hooks', () => {
            beforeEach(async () => {
                await TestsHelpers.syncDb(); // Before each test, we drop the tables and create new clean ones
            });

            it('should create a user with a hashed password', async () => {
                const { User } = models;
                const email = 'test@email.com';
                const password = 'Test123';
                await User.create({ email, password });
                const users = await User.findAll();

                expect(users.length).toBe(1);
                expect(users[0].email).toEqual(email);
                expect(users[0].email).not.toEqual(password);
            });
        });
    });
});
