import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import  ActivityList  from './ActivityList';
// import ActivityDetails from '../details/ActivityDetails';
// import ActivityForm from '../form/ActivityForm';
// import { Activity } from '../../../app/models/Activity';


// interface Props {
//     activities: Activity[];
//     // selectedActivity: Activity | undefined;
//     // selectActivity: (id:string) => void;
//     // cancelSelectActivity: () => void;
//     // editMode: boolean;
//     // openForm: (id:string) => void;
//     // closeForm: () => void;
//     // createOrEdit: (activity: Activity) => void ;
//      deleteActivity: (id:string) => void;
//      submitting: boolean;
// }

// export default function ActivityDashboard({activities,selectedActivity,deleteActivity,
//     selectActivity,cancelSelectActivity,editMode,openForm,closeForm,createOrEdit,submitting}: Props) {
export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistery} = activityStore;
    // const {selectedActivity,editMode} = activityStore

    useEffect(() =>{
      if (activityRegistery.size <= 1)  loadActivities();
      },[activityRegistery.size,loadActivities])

    if (activityStore.loadingInitial) return <LoadingComponent content='loading app' /> 

    return (
          <Grid>
              <Grid.Column width='10'>
              {/* <List>
                 {activities.map(activity => (
                  <List.Item key = {activity.id} >
                     {activity.title}
                  </List.Item>
                ))}
              </List> */}
               <ActivityList // activities={activities} 
                            //  selectActivity={selectActivity} 
                            //  deleteActivity={deleteActivity}  
                            //  submitting={submitting}
                            />              
              </Grid.Column>

              <Grid.Column width='6'>
                <ActivityFilters/>
                  {/* { selectedActivity &&  !editMode &&
                  <ActivityDetails 
                    //    activity={selectedActivity} 
                    //    cancelSelectActivity={cancelSelectActivity}
                    //    openForm={openForm}
                       />  }

                 { editMode &&
                  <ActivityForm // submitting={submitting} 
                                // closeForm={closeForm} 
                                // activity={selectedActivity} 
                               // createOrEdit={createOrEdit} 
                                />  }                              */}
              </Grid.Column>
          </Grid>
    )
})
