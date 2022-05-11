import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Timer: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Timer
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Timer</h2>
      </IonContent>
    </IonPage>
  )
}

export default Timer;