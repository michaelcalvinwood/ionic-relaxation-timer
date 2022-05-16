import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Settings: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Settings
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Settings</h2>
      </IonContent>
    </IonPage>
  )
}

export default Settings;