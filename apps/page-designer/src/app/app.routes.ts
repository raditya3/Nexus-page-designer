import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: "home",
        loadChildren: () => import("./pages/home/home.module").then(x => x.HomeModule)
    },
    {
        path: "edit-page/:id",
        loadChildren: () => import("./pages/edit-page/edit-page.module").then(x => x.EditPageModule)
    },
    {
        path: "**",
        redirectTo: "home"
    }
];
