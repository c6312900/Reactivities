import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from '../models/Activity';
//import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    // activities: Activity[] = [];
    activityRegistery = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode= false;
    loading= false;
    loadingInitial= true;

    constructor() {
        // makeObservable(this,{
        //     title:observable, 
        //     setTitle: action          
        // })
        makeAutoObservable(this)
    } 

    get activitiesByDate() {
        return Array.from(this.activityRegistery.values()).sort((a, b) => 
         Date.parse(a.date) - Date.parse(b.date))
    }

    get groupedActivities() {
        return Object.entries(
           this.activitiesByDate.reduce((activities,activity) => {
               const date = activity.date
               activities[date] = activities[date] ? [...activities[date],activity] : [activity]
               return activities
           },{} as {[key: string]: Activity[]})
        )
    }

    loadActivities = async () => {
        this.loadingInitial = true
        // this.setLoadingInitail(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
                // activity.date = activity.date.split('T')[0]
                // // this.activities.push(activity);
                // this.activityRegistery.set(activity.id,activity)
            })
            this.setLoadingInitail(false);    
            
        } catch (error) {
            console.log(error);
            this.setLoadingInitail(false);           
        }
    }

    loadActivity = async (id:string) => {
        let activity = this.getActivity(id) 
        if (activity) {
           this.selectedActivity = activity
           return activity
        } else {
            this.loadingInitial = true
            try {
              activity = await agent.Activities.details(id);
              runInAction(() => {
                this.selectedActivity = activity
              })
              this.setActivity(activity);               
              this.setLoadingInitail(false);  
              return activity            
            } catch (error) {
                console.log(error);
                this.setLoadingInitail(false);
            }            
        }
    }
    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistery.set(activity.id,activity);
         // this.activities.push(activity);
    }

    private getActivity = (id:string) => {
          return this.activityRegistery.get(id)
    }


    setLoadingInitail = (state: boolean) => {
        this.loadingInitial = state;
    }  //action
    
    //代表選取哪一個明細,會由ActivityList的Button 的view事件觸發,再傳至ActivityDashboard selectActivity,
    //再傳至App selectActivit,再介接handleSelectActivit去setSelectedActivity,則會有selectedActivity,
    //此時已知哪個Activity被選取
//     selectActivity = (id:string) => {
//         // this.selectedActivity = this.activities.find(a => a.id === id);
//         this.selectedActivity = this.activityRegistery.get(id);
//     }
    
//      //此事件再處理ActivityDetails form 是否開啟,由App的selectedActivity,再至ActivityDashboard selectedActivit,
//     //再傳至ActivityDetails activity去呈現這個畫面的值
//     cancelSelectActivity = () => {
//         this.selectedActivity = undefined;
//     } 

//     //代表開啟ActivityForm(編輯或新增的輸入畫面),還要同時傳入目前的Activity,
//   //此事件在ActivityDetail的button edit事件觸發,透過openForm再傳至ActivityDashboard,再傳至App, 
//   //再由openForm介接handleFormOpen
//   //簡單說openForm再處理ActivityForm(編輯或新增的輸入畫面)的開啟
//     openForm = (id?: string) => {
//         id? this.selectActivity(id) : this.cancelSelectActivity();
//         this.editMode = true;   
//     }
    
//     //代表關閉ActivityForm(編輯或新增的輸入畫面) ,此事件在ActivityForm的button Cancel事件觸發
//     closeForm = () => {
//         this.editMode = false;
//     }


   createActivity = async (activity: Activity) => {
       this.loading = true;
      // activity.id = uuid();
       try {
           await agent.Activities.create(activity);
           runInAction(() => {
            //    this.activities.push(activity);
               this.activityRegistery.set(activity.id, activity)
               this.selectedActivity = activity;
               this.editMode = false;
               this.loading = false;
           })           
       } catch (error) {
           console.log(error)
           runInAction(() => {
               this.loading = false;
            })
       }

   }

   updateActivity = async (activity: Activity) => {
       this.loading = true;
       try{
           await agent.Activities.update(activity);
           runInAction(() => {
            // this.activities = [...this.activities.filter(a => a.id !== activity.id),activity]
            this.activityRegistery.set(activity.id, activity)
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
           })
       } catch(error) {
           console.log(error);
           runInAction(() => {
               this.loading = false;
           })
       }
   }

   deleteActivity = async (id:string) => {
       this.loading = true;
       try {
           await agent.Activities.delete(id);
           runInAction(() => {               
            // this.activities = [...this.activities.filter(a => a.id !== id)];
            this.activityRegistery.delete(id);
            // if (this.selectedActivity?.id === id) this.cancelSelectActivity();
            this.loading = false;
           })         
       } catch (error) {
           console.log(error);
           runInAction(() => {
               this.loading = false;
           })
       }

   }
}