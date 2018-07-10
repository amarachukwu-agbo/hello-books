import Enzyme from 'enzyme';
import $ from 'jquery';
import Adapter from 'enzyme-adapter-react-16';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.$ = $;
global.jQuery = $;
global.localStorage = new LocalStorageMock();

Enzyme.configure({
  adapter: new Adapter(),
});
