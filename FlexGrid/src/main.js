import 'bootstrap';
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();
    aurelia.use.plugin('aurelia-breeze');
    aurelia.start().then((a) => a.setRoot());
}
//# sourceMappingURL=main.js.map