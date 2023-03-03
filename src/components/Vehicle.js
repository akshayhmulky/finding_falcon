import React, { useState } from 'react';
import './Vehicle.css';

const Vehicle = ({
  setVehicleArray,
  vehicleCombined,
  setTimeTakenByDest,
  planet_num,
  vehicles,
  selectedPlanet,
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  //   console.log('Inside vehicle', setVehicleArray);
  const onVehicleChange = (e, fv) => {
    let calculateTime = parseInt(selectedPlanet.distance) / fv.speed;
    // console.log('CALUCLATEEREEE', calculateTime);
    setTimeTakenByDest(calculateTime);
    setSelectedOption(e.target.value);
    setVehicleArray(e.target.value);
    // updateVehicleArrayList();
  };
  // console.log('Inside vehicle', selectedPlanet);
  return (
    <div className="vehicle">
      <ul>
        {selectedPlanet &&
          vehicles.map((fv) => {
            return (
              <li key={fv.name}>
                <label>
                  <input
                    type="radio"
                    name={'vehicle' + planet_num}
                    value={fv.name}
                    checked={selectedOption === fv.name}
                    onChange={(e) => onVehicleChange(e, fv)}
                    disabled={
                      parseInt(fv.total_no) ===
                        parseInt(vehicleCombined[fv.name]) ||
                      parseInt(fv.max_distance) <
                        parseInt(selectedPlanet.distance)
                    }
                  />
                  {fv.name} (
                  {vehicleCombined[fv.name]
                    ? fv.total_no - vehicleCombined[fv.name]
                    : fv.total_no}
                  )
                </label>
              </li>
            );
          })}
      </ul>
      <br />
    </div>
  );
};

export default Vehicle;
