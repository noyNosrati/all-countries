import { declareEvents } from "./countriesForm.js";
import { doApi ,getQueryString } from "./countriesInfo.js";
import{declareBtns} from "./burger.js";

const init = () => { 
    declareBtns();
    declareEvents();
    getQueryString();
}

init();