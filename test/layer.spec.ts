import path from 'path';
import { Stack } from '@aws-cdk/core';
import { LambdaLayer } from '../lib/lambda-layer';

class LayerMock {
    id = 'Util-Layer';
    layerName = 'utilx';
    codePath = 'test/mock/layer/utilx';
    outfilePath = `cdk.out/layers/${this.layerName}`;
    config = {
        code: this.codePath,
        layerName: this.layerName,
    };
}

describe('Lambda Layer Construct', () => {
    let mock: LayerMock;
    let layer: LambdaLayer;

    beforeAll(() => {
        mock = new LayerMock();
        layer = new LambdaLayer(new Stack(), mock.id, mock.config);
    });

    describe('Layer Instance', () => {
        it('lambda layer instance', () => {
            expect(layer.external).toBe(`/opt/${mock.layerName}`);
        });

        it('layer bundle assets outfile', () => {
            expect(layer.assetPath).toBe(`${path.resolve(mock.outfilePath)}.zip`);
        });
    });
});
