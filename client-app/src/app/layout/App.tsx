import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]); 
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false)
  const [loading,setLoading] = useState(true)
  const [submitting,setSubmitting] = useState(false) 

  useEffect(() =>{
      // axios.get<Activity[]>('http://localhost:5000/api/activities').then(response =>{
      //   setActivities(response.data);
      // })
     agent.Activities.list().then(response => {
       let activities: Activity[] = [];
       response.forEach(activity => {
         activity.date = activity.date.split('T')[0];
         activities.push(activity);
       })
       setActivities(activities); 
       setLoading(false);     
       // setActivities(response);
     })
  },[])
  
  //代表選取哪一個明細,會由ActivityList的Button 的view事件觸發,再傳至ActivityDashboard selectActivity,
  //再傳至App selectActivit,再介接handleSelectActivit去setSelectedActivity,則會有selectedActivity,
  //此時已知哪個Activity被選取
  function handleSelectActivity(id:string) {
    setSelectedActivity(activities.find(x =>x.id === id));
  } 
  
  //此事件再處理ActivityDetails form 是否開啟,由App的selectedActivity,再至ActivityDashboard selectedActivit,
  //再傳至ActivityDetails activity去呈現這個畫面的值
  function handleCancleSelectActivity() {
    setSelectedActivity(undefined);
  }

  //代表開啟ActivityForm(編輯或新增的輸入畫面),還要同時傳入目前的Activity,
  //此事件在ActivityDetail的button edit事件觸發,透過openForm再傳至ActivityDashboard,再傳至App, 
  //再由openForm介接handleFormOpen
  //簡單說openForm再處理ActivityForm(編輯或新增的輸入畫面)的開啟
  function handleFormOpen(id?:string) {
    id? handleSelectActivity(id) : handleCancleSelectActivity() ; 
    setEditMode(true);
  }

  function handleFormClose() {  
    setEditMode(false);  //代表關閉ActivityForm(編輯或新增的輸入畫面) ,此事件在ActivityForm的button Cancel事件觸發
  }
  
  //此事件在ActivityForm(編輯或新增的輸入畫面)上的button Submit事件觸發,觸發完後該ActivityForm就要關閉,
  //所以setEditMode(false),跟button Cancel一樣,觸發完要關閉ActivityForm
  function handleCreateOrEditActivity(activity:Activity) {
    setSubmitting(true)
    if (activity.id) {
       agent.Activities.update(activity).then(() => {
          setActivities([...activities.filter(x =>x.id !== activity.id),activity])
          setSelectedActivity(activity); 
          setEditMode(false); 
          setSubmitting(false);
       })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then( () => {
        setActivities([...activities,activity]);
        setSelectedActivity(activity); 
        setEditMode(false); 
        setSubmitting(false);
      })
    }
    // activity.id 
    // ? setActivities([...activities.filter(x =>x.id !== activity.id),activity])
    // : setActivities([...activities,{...activity, id: uuid()}]);
    // setEditMode(false);
    // setSelectedActivity(activity);

  }

  function handleDeleteActivity(id:string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x =>x.id !== id)]);
      setSubmitting(false);   
    })
    
  }

  if (loading) return <LoadingComponent content='loading app' />
  return (
    <>

      {/* <Header as='h2' icon='users' content='Reactivities' /> */}
       
      <NavBar openForm= {handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
        activities={activities} 
        selectedActivity = {selectedActivity}
        selectActivity = {handleSelectActivity}
        cancelSelectActivity = {handleCancleSelectActivity}
        editMode = {editMode}
        openForm = {handleFormOpen} 
        closeForm = {handleFormClose}
        createOrEdit = {handleCreateOrEditActivity}
        deleteActivity = {handleDeleteActivity}
        submitting = {submitting}
        />
      </Container>
    </>
  );
}

export default App;
