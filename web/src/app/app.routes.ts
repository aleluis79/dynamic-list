import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'editor', loadComponent: () => import('./pages/editor/editor.component') },
    { path: '', redirectTo: '/editor', pathMatch: 'full' },
    { path: '**', redirectTo: '/editor' }
];
