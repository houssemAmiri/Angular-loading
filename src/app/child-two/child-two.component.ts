import { Component } from '@angular/core';
import { LoadingService } from '../loading.service';
import {
  HttpClient,
  HttpClientModule,
  HttpContext,
} from '@angular/common/http';
import { SkipLoading } from '../custom-http-interceptor';

@Component({
  selector: 'app-child-two',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './child-two.component.html',
  styleUrl: './child-two.component.css',
})
export class ChildTwoComponent {
  constructor(
    private loadingService: LoadingService,
    private httpClient: HttpClient
  ) {}
  async onLoadApi() {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/posts', {
        context: new HttpContext().set(SkipLoading, true),
      })
      .subscribe();
  }
}
