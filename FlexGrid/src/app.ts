import {Router} from "aurelia-router";
export class App {
    router: Router;
    configureRouter(config:any, router:any) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' }
    ]);

    this.router = router;
  }
}
