import React from "react";
import { useState } from "react";
import { Line } from 'react-chartjs-2';
import { initializeApp, } from 'firebase/app';
import 'firebase/firestore'
import { getFirestore, } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { Routes, Route, useNavigate} from 'react-router-dom';
import end from './end';
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


function normalRandom(mean, stdDev) {
  var u1 = Math.random();
  var u2 = Math.random();
  var z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return z0 * stdDev + mean;
}


function gen_t(T, dT) {
  let t = [];
  for (let i = 0; i < T / dT; i++) {
    t.push(i);
  }
  return t;
};

function sim_wealth(initial_wealth, T, dT, a, b, B) {

  function gen_x(initial_wealth, T, dT, a, b, B) {
    let x = [initial_wealth];
    let overflow = [0];
    for (let i = 1; i < T / dT; i++) {
      let curr_x = 0;
      let curr_overflow = 0;
      let dW = normalRandom(0, Math.sqrt(dT));
      let dX = a * dT + b * dW;
      curr_x = x[i - 1] + dX;

      if (curr_x > B) {
        curr_overflow = curr_x - B;
        overflow.push(curr_overflow);
        curr_x = B;
        x.push(curr_x);
      } else if (curr_x > 0 && curr_x < B) {
        x.push(curr_x);
        overflow.push(0);
      } else if (curr_x < 0) {
        overflow.push(0);
        break;
      }
    }
    return [x, overflow];
  };

  
  let re = gen_x(initial_wealth, T, dT, a, b, B);
  let x = re[0];
  let overflow = re[1]

  while (x.length < T / dT) {
    x.push(0);
  }

  while (overflow.length < T / dT) {
    overflow.push(0);
  }

  return [x, overflow]
}

function Q8() {
  const navigate = useNavigate();
  const navigateToTest = () => {
    navigate('/end');
  };
  const initial_wealth = 1;
  const T = 10;
  const dT = 0.01;
  const a = 3;
  const b = 3;
  const t = gen_t(T, dT)
  
  let [B, setB] = useState(Number.MAX_VALUE);
  let data = sim_wealth(initial_wealth, T, dT, a, b, B)
  let [xArr, setXarr] = useState(data[0]);
  let [of, setOf] = useState([]);
  let [cum_of, setcum_of] = useState([])
  let [numruns, setnumruns] = useState(0)
  let [entered, addToEntered] = useState([])
  let [submitMsg, setMsg] = useState('')

  

  const chartData = {
    labels: t,
    datasets: [
      {
        label: 'Wealth',
        data: xArr,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Wealth',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Dynamic Wealth Evolution',
      },
    },
    elements: {
      point: {
        radius: 0
      }
    },
    tooltips: {
      enabled: false
    }
  };

  async function onSubmit(){
    
    const date = new Date()
    let time = date.getTime()
    try {
      const docRef = await addDoc(collection(db, "q8"), {
        inputs: entered,
        timestamp: time
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setMsg('Submitted!')
  }

  

  function onClick() {
    if (numruns < 5) {
      let temp = sim_wealth(initial_wealth, T, dT, a, b, B);
      setXarr(temp[0]);
      let temp2 = temp[1].reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setOf(temp2);
      setcum_of([...cum_of, temp2]);
      addToEntered([...entered, B]);
    } else if (numruns === 5) {
      onSubmit();
    }
    setnumruns(numruns + 1);
  }

  function onChange(event) {
    setB(parseFloat(event.target.value));
  }


  return (
    <div className="App">
      <h1>Question 8</h1>
      <p style={{fontSize: "large"}}>You are shown a graph with unristricted evolution below based on a set of parameters.</p>
      <p style={{fontSize: "large"}}>You will get 5 entries for B ceilings and the current  earnings and cumulative earnings will be displayed.</p>
      <input placeholder="enter B value" style={{ margin: '20px' }} onChange={onChange} />
      <p>Current Drawdown: {Math.round(of * 100) /100}</p>
      <p>Cumulative Drawdown: {Math.round(cum_of.reduce((accumulator, currentValue) => accumulator + currentValue, 0)*100)/100}</p>
      <button style={{margin: '20px' }} onClick={onClick}>Submit</button>
      <p>{submitMsg}</p>
      <div className="chart-container" style={{ width: '100%', height: '400px' }}>
        <Line options={options} data={chartData} />
      </div>
      <Routes>
          <Route path='/end' element= {end} />
        </Routes>
            <button onClick = {navigateToTest} >Finish</button>
    </div>
  );
}

export default Q8;

