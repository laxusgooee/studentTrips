import isEmpty from './isEmpty';
import ucFirst from './ucFirst';
import formatDate from './formatDate';
import generateRandomNumber from './generateRandomNumber';

const Util = {
	formatDate: formatDate,
	generateRandomNumber: generateRandomNumber,
	isEmpty: isEmpty,
	ucFirst: ucFirst
}

//exports
export { formatDate, generateRandomNumber, isEmpty, ucFirst };

export default Util;