import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Result.css';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {location.state.result.status === 'success' ? (
        <div className="result__message__page">
          <div className="success__result__message">
            <div className="primary__message">
              Success! Congratulations on Finding Falcone. King Shan is mightly
              pleased.
            </div>
            <br />
            <div className="final__timetaken">
              Time taken:{' '}
              <span className="final__timetaken_text">
                {location.state.totalTimeTaken}
              </span>
            </div>
            <div className="planet__info">
              Planet found:{' '}
              <span className="planet__info__text">
                {location.state.result.planet_name}
              </span>
            </div>
          </div>
          <button className="start__again__btn" onClick={() => navigate('/')}>
            Start Again
          </button>
        </div>
      ) : (
        <div className="result__message__page">
          <div className="success__result__message">
            <div className="primary__message">
              Sorry, Planet was not found, Try again later 😔
            </div>
            <br />
          </div>
          <button className="start__again__btn" onClick={() => navigate('/')}>
            Start Again
          </button>
        </div>
      )}
    </>
  );
};

export default Result;
