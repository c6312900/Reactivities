import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
// import { Activity } from '../models/Activity';
// import {v4 as uuid} from 'uuid';
// import agent from '../api/agent';



function App() {
  const {activityStore} = useStore(); 
  //const [activities, setActivities] = useState<Activity[]>([]); 
  // const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // const [editMode,setEditMode] = useState(false)
  // const [loading,setLoading] = useState(true)
 // const [submitting,setSubmitting] = useState(false) 

  //************註記*********************/
  //Activity總共3個form:
  //ActivityList(主檔的list畫面)
  //ActivityDetails(明細的畫面)
  //ActivityForm(編輯或新增的輸入畫面)
  //handleSelectActivity:代表你透過id選取了一個ACtivity,此ACtivity在ActivityDetails明細畫面需要,
  //又在ActivityForm編輯畫面呈現時也需要,另外在ActivityForm 上有initialState,先判斷SelectActivity
  //是否undefined,若是表示新增狀態,若不是表示SelectActivity有值為編輯狀態
  //handleCancleSelectActivity:不選取Activity,在ActivityForm新增畫面呈現時需要
  //editMode代表是不是在編輯模式,當ActivityDetails明細畫面呈現時editMode為false,
  //當ActivityForm編輯或新增的輸入畫面呈現時editMode為true



  useEffect(() =>{
    activityStore.loadActivities();
    },[activityStore])

  // useEffect(() =>{
  //     // axios.get<Activity[]>('http://localhost:5000/api/activities').then(response =>{
  //     //   setActivities(response.data);
  //     // })

  //    agent.Activities.list().then(response => {
  //      let activities: Activity[] = [];
  //      response.forEach(activity => {
  //        activity.date = activity.date.split('T')[0];
  //        activities.push(activity);
  //      })
  //      setActivities(activities); 
  //      setLoading(false);     
  //      // setActivities(response);
  //    })
  // },[])


  
  //代表選取哪一個明細,會由ActivityList的Button 的view事件觸發,再傳至ActivityDashboard selectActivity,
  //再傳至App selectActivit,再介接handleSelectActivit去setSelectedActivity,則會有selectedActivity,
  //此時已知哪個Activity被選取
  // function handleSelectActivity(id:string) {
  //   setSelectedActivity(activities.find(x =>x.id === id));
  // } 
  
  //此事件再處理ActivityDetails form 是否開啟,由App的selectedActivity,再至ActivityDashboard selectedActivit,
  //再傳至ActivityDetails activity去呈現這個畫面的值
  // function handleCancleSelectActivity() {
  //   setSelectedActivity(undefined);
  // }

  //代表開啟ActivityForm(編輯或新增的輸入畫面),還要同時傳入目前的Activity,
  //此事件在ActivityDetail的button edit事件觸發,透過openForm再傳至ActivityDashboard,再傳至App, 
  //再由openForm介接handleFormOpen
  //簡單說openForm再處理ActivityForm(編輯或新增的輸入畫面)的開啟
  // function handleFormOpen(id?:string) {
  //   id? handleSelectActivity(id) : handleCancleSelectActivity() ; 
  //   setEditMode(true);
  // }
  
   //代表關閉ActivityForm(編輯或新增的輸入畫面) ,此事件在ActivityForm的button Cancel事件觸發
  // function handleFormClose() {  
  //   setEditMode(false); 
  // }
  
  //此事件在ActivityForm(編輯或新增的輸入畫面)上的button Submit事件觸發,觸發完後該ActivityForm就要關閉,
  //所以setEditMode(false),跟button Cancel一樣,觸發完要關閉ActivityForm
  // function handleCreateOrEditActivity(activity:Activity) {
  //   setSubmitting(true)
  //   if (activity.id) {
  //      agent.Activities.update(activity).then(() => {
  //         setActivities([...activities.filter(x =>x.id !== activity.id),activity])
  //         setSelectedActivity(activity); 
  //         setEditMode(false); 
  //         setSubmitting(false);
  //      })
  //   } else {
  //     activity.id = uuid();
  //     agent.Activities.create(activity).then( () => {
  //       setActivities([...activities,activity]);
  //       setSelectedActivity(activity); 
  //       setEditMode(false); 
  //       setSubmitting(false);
  //     })
  //   }
  //   // activity.id 
  //   // ? setActivities([...activities.filter(x =>x.id !== activity.id),activity])
  //   // : setActivities([...activities,{...activity, id: uuid()}]);
  //   // setEditMode(false);
  //   // setSelectedActivity(activity);
  // }

  // function handleDeleteActivity(id:string) {
  //   setSubmitting(true);
  //   agent.Activities.delete(id).then(() => {
  //     setActivities([...activities.filter(x =>x.id !== id)]);
  //     setSubmitting(false);   
  //   })    
  // }

  if (activityStore.loadingInitial) return <LoadingComponent content='loading app' />

  return (
    <>
      {/* <Header as='h2' icon='users' content='Reactivities' /> */}
       
      {/* <NavBar openForm= {handleFormOpen}/> */}
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
        // activities={activityStore.activities} 
        // selectedActivity = {selectedActivity}
        // selectActivity = {handleSelectActivity}
        // cancelSelectActivity = {handleCancleSelectActivity}
        // editMode = {editMode}
        // openForm = {handleFormOpen} 
        // closeForm = {handleFormClose}
        // createOrEdit = {handleCreateOrEditActivity}
       // deleteActivity = {handleDeleteActivity}
       // submitting = {submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
