import React, { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from '../../styles/components/Profile.module.css'

const Profile = () => {
  const {level} = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/wtheodoro.png" alt="Walison Teodoro"/>
      <div>
        <strong>Walison teodoro</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          {level}
        </p>
      </div>
    </div>
  );
}

export default Profile;
