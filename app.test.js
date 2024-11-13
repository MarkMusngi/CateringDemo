const app = require('./app.js');
const request = require('supertest');
const { connectToDatabase,disconnectFromDatabase, getDb } = require('./routes/db');

describe('insert', () => {
  beforeAll(async () => {
    await connectToDatabase(); // Ensure the database connection is established
  });
  afterAll(async () => {
    await disconnectFromDatabase(); // Disconnect from the database
  });

  describe("POST /user_login_checker", () => {
    describe("Given a correctt username and password", () => {
      test("should redirect the user to /user_main", async () => {
        const response = await request(app).post("/user_login_checker").send({
          user_email: "cnjerald@gmail.com",
          user_pass: "1234"
        });
        expect(response.header.location).toBe('/user_main');
      });
    });
  });

  describe("POST /user_login_checker", () => {
    describe("Given an incorrect username and password", () => {
      test("Should send a response message Username or password is invalid", async () => {
        const response = await request(app).post("/user_login_checker").send({
          user_name: "Hello",
          user_pass: "WorldSSS"
        });
        expect(response.text).toContain('Username or password is invalid');
      });
    });
  });
});
