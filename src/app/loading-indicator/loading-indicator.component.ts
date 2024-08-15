import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Observable, Subject, debounceTime, tap } from 'rxjs';
import { LoadingService } from '../loading.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterModule,
} from '@angular/router';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [AsyncPipe, MatProgressSpinnerModule, NgIf, NgTemplateOutlet],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.css',
})
export class LoadingIndicatorComponent implements OnInit {
  loading$: Observable<boolean>;
  private readonly debounceTime = 200; // Debounce time in milliseconds

  @Input()
  detectRouteTransitions = false;

  @ContentChild('loading')
  customLoadingIndicator: TemplateRef<any> | null = null;

  constructor(private loadingService: LoadingService, private router: Router) {
    this.loading$ = this.loadingService.loading$;
  }

  // Debounce navigation start and end events

  ngOnInit(): void {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof NavigationStart) {
              this.loadingService.loadingOn();
            } else if (
              event instanceof NavigationEnd ||
              event instanceof NavigationCancel ||
              event instanceof NavigationError
            ) {
              setTimeout(
                () => this.loadingService.loadingOff(),
                this.debounceTime
              );
            }
          })
        )
        .subscribe();
    }
  }
}
