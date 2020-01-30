const request = require('supertest');
const express = require('express');
const router = express.Router();


describe("GET /posts ", () => {
    test("It should respond with an array of posts", () => {
        const response =  request(router).get("/posts");
        expect(response.body).toEqual();
    });
});