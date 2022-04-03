import path from 'path';
import * as cdk from '@aws-cdk/core';
import { Bundler } from 'bundless-core';
import * as lambda from '@aws-cdk/aws-lambda';

export interface LayerOptions {
    code: string;
    layerName: string;
    external?: string[];
    compatibleRuntimes?: lambda.Runtime[];
}

class Defaults {
    static runtimes = [lambda.Runtime.NODEJS_14_X];
}

export class LambdaLayer extends lambda.LayerVersion {
    public assetPath: string;

    public get external(): string {
        return `/opt/${this.props.layerName}`;
    }

    constructor(scope: cdk.Construct, id: string, private props: LayerOptions) {
        const bundler = new Bundler({
            wrap: true,
            name: props.layerName,
            entry: path.resolve(props.code),
            outdir: path.resolve('cdk.out/layers'),
        });

        bundler.bundle();

        super(scope, id, {
            layerVersionName: props.layerName,
            code: lambda.Code.fromAsset(bundler.location),
            compatibleRuntimes: props.compatibleRuntimes || Defaults.runtimes,
        });

        this.assetPath = bundler.location;
    }
}
