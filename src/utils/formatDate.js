const formatDate = function(date, _format, _delimiter){

        if(!_delimiter)
                _delimiter = '-';


        var formatLowerCase=_format.toLowerCase();
        var formatItems=formatLowerCase.split(_delimiter);

        var monthIndex=formatItems.indexOf("mm");
        var dayIndex=formatItems.indexOf("dd");
        var yearIndex=formatItems.indexOf("yyyy");

        //fix moth
        var year = getFullYear();
        var month = date.getMonth() + 1;
        var day = getDate(); 
        var hours = getHours();
        var minutes = getMinutes();
        var seconds = getSeconds();

        var formatedDate = [];
        var formatedTime = [];

        formatedDate[yearIndex] = year;
        formatedDate[monthIndex] = month;
        formatedDate[dayIndex] = day;

        return formatedDate.join(_delimiter);
}

export default formatDate