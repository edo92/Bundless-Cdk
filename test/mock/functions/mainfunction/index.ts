import { Util } from '/opt/utilx';

export const handler = async (event: any) => {
    console.log('---->>', Util.uuid(12));

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: 'helloXX',
    };
};
