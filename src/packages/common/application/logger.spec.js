'use strict';

const sinon = require('sinon');
const should = require('should');

const Logger = require('./logger');

describe('src/packages/common/application/logger.spec.js', () => {
    describe('Logger', () => {
        const sandbox = sinon.createSandbox();

        /** @type {Logger} */
        const logger = new Logger();

        before(() => {
            sandbox.stub(logger, 'info').returns();
            sandbox.stub(logger, 'error').returns();
        });

        after(() => {
            sandbox.restore();
        });

        describe('create', () => {
            it('should return an instance of Logger', () => {
                const logger = Logger.create();
                should(logger).be.instanceOf(Logger);
            });
        });

        describe('info', () => {
            it('should log an info message', () => {
                logger.info('This is an info message');

                should(logger.info.calledOnce).be.true();
                should(logger.info.calledWith('This is an info message')).be.true();
            });
        });

        describe('error', () => {
            it('should log an error message', () => {
                logger.error('This is an error message');

                should(logger.error.calledOnce).be.true();
                should(logger.error.calledWith('This is an error message')).be.true();
            });
        });
    });
});