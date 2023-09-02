import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-router.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListDataService } from './services/list-data.service';
import { ListHomeComponent } from './list-home/list-home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { httpInterceptors } from './interceptors_guards/httpInterceptors';
import { DashbarComponent } from './dashbar/dashbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListHomeComponent,
    NavbarComponent,
    AddItemComponent,
    ItemCardComponent,
    EditItemComponent,
    DashbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [ListDataService, {provide:HTTP_INTERCEPTORS, useClass: httpInterceptors, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
