import { NavLink } from 'react-router-dom';
import {Button, Container, Menu} from 'semantic-ui-react';
// import { useStore } from '../stores/store';

// interface props {
//     openForm: () => void;
// }

// export default function NavBar({openForm}:props) {
export default function NavBar() {
    // const {activityStore} = useStore();  
    // const {openForm} = activityStore;  
    return (
       <Menu inverted fixed='top'>
           <Container>
                <Menu.Item as={NavLink} to='/' exact  header > 
                    <img src="/assert/logo.png" alt='logo' style={{margin: '10px'}}/>
                     Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities'  name='Activities' />
                <Menu.Item>
                     <Button as={NavLink}  to='/createActivity' activeStyle={{ fontWeight: "bold", color: "blue" }} positive content='Create Activity' ></Button>
                     {/* <Button onClick={() => openForm()} positive content='Create Activity' ></Button> */}
                </Menu.Item>
           </Container>

       </Menu>
    )
}
