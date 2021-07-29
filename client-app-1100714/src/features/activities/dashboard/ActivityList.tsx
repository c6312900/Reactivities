import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { Button, Item, ItemContent, Label, Segment } from 'semantic-ui-react';
// import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';

// interface Props {
//     activities: Activity[];
//     // selectActivity: (id:string) => void;
//     deleteActivity: (id:string) => void;
//     submitting: boolean;
// }

// export default function ActivityList({activities,selectActivity,deleteActivity,submitting}: Props) {
export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {deleteActivity,activitiesByDate,loading} = activityStore;
    const [target, setTarget] = useState('');

    function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id)
    }   
    
    return (
        <Segment>
           <Item.Group divided>
               {
                   activitiesByDate.map(activity => (
                       <Item key={activity.id}>
                           <ItemContent>
                               <Item.Header as='a'>{activity.title}</Item.Header>
                               <Item.Meta>{activity.date}</Item.Meta>
                               <Item.Description>
                                   <div>{activity.description}</div>
                                    <div>{activity.city},{activity.venue}</div>    
                               </Item.Description>
                               <Item.Extra>
                                   <Button onClick= {() => activityStore.selectActivity(activity.id)} floated='right' 
                                           content='View' color='blue'/>
                                   <Button
                                        name={activity.id} 
                                        loading={loading && target === activity.id} 
                                        onClick={(e) => handleActivityDelete(e,activity.id)} 
                                        floated='right'
                                        content='Delete' 
                                        color='red'  /> 
                                   <Label basic content={activity.category}/>
                               </Item.Extra>
                           </ItemContent>
                       </Item>

                   ))
               }

           </Item.Group>
        </Segment>
    )
})