import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import ScrollToTop from './components/ScrollToTop' 


import AdminDashboard from './components/adminDashboard/AdminDashboard';
import ProfileScreen from './screens/profileScreen/Profile';
import LoginScreen from './screens/login/LoginScreen';
import RegisterScreen from './screens/register/RegisterScreen';
import AdminScreen from './screens/adminScreen/AdminScreen';
import CreateSessionScreen from './screens/sessionScreen/CreateSessionScreen';
import CreateCourseScreen from './screens/courseScreen/CreateCourseScreen';
import AffectationScreen from './screens/affectationScreen/AffectationScreen';
import UpdateProfileScreen from './screens/updateProfileScreen/UpdateProfile';
import SignatureScreen from './screens/signatureScreen/SignatureScreen';
import PresenceScreen from './screens/presenceScreen/PresenceScreen';
import PdfUpload from './screens/uploadPdf/PdfUpload';
import AbsenceScreen from './screens/absenceScreen/AbsenceScreen';
import AdminShowAbsenceScreen from './screens/adminShowAbsenceScreen/AdminShowAbsenceScreen'; 
import ShowCourses from './screens/showCoursesScreen/ShowCourses'; 
import ShowPdf from './screens/showPdf/ShowPdf'; 




 
const App = () => {
  return (
    <Router>
      <ScrollToTop  />
      <main >
      <div>
      <AdminDashboard /> 
      </div>
      <div>
        <Container>
          
         
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/update' component={UpdateProfileScreen} exact />
          <Route path='/admin' component={AdminScreen} exact />
          <Route path='/createSession' component={CreateSessionScreen} exact />
          <Route path='/createCourse' component={CreateCourseScreen} exact />
          <Route path='/affectation' component={AffectationScreen} exact />
          <Route path='/signature' component={SignatureScreen} exact />
          <Route path='/presence' component={PresenceScreen} exact />
          <Route path='/absence' component={AbsenceScreen} exact />
          <Route path='/pdf' component={PdfUpload} exact />
          <Route path='/showCourses/pdf/:pdf' component={ShowPdf} />
          <Route path='/showCourses' component={ShowCourses} exact />
          <Route path='/userPresence' component={AdminShowAbsenceScreen} exact />

 
          
        </Container>
       </div>
      
      </main>
      
    </Router>
  );
}

export default App;
