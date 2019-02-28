import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddActivityComponent } from './add-activity.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivityFormComponent } from '../activity-form/activity-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivitiesState } from '../activities.state';
import { ProgramsState } from '../../programs/programs.state';
import { NgxsModule, Store } from '@ngxs/store';
import { SharedState } from 'src/app/shared/shared.state';
import { ApiService } from 'src/app/core/services/api.service';
import { of } from 'rxjs';
import { FetchData } from 'src/app/shared/shared.actions';

describe('AddActivityComponent', () => {
    let component: AddActivityComponent;
    let fixture: ComponentFixture<AddActivityComponent>;
    let store: Store;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BsDatepickerModule.forRoot(),
                RouterTestingModule,
                SharedModule,
                NgxsModule.forRoot([ActivitiesState, ProgramsState, SharedState])
            ],
            declarations: [AddActivityComponent, ActivityFormComponent],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            params: {
                                programId: 1
                            }
                        },
                    }
                }, 

            ]
        });
        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
        fixture = TestBed.createComponent(AddActivityComponent);
        apiServiceSpy = TestBed.get(ApiService);
        component = fixture.componentInstance;
        fixture.detectChanges();
        const payload = { programs: [{ id: 1, name: 'a' }], activities: [{ id: 65, name: 'b' }] };
        const action = new FetchData();
        store.dispatch(action);
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display program name', () => {
        // apiServiceSpy.getPrograms.and.returnValue(of([]));
        // apiServiceSpy.getActivities.and.returnValue(of([]));
        // component.programName$.subscribe(data => {
        //     expect(data).toBe('a');
        // });
    });

});
