import path from 'path';
import * as cdk from '@aws-cdk/core';
import { Bundler } from 'bundless-core';
import * as lambda from '@aws-cdk/aws-lambda';
import { LambdaLayer } from '../lambda-layer';

interface FunctionOptions {
    handler?: string;
    runtime?: lambda.Runtime;
    layers?: LambdaLayer[];
}

export interface FunctionProps extends FunctionOptions {
    code: string;
    functionName: string;
}

class Defaults {
    static handler = 'index.handler';
    static runtime = lambda.Runtime.NODEJS_14_X;
}

export class LambdaFunction extends lambda.Function {
    public assetPath: string;

    constructor(scope: cdk.Construct, id: string, props: FunctionProps) {
        const bundler = new Bundler({
            name: props.functionName,
            wrap: false,
            entry: path.resolve(props.code),
            outdir: path.resolve('cdk.out/functions'),
            builder: { external: props.layers?.map(({ external }) => external) },
        });

        bundler.bundle();

        super(scope, id, {
            layers: props.layers || [],
            functionName: props.functionName,
            code: lambda.Code.fromAsset(bundler.location),
            handler: props.handler || Defaults.handler,
            runtime: props.runtime || Defaults.runtime,
        });

        this.assetPath = bundler.location;
    }
}
