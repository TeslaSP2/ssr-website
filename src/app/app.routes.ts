import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'post/:id1', loadChildren: () => import('./modules/post/post.module').then(m => m.PostModule)},
    { path: 'post/:id1/:id2', loadChildren: () => import('./modules/post/post.module').then(m => m.PostModule)}
];
