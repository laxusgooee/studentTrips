import { get, post, file } from './Api';
import CONSTANTS from 'src/App.constants';


var url = CONSTANTS.ENDPOINT.API;

const Bookings = {
	async find(params) {
        return await get(url+"/posts", true, params);
    },

	async terminals(params) {
        return await get(url+"/booking/terminals", true, params);
    },
};

export default Bookings;