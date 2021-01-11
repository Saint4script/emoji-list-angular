import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule }   from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { DeletedComponent } from './components/deleted/deleted.component';

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'favourite', component: FavouriteComponent},
  {path: 'deleted', component: DeletedComponent},
  {path: '**', redirectTo: '/'}
]

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FavouriteComponent,
    DeletedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
