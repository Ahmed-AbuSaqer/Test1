const app = require('../app');
const request = require('supertest');
const {response} = require("express");

describe("Message Reversal", () => {
    test("should reverse a message", async () => {
        const response = await request(app)
            .post('/reverse')
            .send({"message": "Hello"});
        expect(response.status).toBe(200);
        expect(response.body.reversedMessage).toBe("olleH");
    })
})

describe('Validation Middleware', () => {
    test('should reject requests with empty message', async () => {
        const response = await request(app)
            .post('/reverse')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Message field should not be empty');
    });
    test("should reject requests with messages exceeding t 10 characters", async () => {
        const response = await request(app)
            .post('/reverse')
            .send({"message":"this is a long message"})
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Message length exceeds the limit of 10 characters")
    })
});