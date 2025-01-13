import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  PopoverController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  mapOutline,
  addCircleOutline,
  locationOutline,
  settingsOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonPopover,
    IonContent,
    IonList,
    IonItem,
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(
    private router: Router,
    private popoverController: PopoverController
  ) {
    addIcons({
      mapOutline,
      addCircleOutline,
      locationOutline,
      settingsOutline,
    });
  }

  async goToProfile() {
    await this.popoverController.dismiss();
    this.router.navigate(['/profile']);
  }

  async signOut() {
    await this.popoverController.dismiss();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
