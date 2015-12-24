/**
* Global settings/constants
*/
let urlsForDevelopement = {
    serviceName: "http://localhost:58889/breeze/data"
};
let urlsForProduction = {
    serviceName: "http://iisprod/edimetadata/breeze/data"
};
var Urls;
if (window.location.hostname === 'localhost') {
    Urls = urlsForDevelopement;
}
else {
    Urls = urlsForProduction;
}
export default Urls;
//# sourceMappingURL=urls.js.map