import { TestBed } from '@angular/core/testing';
import { TopnavModule } from './topnav.module';
describe('TopnavModule', () => {
  let pipe: TopnavModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TopnavModule] });
    pipe = TestBed.get(TopnavModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
