import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { SiteRoutes } from './app.routes';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SearchFormComponent } from './search-form/search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(SiteRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
