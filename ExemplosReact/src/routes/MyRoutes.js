import  {Routes, Route} from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Costumers from '../pages/Costumers'
import New from '../pages/New';
import LockedRoute from "./LockedRoute";

 export default function MyRoutes(){
    return(
       <Routes>
          <Route exact path='/' element={<SignIn/>}/>
          <Route exact path='/register' element={<SignUp/>}/>
          <Route
              exact path='/dashboard'
              element={<LockedRoute><Dashboard/></LockedRoute>}
          />
           <Route
               exact path='/profile'
               element={<LockedRoute><Profile/></LockedRoute>}
           />
           <Route
               exact path='/costumers'
               element={<LockedRoute><Costumers/></LockedRoute>}
           />
           <Route
               exact path='/new'
               element={<LockedRoute><New/></LockedRoute>}
           />
       </Routes>
    );
}