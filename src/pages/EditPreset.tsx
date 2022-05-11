import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const EditPreset: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref="/timer" />
          </IonButtons>
          <IonTitle>
            Edit Presets
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Edit Presets</h2>
      </IonContent>
    </IonPage>
  )
}

export default EditPreset;