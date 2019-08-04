import { TestBed } from '@angular/core/testing';
import { SidemenuModule } from './sidemenu.module';
describe('SidemenuModule', () => {
  let pipe: SidemenuModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SidemenuModule] });
    pipe = TestBed.get(SidemenuModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
