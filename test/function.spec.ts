import path from 'path';
import { Stack } from '@aws-cdk/core';
import { LambdaFunction } from '../lib/lambda-function';

class FunctionMock {
    id = 'Util-Function';
    functionName = 'nodeDepFunction';
    codePath = 'test/mock/functions/nodeDepFunction';
    config = {
        code: this.codePath,
        functionName: this.functionName,
    };
    outfilePath = `cdk.out/functions/${this.functionName}`;
}

describe('Lambda Function Construct', () => {
    let lambdafunction: LambdaFunction;
    let mock: FunctionMock;

    beforeAll(() => {
        mock = new FunctionMock();
        lambdafunction = new LambdaFunction(new Stack(), mock.id, mock.config);
    });

    describe('Function Instance', () => {
        it('function bundle assets outfile', () => {
            const outfile = path.resolve(mock.outfilePath);
            expect(lambdafunction.assetPath).toBe(`${outfile}.zip`);
        });

        it('instance node id', () => {
            expect(lambdafunction.node.id).toBe(mock.id);
        });
    });
});
