'use strict';

const sinon = require('sinon');

const Exception = require('./exception');

describe('src/packages/common/application/exception.js', () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => {
        sandbox.restore();
    });

    describe('InvalidPayloadError', () => {
        it('should return an instance of InvalidPayloadError', () => {
            const error = new Exception.InvalidPayloadError('Test error');
            error.should.be.instanceOf(Exception.InvalidPayloadError);
            error.message.should.be.eql('Test error');
        });
    });

    describe('NotFoundError', () => {
        it('should return an instance of NotFoundError', () => {
            const error = new Exception.NotFoundError('Test error');
            error.should.be.instanceOf(Exception.NotFoundError);
            error.message.should.be.eql('Test error');
        });
    });

    describe('BusinessLogicError', () => {
        it('should return an instance of BusinessLogicError', () => {
            const error = new Exception.BusinessLogicError('Test error');
            error.should.be.instanceOf(Exception.BusinessLogicError);
            error.message.should.be.eql('Test error');
        });
    });

    describe('UnauthorizedError', () => {
        it('should return an instance of UnauthorizedError', () => {
            const error = new Exception.UnauthorizedError('Test error');
            error.should.be.instanceOf(Exception.UnauthorizedError);
            error.message.should.be.eql('Test error');
        });
    });

    describe('InternalServerError', () => {
        it('should return an instance of InternalServerError', () => {
            const error = new Exception.InternalServerError('Test error');
            error.should.be.instanceOf(Exception.InternalServerError);
            error.message.should.be.eql('Test error');
        });
    });
});