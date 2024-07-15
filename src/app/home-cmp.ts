import {Component, inject, PLATFORM_ID, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {isPlatformServer} from "@angular/common";
import {LoggedCmp} from "./logged-cmp";
import {TestCmp} from "./test-cmp";
import {User} from "./types";

@Component({
  selector: 'app-home-cmp',
  standalone: true,
  imports: [
    LoggedCmp,
    TestCmp
  ],
  template: `
    @if (user()) {
      <p>
        @defer (when user()) {
          <app-logged-cmp [user]="user()!" />
        }
      </p>
    } @else {
      <div>
        @defer (on immediate) {
          <app-test-cmp />
        } @loading {
          <div>Loading....</div>
        } @placeholder {
          <div>Loading....</div>
        }
      </div>
    }
  `
})
export class HomeCmp {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  user = signal<User | null>({id: 1, nickname: 'admin'});

  constructor() {
    if (isPlatformServer(this.platformId)) {
      this.user.set(null);
    } else {
      this.httpClient.get(`https://dummyjson.com/RESOURCE/?delay=5000&t=${ Date.now() }`)
        .subscribe();
    }
  }
}
