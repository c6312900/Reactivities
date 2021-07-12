import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
// import { Activity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';

// interface props {
//   // activity: Activity | undefined;
//   // closeForm: () => void;
//   createOrEdit : (activity: Activity) => void;
//   submitting: boolean;
// }

// export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit,submitting}:props) {
export default observer(function ActivityForm() {
  const {activityStore} = useStore();  
  const {selectedActivity,closeForm,createActivity,updateActivity,loading} = activityStore;

  // ?? 是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧selectedActivitye操作数
    const initialState = selectedActivity ?? {
      id:'',
      title:'',
      date:'',
      description:'',
      category:'',
      city: '',
      venue: ''
    }

    const [activity,setActivity] = useState(initialState);

    function handleSubmit() {
      activity.id? updateActivity(activity) : createActivity(activity) ;
      // createOrEdit(activity);
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
      const {name,value} =event.target;
      setActivity({...activity,[name]:value});      
    }

    return (
        <Segment clearing>
          <Form onSubmit={handleSubmit} autoComplete='off'>
          <Form.Input  placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}  />
          <Form.TextArea  placeholder='Description'  value={activity.description} name='description' onChange={handleInputChange} />
          <Form.Input  placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
          <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
          <Form.Input  placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
          <Form.Input  placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
          {/* <Button loading={submitting} floated='right' positive type='submit'  content='Submit'/> */}
          <Button loading={loading} floated='right' positive type='submit'  content='Submit'/>
          <Button onClick={closeForm} floated='right' type='button'  content='Cancel'/>
          </Form>
        </Segment>
    )
})