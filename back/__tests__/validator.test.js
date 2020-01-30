const validator = require('../functions/validator.js')

describe('validator', () => {
    test('resturn ok with status 200', ()=> {
        const text = 'My first comment';
        const badWords = [{word:'shit', level:1}];
        const result = validator(text, badWords);
        return expect(result).resolves.toEqual({status: 200});
    });

    test('resturn Not Aceptable with status 406', ()=> {
        const text = 'This is a shit';
        const badWords = [{word:'shit', level:1}];
        const result = validator(text, badWords);
        return expect(result).rejects.toEqual('This comment include dirty words and the level is 1')
    });
});