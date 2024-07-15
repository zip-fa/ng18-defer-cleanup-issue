import {Component, inject, input} from '@angular/core';
import {User} from "./types";

@Component({
  selector: 'app-logged-cmp',
  standalone: true,
  imports: [],
  template: `Logged as {{ user().nickname }} (#{{ user().id }})`
})
export class LoggedCmp {
  user = input.required<User>();
}
