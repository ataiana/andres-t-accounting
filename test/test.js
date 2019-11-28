const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

describe('RestApi test', () => {
    // POST transaction
    it('Only accept numbers for amounts', (done) => {
        chai.request(app)
            .post('/transaction')
            .send({ type: 'credit', amount: 'as' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.success).to.equals(false);
                expect(res.body.result).to.equals(`Transaction's amount must be a number`);
                done();
            });
    });
    it('Only accept valid transactions (credit/debit)', (done) => {
        chai.request(app)
            .post('/transaction')
            .send({ type: 'balance', amount: 10 })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.success).to.equals(false);
                expect(res.body.result).to.equals(`Transaction's type must be either 'credit' or 'debit'`);
                done();
            });
    });
    it('New 10u$d credit', (done) => {
        chai.request(app)
            .post('/transaction')
            .send({ type: 'credit', amount: 10 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equals(true);
                expect(res.body.result.type).to.equals('credit');
                expect(res.body.result.amount).to.equals(10);
                done();
            });
    });
    it('New 35u$d credit', (done) => {
        chai.request(app)
            .post('/transaction')
            .send({ type: 'credit', amount: 35 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equals(true);
                expect(res.body.result.type).to.equals('credit');
                expect(res.body.result.amount).to.equals(35);
                done();
            });
    });
    it('New 5u$d debit', (done) => {
        chai.request(app)
            .post('/transaction')
            .send({ type: 'debit', amount: 5 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equals(true);
                expect(res.body.result.type).to.equals('debit');
                expect(res.body.result.amount).to.equals(5);
                done();
            });
    });

    // GET Balance
    it('Balance should be 40 u$d', (done) => {
        chai.request(app)
            .get('/transaction/balance')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equals(true);
                expect(res.body.result).to.equals(40);
                done();
            });
    });

    // GET transaction
    it('We should get all transactions', (done) => {
        chai.request(app)
            .get('/transaction')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equals(true);
                expect(res.body.result.length).to.equals(3);
                expect(res.body.result[0].type).to.equals('credit');
                expect(res.body.result[0].amount).to.equals(10);
                expect(res.body.result[1].type).to.equals('credit');
                expect(res.body.result[1].amount).to.equals(35);
                expect(res.body.result[2].type).to.equals('debit');
                expect(res.body.result[2].amount).to.equals(5);
                done();
            });
    });
    // GET transaction/1
    it('We should get transaction with id = 1', (done) => {
        chai.request(app)
            .get('/transaction/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equals(true);
                expect(res.body.result.type).to.equals('credit');
                expect(res.body.result.amount).to.equals(10);
                done();
            });
    });
});
