import HomeHeroModule from './homeHero';
import HomeHeroController from './homeHero.controller';
import HomeHeroComponent from './homeHero.component';
import HomeHeroTemplate from './homeHero.html';

describe('HomeHero', () => {
  let $rootScope, makeController;

  beforeEach(window.module(HomeHeroModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new HomeHeroController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(HomeHeroTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = HomeHeroComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(HomeHeroTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(HomeHeroController);
    });
  });
});
