const isEmpty = function(text){
    return (text == '' || text == ' ' || !text || typeof text === 'undefined' || !text );
}

export default isEmpty