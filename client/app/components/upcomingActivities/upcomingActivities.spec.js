import UpcomingActivitiesModule from './upcomingActivities';
import UpcomingActivitiesController from './upcomingActivities.controller';
import UpcomingActivitiesComponent from './upcomingActivities.component';
import UpcomingActivitiesTemplate from './upcomingActivities.html';

describe('UpcomingActivities', () => {
  let $rootScope, makeController;

  beforeEach(window.module(UpcomingActivitiesModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new UpcomingActivitiesController();
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
      expect(UpcomingActivitiesTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = UpcomingActivitiesComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(UpcomingActivitiesTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(UpcomingActivitiesController);
    });
  });
});
