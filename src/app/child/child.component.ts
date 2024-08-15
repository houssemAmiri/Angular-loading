import { Component } from '@angular/core';
import { LoadingService } from '../loading.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  constructor(
    private loadingService: LoadingService,
    private httpClient: HttpClient
  ) {}
  async onLoadApi() {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/posts')
      .subscribe();
  }
}
