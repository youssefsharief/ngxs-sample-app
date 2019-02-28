import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { FetchData } from 'src/app/shared/shared.actions';
import { ActivitiesState } from './activities.state';
import { ApiService } from 'src/app/core/services/api.service';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteActivity, AddActivity } from './activities.actions';
import { storeStubs } from '__fixtures__/store_stubs';

fdescribe('Activities State', () => {
    let store: Store;
    let apiServiceSpy: jasmine.SpyObj<ApiService>;

    beforeEach(async(() => {
        const spy = jasmine.createSpyObj('ApiService', ['getActivities', 'deleteActivity', 'addActivity' ]);
        TestBed.configureTestingModule({
            imports:
                [
                    NgxsModule.forRoot([ActivitiesState]),
                    SharedModule
                ],
            providers: [
                {provide: ApiService, useValue: spy}
            ]
                
        })
        
        apiServiceSpy = TestBed.get(ApiService);
        store = TestBed.get(Store);

    }));


    describe('fetchData', ()=>{
        it('should have the right info in store', async(() => {
            const a = { id: 65, name: 'b', workflowlevel1: "https://dev-api.toladata.io/api/workflowlevel1/550/" }
            apiServiceSpy.getActivities.and.returnValue(of( [a]));
            store.dispatch(new FetchData());
            store.selectOnce(state => state).subscribe(feed => {
                expect(feed).toEqual({activitiesstate: {activities: [{...a, programId: 550}]}})
            });
        }));
    })

    describe('deleteActivity', ()=>{
        beforeEach(  ()=>{
            store.reset(storeStubs.twoActivities);
        })
        it('should have the right info in store', async(() => {
            apiServiceSpy.deleteActivity.and.returnValue(of( true));
            store.dispatch(new DeleteActivity(65));
            store.selectOnce(state => state).subscribe(feed => {
                expect(feed).toEqual({activitiesstate: {activities: [
                    {id: 59, name: 'trtg', workflowlevel1: "https://dev-api.toladata.io/api/workflowlevel1/33/", programId: 33}
                ]}})
            });
        }));
    })


    describe('addActivity', ()=>{
        beforeEach(  ()=>{
            store.reset({activitiesstate: {activities: [
                {id: 65, name: 'b', workflowlevel1: "https://dev-api.toladata.io/api/workflowlevel1/550/", programId: 550},
                {id: 59, name: 'trtg', workflowlevel1: "https://dev-api.toladata.io/api/workflowlevel1/33/", programId: 33}
            ]}});
        })
        it('should have the right info in store', async(() => {
            apiServiceSpy.addActivity.and.returnValue(of( {name: 'a', id: 446, programId: 33}));
            
            store.dispatch(new AddActivity({name: 'a', id: 446, programId: 33}, 88));
            store.selectOnce(state => state).subscribe(feed => {
                expect(feed.activitiesstate.activities.length).toBe(3)
            });
        }));
    })


});