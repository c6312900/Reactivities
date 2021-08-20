// import React from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
// import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

// interface props  {
//     activity: Activity;
//     cancelSelectActivity: () => void;
//     openForm: (id:string) => void;
// }

// export default function ActivityDetails({activity,cancelSelectActivity,openForm}: props) {
export default observer(function ActivityDetails() {    
  const {activityStore} = useStore();
  const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
  const {id} = useParams<{id:string}>();
  useEffect(() => {
    if (id) loadActivity(id);
  }, [id,loadActivity]);

  // const {selectedActivity: activity,openForm,cancelSelectActivity} = activityStore;
  if (loadingInitial || !activity) return <LoadingComponent/>

    return (
     <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity}/>
          <ActivityDetailedInfo activity={activity}/>
          <ActivityDetailedChat/>
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar/>
        </Grid.Column>
     </Grid>

  // <Card>
  //   <Image src={`/assert/categoryImages/${activity.category}.jpg`}  />
  //   <Card.Content>
  //     <Card.Header>{activity.title}</Card.Header>
  //     <Card.Meta>
  //       <span >{activity.date}</span>
  //     </Card.Meta>
  //     <Card.Description>
  //       {activity.description}
  //     </Card.Description>
  //   </Card.Content>
  //   <Card.Content extra>
  //     <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit' ></Button>
  //     <Button as={Link} to={'/activities'} basic color='grey' content='Cancel' ></Button>
  //     {/* <Button  onClick={() => openForm(activity.id)} basic color='blue' content='Edit' ></Button>
  //     <Button  onClick={cancelSelectActivity}  basic color='grey' content='Cancel' ></Button> */}

  //   </Card.Content>
  // </Card>
    ) 
})