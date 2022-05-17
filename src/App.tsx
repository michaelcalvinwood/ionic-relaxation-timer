import "./App.scss";
import React, { useState } from "react";
import { 
  IonApp, 
  IonRouterOutlet, 
  setupIonicReact, 
  IonTabBar, 
  IonTabButton, 
  IonTabs,
  IonIcon,
  IonLabel,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonSplitPane
 } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from "react-router-dom";

/* Import Pages */
import Timer from "./pages/Timer";
import Presets from "./pages/Presets";
import EditPreset from "./pages/EditPreset";
import AddPreset from "./pages/AddPreset";
import MusicSettings from "./pages/MusicSettings";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/theme.css";

/* Import icons for tabs */
import { hourglassOutline, optionsOutline, options, closeOutline, musicalNotes, musicalNoteOutline } from 'ionicons/icons';
import Settings from "./pages/Settings";

setupIonicReact();

const App: React.FC = () => {
  document.title = "Relaxation Timer";

  return (
    <IonApp className="app">
      <IonReactRouter>
        {/* <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>
              <IonItem>
                  <IonIcon slot="start" icon={closeOutline} />
                  <IonLabel></IonLabel>
                </IonItem>
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle>
                <IonItem button routerLink="/settings" routerDirection="none">
                  <IonIcon className="ion-special-background-secondary" slot="start" icon={options} />
                  <IonLabel></IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu> */}
        <IonTabs>
          <IonRouterOutlet animated={true} id="main">
            {/* <Route path="/settings">
              <Settings />
            </Route> */}
            <Route path="/music">
              <MusicSettings />
            </Route>
            <Route path="/timer">
              <Timer />
            </Route>
            <Route path="/presets">
              <Presets />
            </Route>
            <Route path="/add-preset">
              <AddPreset />
            </Route>
            <Route path="/edit-preset/:id">
              <EditPreset />
            </Route>
            <Redirect to="/timer" />
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            {/* Note: The tab prop in IonTabButton is just an identifier. Choose anything you like. */}
            <IonTabButton href="/timer" tab="timer">
              <IonIcon icon={hourglassOutline} />
              <IonLabel>Timer</IonLabel>
            </IonTabButton>
            <IonTabButton href="/presets" tab="presets">
              <IonIcon icon={optionsOutline} />
              <IonLabel>Presets</IonLabel>
            </IonTabButton>
            <IonTabButton href="/music" tab="music">
              <IonIcon icon={musicalNoteOutline} />
              <IonLabel>Music</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
