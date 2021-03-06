import React, { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { CountdownContext } from '../../contexts/CountdownContext';
import styles from '../../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

const Countdown = () => {

  const { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown } = useContext(CountdownContext)

  const [minutLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  return (
    <div>
      <div className={styles.contdownContainer}>
        <div>
          <span>{minutLeft}</span><span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span><span>{secondRight}</span>
        </div>
      </div>

      {
        hasFinished ?
        <button disabled className={styles.countdownButton}>
        Ciclo encerrado
        </button> 
        :
        <>
          { 
          isActive ?
          <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
          Abandonar ciclo
          </button>
          :
          <button type="button" className={styles.countdownButton} onClick={startCountdown}>
          Iniciar um ciclo
          </button>
          }
        </>
      }
      
      
    </div>
    
  );
}

export default Countdown;
