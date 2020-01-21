var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var passport = require('passport');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('it should get user account from the API', function () {
  it('should be able to access passport authenticate', function () {
    // configure request and response
    var mockReq = {
      body: {
        email: 'johndoe@email.com',
        password: 'testPass'
      },
      logIn: function () {}
    };

    var mockRes = {};

    // configure request-promise
    var requestPromiseStub = sinon.stub();

    requestPromiseStub
      .onCall(0).returns(Promise.resolve({
        userId: 138
      }))
      .onCall(1).returns(Promise.resolve({
        userName: 'johndoe',
        status: 0
      }));

    var overrides = {
      'request-promise': requestPromiseStub
    };
    proxyquire('./passport.js', overrides)();
    passport.authenticate('local')(mockReq, mockRes);

    // ASSERTS HERE
    //expect(requestPromiseStub).to.have.been.called();
 });
});