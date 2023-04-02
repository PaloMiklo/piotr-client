import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { setAppInjector } from './app-injector';
import { AppComponent } from './app.component';
import { CoreModule } from './components/core/core.module';
import { HttpRequestInterceptor } from './interceptor/http.interceptor';
import { ShoppingService } from './service/shopping.service';
import { StorageService } from './service/storage.service';
import { routes } from './routes';
import { configLoaderFactory, ConfigService } from './service/config.service';
import { MockService } from './service/mock.service';
import { AlertService } from './core/alert/service/alert.service';
import { AlertComponent } from './core/alert/alert.component';

@NgModule({
  declarations: [AppComponent, AlertComponent],
  imports: [
    BrowserModule,
    CommonModule,
    CoreModule,
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configLoaderFactory,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    ShoppingService,
    StorageService,
    MockService,
    AlertService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
