import request from 'supertest';
import models from '../../../src/models';
import TestsHelpers from '../../tests-helpers';

describe('register', () => {
    let app;

    beforeAll(async () => {
        await TestsHelpers.startDb();
        app = TestsHelpers.getApp();
    });

    afterAll(async () => {
        await TestsHelpers.stopDb();
    });

    // Clean the database before each test
    beforeEach(async () => {
        await TestsHelpers.syncDb();
    });

    it('should register a new user successfully', async () => {
        await request(app).post('/v1/register').send({ email: 'test@example.com', password: 'Test123' }).expect(200);
        const { User } = models;
        const users = await User.findAll();
        expect(users.length).toEqual(1); // Since we use a clean db each time
        expect(users[0].email).toEqual('test@example.com');
    });

    it('should register a new user with roles successfully', async () => {
        await request(app)
            .post('/v1/register')
            .send({ email: 'test@example.com', password: 'Test123', roles: ['admin', 'customer'] })
            .expect(200);
        const { User, Role } = models;
        const users = await User.findAll({ include: Role });
        const roles = users[0]['Roles'];
        expect(roles.length).toEqual(2);
        expect(roles[0].role).toEqual('admin');
    });

    it('should not register a new user with an existing email', async () => {
        await request(app).post('/v1/register').send({ email: 'test@example.com', password: 'Test123' }).expect(200);
        const response = await request(app)
            .post('/v1/register')
            .send({ email: 'test@example.com', password: 'Test123' })
            .expect(200);
        expect(response.body).toEqual({
            success: false,
            message: 'User already exists',
        });
    });

    it('should not register a new user without a password', async () => {
        const response = await request(app).post('/v1/register').send({ email: 'test@example.com' }).expect(500);
        expect(response.body.success).toBeFalsy();
        expect(response.body.message).toContain('password cannot be null');
    });
});
