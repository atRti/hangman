import { Routes } from '@angular/router';

import { NotFoundComponent } from './screens/not-found/not-found.component';
import { IntroComponent } from './screens/intro/intro.component';
import { TryAgainComponent } from './screens/try-again/try-again.component';
import { WinComponent } from './screens/win/win.component';

export const routes: Routes = [
    { path: '', redirectTo: 'intro', pathMatch: 'full' },
    { path: 'intro', component: IntroComponent },
    { path: 'game', loadChildren:() => import('./game/game.module').then(mod => mod.default)},
    { path: 'try-again', component: TryAgainComponent },
    { path: 'win/:time', component: WinComponent },
    { path: '**', component: NotFoundComponent }
];
