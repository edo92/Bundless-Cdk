export const handler = async (_: any) => {
    console.log('-----tesitng');

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: 'helloXX',
    };
};
