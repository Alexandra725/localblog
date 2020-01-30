
function validator(text, badWords) {

    return new Promise((resolve, reject) =>{
        for (let i = 0; i < badWords.length; i++) {
            if(text.includes(badWords[i].word)){
                reject('This comment include dirty words and the level is '+ badWords[i].level);
            }
        }
        resolve({status:200});
    });
}

module.exports = validator;