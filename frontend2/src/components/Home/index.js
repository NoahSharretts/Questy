import SignupFormPage from "../SignupFormPage";
import LoginForm from "../LoginFormModal/LoginForm";
import './Home.css'
function Home() {

  

  return (
    <div className='home-div'>
      <h2>Welcome to Questy</h2>
      <LoginForm />
      <h3>Do you have an account already?</h3>
      
    </div>
  )
}

export default Home;
