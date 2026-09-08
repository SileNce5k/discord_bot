module.exports = function(textArr, extraSpaces=0){
    let maxlen = 0;
    textArr.forEach(text => {
        if(text.length > maxlen) maxlen = text.length;
    });
    maxlen += extraSpaces;

    for(let i = 0; i < textArr.length; i++){
        while(textArr[i].length < maxlen) textArr[i] = `${textArr[i]} `;
    }

    

	return textArr;
}