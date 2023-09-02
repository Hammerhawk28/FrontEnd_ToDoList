import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListHomeComponent } from './list-home/list-home.component';
import { authGuard } from './interceptors_guards/auth-guard';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';



const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'list-home', canActivate: [authGuard], component: ListHomeComponent},
    {path: 'add-item', canActivate: [authGuard], component: AddItemComponent},
    {path: 'edit-item', canActivate: [authGuard], component: EditItemComponent},
    {path: '**', component: LoginComponent},
    {path: '', component: LoginComponent, pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }