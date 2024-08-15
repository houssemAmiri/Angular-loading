import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { AppRoutingModule } from './app-routing.module';
import { ChildComponent } from './child/child.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './custom-http-interceptor';
import { LoadingService } from './loading.service';
import { ChildTwoComponent } from './child-two/child-two.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    LoadingIndicatorComponent,
    AppRoutingModule,
    ChildComponent,
    ChildTwoComponent,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
