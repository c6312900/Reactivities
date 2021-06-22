import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/Activity';

interface props  {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id:string) => void;
}

export default function ActivityDetails({activity,cancelSelectActivity,openForm}: props) {
    
    return (
  <Card>
    <Image src={`/assert/categoryImages/${activity.category}.jpg`}  />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span >{activity.date}</span>
      </Card.Meta>
      <Card.Description>
        {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button  onClick={() => openForm(activity.id)} basic color='blue' content='Edit' ></Button>
      <Button  onClick={cancelSelectActivity}  basic color='grey' content='Cancel' ></Button>
    </Card.Content>
  </Card>
    ) 
}