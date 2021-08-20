//import { SyntheticEvent } from "react";
//import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item,  ItemImage,  Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
//import { useStore } from "../../../app/stores/store";

interface Props {
    activity: Activity
}

export default function ActivityListItem({activity}: Props) {
    //const {activityStore} = useStore();
    // const {deleteActivity,loading} = activityStore;
    // const {deleteActivity} = activityStore;
    // const [target, setTarget] = useState('');
    // const [target, setTarget] = useState('');

    // function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>,id:string) {
    //     setTarget(e.currentTarget.name);
    //     deleteActivity(id)
    // }   
     return (

        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <ItemImage size='tiny' circular  src='/assert/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}  >
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Host by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/>{activity.date}
                    <Icon name='marker'/>{activity.venue} 
                </span>
            </Segment>
            <Segment secondary>
                 Attendes go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                 as={Link} 
                 to={`/activities/${activity.id}`}  
                 color='teal' 
                 floated='right'
                 content='View'
                 />
            </Segment>
        </Segment.Group>

        // <Item key={activity.id}>
        // <ItemContent>
        //     <Item.Header as='a'>{activity.title}</Item.Header>
        //     <Item.Meta>{activity.date}</Item.Meta>
        //     <Item.Description>
        //         <div>{activity.description}</div>
        //          <div>{activity.city},{activity.venue}</div>    
        //     </Item.Description>
        //     <Item.Extra>
        //         {/* <Button onClick= {() => activityStore.selectActivity(activity.id)} floated='right' 
        //                 content='View' color='blue'/> */}
        //          <Button as={Link}  to={`/activities/${activity.id}`}  floated='right' 
        //                 content='View' color='blue'/>
        //         <Button
        //              name={activity.id} 
        //              loading={loading && target === activity.id} 
        //              onClick={(e) => handleActivityDelete(e,activity.id)} 
        //              floated='right'
        //              content='Delete' 
        //              color='red'  /> 
        //         <Label basic content={activity.category}/>
        //     </Item.Extra>
        // </ItemContent>
        // </Item>

     )
}