import React, { useState, useEffect } from 'react';
import Planet from '../components/Planet';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [planetArray1, setPlanetArray1] = useState('');
  const [planetArray2, setPlanetArray2] = useState('');
  const [planetArray3, setPlanetArray3] = useState('');
  const [planetArray4, setPlanetArray4] = useState('');
  //we can use below to send the array of vehicles
  const [planetCombined, setPlanetCombined] = useState([]);

  const [vehicleArray1, setVehicleArray1] = useState('');
  const [vehicleArray2, setVehicleArray2] = useState('');
  const [vehicleArray3, setVehicleArray3] = useState('');
  const [vehicleArray4, setVehicleArray4] = useState('');
  const [vehicleCombined, setVehicleCombined] = useState({});

  const [timeTakenByDest1, setTimeTakenByDest1] = useState('');
  const [timeTakenByDest2, setTimeTakenByDest2] = useState('');
  const [timeTakenByDest3, setTimeTakenByDest3] = useState('');
  const [timeTakenByDest4, setTimeTakenByDest4] = useState('');
  const [timeTakenCombined, setTimeTakenCombined] = useState(0);

  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [inprogress, setInProgress] = useState(false);

  const [modal, setModal] = useState(false);

  //We can use this to send the post request
  const [vehicleList, setVehicleList] = useState([]);

  const fetchPlanets = async () => {
    const response = await fetch('https://findfalcone.geektrust.com/planets');
    const data = await response.json();
    if (data) {
      setPlanets(data);
      console.log(data);
    }
  };

  const fetchVehicles = async () => {
    const response = await fetch('https://findfalcone.geektrust.com/vehicles');
    const data = await response.json();
    if (data) {
      setVehicles(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchPlanets();
    fetchVehicles();
  }, []);

  const updateVehicleArrayList = () => {
    let combining = [];
    vehicleArray1 && combining.push(vehicleArray1);
    vehicleArray2 && combining.push(vehicleArray2);
    vehicleArray3 && combining.push(vehicleArray3);
    vehicleArray4 && combining.push(vehicleArray4);

    setVehicleList(combining);

    const occurrences = combining.reduce(function (acc, curr) {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});

    setVehicleCombined(occurrences);
  };

  const calculateTime = () => {
    let combining = [];
    timeTakenByDest1 && combining.push(parseInt(timeTakenByDest1));
    timeTakenByDest2 && combining.push(parseInt(timeTakenByDest2));
    timeTakenByDest3 && combining.push(parseInt(timeTakenByDest3));
    timeTakenByDest4 && combining.push(parseInt(timeTakenByDest4));
    let sum = combining && combining.reduce((a, b) => a + b, 0);
    setTimeTakenCombined(sum);
  };

  useEffect(() => {
    calculateTime();
  }, [timeTakenByDest1, timeTakenByDest2, timeTakenByDest3, timeTakenByDest4]);

  useEffect(() => {
    updateVehicleArrayList();
  }, [vehicleArray1, vehicleArray2, vehicleArray3, vehicleArray4]);

  const updatePlanetArrayList = () => {
    let combining = [];
    planetArray1 && combining.push(planetArray1);
    planetArray2 && combining.push(planetArray2);
    planetArray3 && combining.push(planetArray3);
    planetArray4 && combining.push(planetArray4);

    setPlanetCombined(combining);
  };

  useEffect(() => {
    updatePlanetArrayList();
  }, [planetArray1, planetArray2, planetArray3, planetArray4]);

  //Finding Falcone API codes
  const findFalconeAPIRequest = () => {
    //get Token
    setInProgress(true);
    fetch('https://findfalcone.herokuapp.com/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('TOKEN', data);
        findFalconFunction(data.token);
      })
      .catch((err) => console.log(err));
  };

  const findFalconFunction = (token) => {
    let requestBody = {
      token: token,
      planet_names: planetCombined,
      vehicle_names: vehicleList,
    };

    fetch('https://findfalcone.herokuapp.com/find', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setInProgress(false);
        console.log('Result', data);
        navigate('/result', {
          state: { result: data, totalTimeTaken: timeTakenCombined },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="finding__falcone__home">
      <div className="home_falcone_guide">
        <button onClick={() => setModal(!modal)}>How to play</button>
      </div>
      {modal ? (
        <>
          <div className="modal__class">
            <div className="modal__text">
              <h3 style={{ textAlign: 'center', margin: '10px' }}>
                Finding Falcone!
              </h3>
              King Shan has received intelligence that Al Falcone is in hiding
              in one of these 6 planets - DonLon, Enchai, Jebing, Sapir, Lerbin
              & Pingasor. However he has limited resources at his disposal & can
              send his army to only 4 of these planets.
              <br />
              <br />
              <strong>Steps to play:</strong>
              <br />
              <ul>
                <li>Select 4 planets to search (out of the total 6)</li>
                <li>Select which space vehicles to send to these planets</li>
                <li>
                  See how much time it will take for the vehicles to reach their
                  targets
                </li>
                <li>
                  Final result will show if you are able to find the planet or
                  not
                </li>
              </ul>
              <br />
              <strong>Points to Remember:</strong>
              <br />
              <ul>
                <li>There are 4 types of vehicles.</li>
                <li>
                  The units of each vehicle type vary (eg:- there are 2 space
                  pods but only 1 space rocket).
                </li>
                <li>
                  All have different ranges (maximum distance it can travel). If
                  the range for a vehicle is lesser than the distance to the
                  planet, it cannot be chosen for going to the planet.
                </li>
                <li>
                  All have different speed. Based on the distance to the planet
                  and the speed of the vehicle, time taken for the complete
                  search should be shown.
                </li>
              </ul>
            </div>
            <button className="close__btn" onClick={() => setModal(!modal)}>
              close
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="home_falcone__title">
            Select planets you want to search in:
          </div>
          <div className="select__planets__vehicles">
            {[1, 2, 3, 4].map((num) => {
              return (
                <Planet
                  setVehicleArray={eval('setVehicleArray' + num)}
                  setPlanetArray={eval('setPlanetArray' + num)}
                  setTimeTakenByDest={eval('setTimeTakenByDest' + num)}
                  vehicleCombined={vehicleCombined}
                  planetCombined={planetCombined}
                  planet_num={num}
                  planets={planets}
                  vehicles={vehicles}
                  key={num}
                />
              );
            })}
          </div>
          <br />
          <div className="time__taken">
            <h3>Time Taken: {timeTakenCombined}</h3>
            <div className="falcone__buttons">
              <button
                type="button"
                className="find__falcone__btn"
                disabled={vehicleList.length !== 4 || inprogress === true}
                onClick={() => findFalconeAPIRequest()}
              >
                {inprogress ? (
                  <span>Please wait..</span>
                ) : (
                  <span>Find Falcone!</span>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
