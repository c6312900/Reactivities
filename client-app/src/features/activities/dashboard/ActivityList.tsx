import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
// import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

// interface Props {
//     activities: Activity[];
//     // selectActivity: (id:string) => void;
//     deleteActivity: (id:string) => void;
//     submitting: boolean;
// }

// export default function ActivityList({activities,selectActivity,deleteActivity,submitting}: Props) {
export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;
    // const {activitiesByDate} = activityStore;
    //const {deleteActivity,activitiesByDate,loading} = activityStore;
    // const [target, setTarget] = useState('');

    // function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string) {
    //     setTarget(e.currentTarget.name);
    //     deleteActivity(id)
    // }   
    
    return (
        <>    
        {/* //group表示日期,activities表示Activity[] */}
        {groupedActivities.map(([group,activities]) => (
            <Fragment key={group}>
                <Header sub color='teal'>{group}</Header>
                {
                   activities.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity}  />
                      ))} 
                {/* <Segment>
                    <Item.Group divided>
                    {
                      activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity}  />
                      ))} 
                    </Item.Group>
                </Segment> */}
            </Fragment>
        ))}
       </> 
        // <Segment>
        //    <Item.Group divided>
        //        {
        //            activitiesByDate.map(activity => (
        //                   <ActivityListItem key={activity.id} activity={activity}  />
        //             //    <Item key={activity.id}>
        //             //        <ItemContent>
        //             //            <Item.Header as='a'>{activity.title}</Item.Header>
        //             //            <Item.Meta>{activity.date}</Item.Meta>
        //             //            <Item.Description>
        //             //                <div>{activity.description}</div>
        //             //                 <div>{activity.city},{activity.venue}</div>    
        //             //            </Item.Description>
        //             //            <Item.Extra>
        //             //                {/* <Button onClick= {() => activityStore.selectActivity(activity.id)} floated='right' 
        //             //                        content='View' color='blue'/> */}
        //             //                 <Button as={Link}  to={`/activities/${activity.id}`}  floated='right' 
        //             //                        content='View' color='blue'/>
        //             //                <Button
        //             //                     name={activity.id} 
        //             //                     loading={loading && target === activity.id} 
        //             //                     onClick={(e) => handleActivityDelete(e,activity.id)} 
        //             //                     floated='right'
        //             //                     content='Delete' 
        //             //                     color='red'  /> 
        //             //                <Label basic content={activity.category}/>
        //             //            </Item.Extra>
        //             //        </ItemContent>
        //             //    </Item>

        //            ))
        //        }

        //    </Item.Group>
        // </Segment>
    )
})