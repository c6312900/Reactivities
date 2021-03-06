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
    
    //???????????????????????????,??????ActivityList???Button ???view????????????,?????????ActivityDashboard selectActivity,
    //?????????App selectActivit,?????????handleSelectActivit???setSelectedActivity,?????????selectedActivity,
    //??????????????????Activity?????????
//     selectActivity = (id:string) => {
//         // this.selectedActivity = this.activities.find(a => a.id === id);
//         this.selectedActivity = this.activityRegistery.get(id);
//     }
    
//      //??????????????????ActivityDetails form ????????????,???App???selectedActivity,??????ActivityDashboard selectedActivit,
//     //?????????ActivityDetails activity???????????????????????????
//     cancelSelectActivity = () => {
//         this.selectedActivity = undefined;
//     } 

//     //????????????ActivityForm(??????????????????????????????),???????????????????????????Activity,
//   //????????????ActivityDetail???button edit????????????,??????openForm?????????ActivityDashboard,?????????App, 
//   //??????openForm??????handleFormOpen
//   //?????????openForm?????????ActivityForm(??????????????????????????????)?????????
//     openForm = (id?: string) => {
//         id? this.selectActivity(id) : this.cancelSelectActivity();
//         this.editMode = true;   
//     }
    
//     //????????????ActivityForm(??????????????????????????????) ,????????????ActivityForm???button Cancel????????????
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