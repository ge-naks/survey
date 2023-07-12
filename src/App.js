import './App.css';
import { useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import img1 from './example1.png'
import img2 from './example2.png'
import img3 from './example3.png'
import { Routes, Route, useNavigate} from 'react-router-dom';
import Q1 from './pages/q1';
import { initializeApp, } from 'firebase/app';
import 'firebase/firestore'
import { getFirestore, } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

const config = {
  apiKey: "AIzaSyB68A6K0seA9D2iaq8-lTn6-fu9rHfnJuY",
  authDomain: "aresty-226b5.firebaseapp.com",
  projectId: "aresty-226b5",
  storageBucket: "aresty-226b5.appspot.com",
  messagingSenderId: "167723820266",
  appId: "1:167723820266:web:b95a6b446d318effc4a393"
}
const app = initializeApp(config);
const db = getFirestore(app);
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const ImageGallery = () => {
  return (
    <div className="image-gallery">
      <div className="image">
        <img src={img1} alt="capped evolution" />
        <h3>Capped Evolution</h3>
        <p className='desc'>A user defined ceiling will be set as the maximum amount of wealth generated before the excess is withdrawn</p>
      </div>
      <div className="image">
        <img src={img2} alt="free evolution" />
        <h3>Free Evolution</h3>
        <p className='desc'>Unrestricted growth of a firm</p>
      </div>
      <div className="image">
        <img src={img3} alt="bankruptcy" />
        <h3>Bankruptcy</h3>
        <p className='desc'>The wealth of a firm reaches 0 and it becomes bankrupt</p>
      </div>
    </div>
  );
};




function App() {
  const navigate = useNavigate();
  const navigateToTest = () => {
    navigate('/Q1');
  };
  
 
  
  const [fullName, setName] = useState('')
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState('')


  function handleNameChange(event){
    setName(event.target.value)
  }

  function handleAgeChange(event){
    setAge(event.target.value)
  }




  function SetGender() {
    

    const options = ["Male", "Female"]

    function OnUpdate(selectedOption){
      setGender(selectedOption.value)
    }

    return(
      <Dropdown  options={options} onChange={OnUpdate} value={gender} placeholder="Select an option" />
    )
  }



  
  async function onSubmit(){
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: fullName,
        age: age,
        gender: gender,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="App">
      <h1>Dynamic Wealth Generation</h1>
      <h2>First Let's Get Some Info:</h2>
      <SetName fullName={fullName} handleNameChange={handleNameChange} />
      <br></br>
      <SetAge age = {age} handleAgeChange={handleAgeChange} />
      <br></br>
      <SetGender />
      <button onClick={onSubmit} style={{marginTop: '20px'}}>Submit Info</button>
      <div style={{height: 1000 , width: 1000}}>
        <h2>Now Let's Explain the Dynamic Problem</h2>
        <p> You will be presented with a randomly generated graph. Where the x-axis is represented by time, and the y-axis is represented by wealth. These graphs follow a pattern known as Brownian motion with drift. These graphs are generated based on the differential equation: dX = a * dT + b * dW</p>
        <p>Your responsibility is to determine a constant 'B' which is a constant that will be modeled by a horizontal line. You are to pick a B value based on the shown graph to maximize profits (anything above the horizontal B line)</p>
        <p>Here are some examples:</p>
        <ImageGallery />
        <p>You will be asked 8 questions where you must decide what the optimal ceiling (B) value is. You will win your drawdown earnings at the end of the 10 questions, so do your best!</p>

        <Routes>
          <Route path='/Q1' element= {Q1} />
        </Routes>
            <button onClick = {navigateToTest} >Begin Test</button>
        </div>
      </div>
  );
}

function SetName({ fullName, handleNameChange }) {
  return (
    <>
      <input
        className="entry"
        type="text"
        placeholder="Enter Full Name..."
        value={fullName}
        onChange={handleNameChange}
      />
    </>
  );
}


function SetAge({age, handleAgeChange}){
  return(
    <input className='entry'
      type='text'
      placeholder='Enter Age...'
      value = {age}
      onChange={handleAgeChange}
      />
  )
}

export default App;

