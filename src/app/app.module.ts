import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SparqlProvider } from '../providers/sparql-provider';
import { ListPage } from '../pages/list/list';
import { DetailsPage } from '../pages/details/details';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    DetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    DetailsPage
  ],
  providers: [SparqlProvider,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
