import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
// import { Activity } from '../../../app/models/Activity';

// interface props {
//   // activity: Activity | undefined;
//   // closeForm: () => void;
//   createOrEdit : (activity: Activity) => void;
//   submitting: boolean;
// }

// export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit,submitting}:props) {
export default observer(function ActivityForm() {
  const history = useHistory();
  const {activityStore} = useStore();  
  // const {selectedActivity,createActivity,updateActivity,loading,loadActivity,loadingInitial} = activityStore;
  const {createActivity,updateActivity,
        loading,loadActivity,loadingInitial} = activityStore;
 
  const {id} = useParams<{id:string}>()  //去網址列取得參數id的值
  const [activity,setActivity] = useState({
    id:'',
    title:'',
    date:'',
    description:'',
    category:'',
    city: '',
    venue: ''
  });

  useEffect(() => {
     if (id)  loadActivity(id).then((activity) => setActivity(activity!))

  },[id,loadActivity])
  
  // const {selectedActivity,closeForm,createActivity,updateActivity,loading} = activityStore;
  // ?? 是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧selectedActivitye操作数
    // const initialState = selectedActivity ?? {
      // id:'',
      // title:'',
      // date:'',
      // description:'',
      // category:'',
      // city: '',
      // venue: ''
    // }
   
    // const [activity,setActivity] = useState(initialState);
    

    function handleSubmit() {
      if (activity.id.length === 0) {
        let newActivity = {
          ...activity,
          id: uuid()
        };
        createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`) ) 
      } else {
        updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))  
      }
      // activity.id? updateActivity(activity) : createActivity(activity) ;
      // createOrEdit(activity);
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
      const {name,value} =event.target;
      setActivity({...activity,[name]:value});      
    }
    
    if (loadingInitial) return <LoadingComponent content='loading activity....'/>

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
          <Button as={Link} to="/activities" floated='right' type='button'  content='Cancel'/>
          {/* <Button onClick={closeForm} floated='right' type='button'  content='Cancel'/> */}
          </Form>
        </Segment>
    )
})