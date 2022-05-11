import React, {useState} from "react";
import {
    IonApp,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToast,
    IonToolbar,
    setupIonicReact,
  } from "@ionic/react";
  
import dingSound from "./assets/audio/ding.mp3";
import finishSound from "./assets/audio/finished-001.mp3";
import {addOutline, removeOutline} from 'ionicons/icons';

const Main: React.FC = () => {
    let intervalId: ReturnType<typeof setInterval>;


    const [reps, setReps] = useState(1);
    const [time, setTime] = useState(5);
    const [isRunning, setIsRunning] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const decrementReps = () => {
        if (isRunning) {
        if (!isError) setIsError(true);
        return;
        }
        if (reps > 1) {
        const newReps = reps - 1;
        setTime(newReps * 5);
        setReps(newReps);
        }
    };

    const incrementReps = () => {
        if (isRunning) {
        if (!isError) setIsError(true);
        return;
        }
        const newReps = reps + 1;
        setTime(newReps * 5);
        setReps(newReps);
    };

    const stopTimer = () => {
        if (isRunning) {
        clearInterval(intervalId);
        setIsRunning(false);
        }
    }

    const startTimer = () => {
        if (isRunning) return;
        setIsRunning(true);
        const next = new Audio(dingSound);
        const finish = new Audio(finishSound);
        next.play();

        const total = reps * 6;
        let current = 1;
        intervalId = setInterval(() => {
        ++current;
        if (current <= total) {
            next.play();
        } else {
            finish.play();
            clearInterval(intervalId);
            setIsRunning(false);
        }
        }, 50000);
    };

    return (
    <IonApp className="app">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Serenity Regardless</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="app__content">
          <div className="app__container">
            <h1 className="app__time">{`${time}:00`}</h1>
            <div className="app__repetitions">
              <IonButton className="app__decrement" onClick={decrementReps} color='secondary'>
                <IonIcon icon={removeOutline} />
              </IonButton>
              <span className="app__rep-count">{reps}</span>
              <IonButton className="app__increment" onClick={incrementReps} color='secondary'>
                <IonIcon icon={addOutline} />
              </IonButton>
            </div>
            <div className="app__go-box">
              <IonButton 
                expand='block' 
                className="app__go ion-margin"
                color={isRunning ? 'tertiary' : 'primary'}
                onClick={startTimer}>
                Go
              </IonButton>
              <IonButton 
                fill='outline'
                expand="block" 
                className="app__go ion-margin" 
                onClick={stopTimer}>
                Stop
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
      <IonToast 
        color="secondary"
        message="Cannot change increments while running."
        isOpen={isError} 
        duration={2000} 
        onDidDismiss={() => setIsError(false)} />
    </IonApp>
  );
}