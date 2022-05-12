import React, { useState, useContext } from "react";
import {
  IonPage,
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

import dingSound from "../assets/audio/ding.mp3";
import finishSound from "../assets/audio/finished-001.mp3";
import { addOutline, removeOutline } from 'ionicons/icons';
import AppContext from "../data/app-context";

function convertHMS(sec: number) {
  let hours: string | number = Math.floor(sec / 3600); // get hours
  let minutes: string | number = Math.floor((sec - (hours * 3600)) / 60); // get minutes
  let seconds: string | number = sec - (hours * 3600) - (minutes * 60); //  get seconds

  if (hours > 0 && hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  if (hours) return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
  return minutes + ':' + seconds;
}

let intervalId: ReturnType<typeof setInterval>;

const Timer: React.FC = () => {
  const appCtx = useContext(AppContext);

  const stopTimer = () => {
    if (appCtx.isRunning) {
      clearInterval(intervalId);
      appCtx.setIsRunning(false);
    }
  }

  const startTimer = () => {
    if (appCtx.isRunning) return;
    appCtx.setIsRunning(true);
    const next = new Audio(dingSound);
    const finish = new Audio(finishSound);
    next.play();

    const total = appCtx.curPreset.reps * appCtx.rounds;
    let current = 1;
    intervalId = setInterval(() => {
      ++current;
      if (current <= total) {
        next.play();
      } else {
        finish.play();
        clearInterval(intervalId);
        appCtx.setIsRunning(false);
      }
    }, appCtx.curPreset.duration * 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {appCtx.curPreset.name}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="app__content">
          <div className="app__container">
            <h1 className="app__time">{`${convertHMS(appCtx.totalTime)}`}</h1>
            <div className="app__repetitions">
              <IonButton className="app__decrement" onClick={appCtx.decrementRounds} color='secondary'>
                <IonIcon icon={removeOutline} />
              </IonButton>
              <span className="app__rep-count">{appCtx.rounds}</span>
              <IonButton className="app__increment" onClick={appCtx.incrementRounds} color='secondary'>
                <IonIcon icon={addOutline} />
              </IonButton>
            </div>
            <div className="app__go-box">
              <IonButton
                expand='block'
                className="app__go ion-margin"
                color={appCtx.isRunning ? 'tertiary' : 'primary'}
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
        isOpen={appCtx.isError} 
        duration={2000} 
        onDidDismiss={() => appCtx.setIsError(false)} />
    </IonPage>
  )
}

export default Timer;