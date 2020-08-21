import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { SiteRoutes } from './app.routes';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SearchFormComponent } from './search-form/search-form.component';
import {HttpClientModule} from '@angular/common/http';
import { AdministratorComponent } from './administrator/administrator.component';
import { UsersComponent } from './administrator/users/users.component';
import { UserDetailsComponent } from './administrator/users/user-details/user-details.component';
import { MessagesComponent } from './messages/messages.component';
import { NewMessageComponent } from './messages/new-message/new-message.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SearchFormComponent,
    AdministratorComponent,
    UsersComponent,
    UserDetailsComponent,
    MessagesComponent,
    NewMessageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(SiteRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

