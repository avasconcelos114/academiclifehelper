import CompletionChartsModule from './completionCharts';
import CompletionChartsController from './completionCharts.controller';
import CompletionChartsComponent from './completionCharts.component';
import CompletionChartsTemplate from './completionCharts.html';

describe('CompletionCharts', () => {
  let $rootScope, makeController;

  beforeEach(window.module(CompletionChartsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new CompletionChartsController();
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
      expect(CompletionChartsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = CompletionChartsComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(CompletionChartsTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(CompletionChartsController);
    });
  });
});
