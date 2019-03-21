import { get, post, file } from './Api';
import CONSTANTS from 'src/App.constants';


var url = CONSTANTS.ENDPOINT.API;

const Main = {
	async photo(body) {

        return await file(url+"/profile/photo", body, true);
    },

    async update(items) {
        return await post(url+"/profile/update", items, true);
    },
};

export default Main;