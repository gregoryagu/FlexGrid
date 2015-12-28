/**
* Global settings/constants
*/
let urlsForDevelopement: any = {
    serviceName: "http://localhost:9000/breeze/data"
};

let urlsForProduction: any = {
    serviceName: "http://iisprod/edimetadata/breeze/data"
};


var Urls: any;
if (window.location.hostname === 'localhost') {
    Urls = urlsForDevelopement;
}
else {
    Urls = urlsForProduction;
}


export default Urls;