'use strict';

const sinon = require('sinon');
const should = require('should');

const ExceptionHandler = require('./exception-handler');

describe('src/packages/common/application/exception-handler.js', () => {
    const sandbox = sinon.createSandbox();

    describe('create', () => {
        it('should return an instance of ExceptionHandler', () => {
            const exceptionHandler = ExceptionHandler.create();
            exceptionHandler.should.be.instanceOf(ExceptionHandler);
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('handle', () => {
        let req, res, next;

        beforeEach(() => {
            req = {};
            res = {
                status: sandbox.stub().returnsThis(),
                json: sandbox.spy()
            };
            next = sandbox.spy();
        });

        it('should set status code and status correctly and return JSON response', () => {
            const err = new Error('Test error');
            err.statusCode = 400;
            err.status = 'fail';

            ExceptionHandler.handle(err, req, res, next);

            should(res.status.calledOnceWith(400)).be.true();
            should(res.json.calledOnceWith({
                status: 'fail',
                message: 'Test error',
            })).be.true();
        });

        it('should set default status code and status if not provided', () => {
            const err = new Error('Another test error');

            ExceptionHandler.handle(err, req, res, next);

            should(res.status.calledOnceWith(500)).be.true();
            should(res.json.calledOnceWith({
                status: 'error',
                message: 'Another test error',
            })).be.true();
        });
    });
});
