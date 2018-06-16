import { TestBed, async } from '@angular/core/testing';
import { DropComponent } from './drop.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InkColorPickerService } from '@services/color-picker.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgxsModule } from '@ngxs/store';
import { DropsState } from '@store/states';

describe('DropComponenet', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [OverlayModule, NgxsModule.forRoot([DropsState])],
      declarations: [DropComponent],
      providers: [InkColorPickerService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should be initialized', async () => {
    const fixure = TestBed.createComponent(DropComponent);
    const comp = fixure.componentInstance;
    expect(comp).toBeTruthy();
  });
});
