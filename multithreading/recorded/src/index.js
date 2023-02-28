import View from "./view.js";
import Service from "./service.js";
import Controller from "./controller.js";

const worker = new Worker('./src/worker.js', {
  type: "module"
});

worker.postMessage('hey dude!');

Controller.init({
  view: new View(),
  worker,
  service: new Service(),
})