import 'bootstrap';

export function configure(aurelia:any) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();
    aurelia.use.plugin('aurelia-breeze');

    aurelia.start().then((a:any) => a.setRoot());
}
