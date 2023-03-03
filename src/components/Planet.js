import React, { useEffect, useState, useRef } from 'react';
import Vehicle from './Vehicle';
import './Planet.css';

const Planet = ({
  setVehicleArray,
  setPlanetArray,
  setTimeTakenByDest,
  vehicleCombined,
  planetCombined,
  planet_num,
  planets,
  vehicles,
}) => {
  const [selectedPlanet, setSelectedPlanet] = useState('');
  console.log();

  const filterVehicleBasedOnPlanetSelection = (e) => {
    setSelectedPlanet('ROcky');
    // console.log(e.target.value);
    let p = planets.find((p) => p.name === e.target.value);
    setSelectedPlanet(p);

    setPlanetArray(e.target.value);
  };

  return (
    <div className="destination">
      <label htmlFor="dest__select" className="dest__select__label">
        Destination {planet_num}
      </label>
      <select
        name={'dest__select' + planet_num}
        id="dest__select"
        defaultValue="default"
        onChange={(e) => filterVehicleBasedOnPlanetSelection(e)}
      >
        <option value="default" disabled hidden>
          Select planet
        </option>
        {planets.map((planet) => {
          return (
            <option
              key={planet.name}
              value={planet.name}
              disabled={planetCombined?.includes(planet.name)}
            >
              {planet.name}
            </option>
          );
        })}
      </select>
      <div className="vehicle__select">
        <Vehicle
          setVehicleArray={setVehicleArray}
          vehicleCombined={vehicleCombined}
          setTimeTakenByDest={setTimeTakenByDest}
          planet_num={planet_num}
          vehicles={vehicles}
          selectedPlanet={selectedPlanet}
        />
      </div>
    </div>
  );
};

export default Planet;
