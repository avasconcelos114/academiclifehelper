import CompletionCounterModule from './completionCounter';
import CompletionCounterController from './completionCounter.controller';
import CompletionCounterComponent from './completionCounter.component';
import CompletionCounterTemplate from './completionCounter.html';

describe('CompletionCounter', () => {
  let $rootScope, makeController;

  beforeEach(window.module(CompletionCounterModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new CompletionCounterController();
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
      expect(CompletionCounterTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = CompletionCounterComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(CompletionCounterTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(CompletionCounterController);
    });
  });
});
