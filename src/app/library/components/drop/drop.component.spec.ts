import { TestBed, async } from '@angular/core/testing';
import { DropComponent } from './drop.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InkColorPickerService } from '@services/color-picker.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgxsModule } from '@ngxs/store';
import { DropsState } from '@store/states';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'environments/environment';

describe('DropComponenet', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        OverlayModule,
        NgxsModule.forRoot([DropsState])
      ],
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
