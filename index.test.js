const request = require('supertest')
const app = require('./index')


describe('Registration Tests /POST', () => {
    it('Valid Registration', () => {
        return request(app)
            .post('/register').send({
                email: "testingemail@gmail.com",
                password: "testing"
            }).expect(200)
    });

    it('Invalid Email', () => {
        return request(app).post('/register').send({
            email: "testinggmailcom",
            password: "testing"
        }).expect(400).expect('"email" must be a valid email')
    });
    it('Invalid Password', () => {
        return request(app).post('/register').send({
            email: "testing@gmailcom",
            password: ""
        }).expect(400)
    });
});

describe('Login Tests /POST', () => {
    it('Valid Login', () => {
        return request(app).post('/login').send({
            email: "testingemail@gmail.com",
            password: "testing"
        }).expect(200)
    });
    it('Invalid Email', () => {
        return request(app).post('/login').send({
            email: "testinggmail.com",
            password: "testing"
        }).expect(400)
    });
    it('Invalid Password', () => {
        return request(app).post('/login').send({
            email: "testing@gmail.com",
            password: ""
        }).expect(400)
    });
});

describe('Reservation Tests /PATCH', () => {
    it('Valid Reservation', () => {

        return request(app).patch('/seat/reserve').send({
            "seatNumber": 35,
            "passengerPhone": 1238470572,
            "passengerName": "testingname",
            "passengerAge": 25,
        })
        .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjI3ZjdmODEzMjdkNWNiYWQzNWMzNzEiLCJpYXQiOjE2NDY3ODY1NTh9.nrXaJ0cH5SuUOtMgE5oum7AefoGAtt2CVxd-qxTxbhs')
        .expect(200)
        
    });

    it('Try to access /seat/reserve without being logged in', () => {
        return request(app).patch('/seat/reserve').send({
            "seatNumber": 20,
            "passengerPhone": 1238470572,
            "passengerName": "testingname",
            "passengerAge": 25,
        })
        .expect(401).expect('Access Denied')
        
    })
});

describe('Reset Test /PATCH', () => {

    it('Unauthorized reset attempt', () => {
        return request(app).patch('/seat/reset').expect(401)
    })

    it('Reset all reservations with admin login and token', () => {
        return request(app).patch('/seat/reset')
        .set('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjI3ZmU3MWM1Y2JiOGM1MTQ3Mzg0NzQiLCJpYXQiOjE2NDY3ODgyMTd9.B0mbJ7U3FV2OedRNuWigUHAKj-R8c7cxSmCS7ubrKZk')
        .expect(200)
    })
})