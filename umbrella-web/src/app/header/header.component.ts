import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    protected accountService: AccountService,
    private router: Router
  ) {}

  handleHeaderClicked(param: string) {
    const subNavOuter = document.querySelector(`#${param}`),
      subNavInner = document.querySelector(`#${param} .subnav-inner`);
      
    if (subNavOuter != null && subNavInner != null) {
      const button = subNavOuter.previousElementSibling;
      if (button != null) {
        if (subNavOuter.clientHeight > 0) {
          subNavOuter.setAttribute("style", "heigh:0px;")
          button.classList.remove('active');
          return;
        }

        button.classList.toggle('active');
        const newHeight = `${subNavInner.clientHeight}px`;
        subNavOuter.setAttribute("style", `height: ${newHeight};`)
      }

    }

  }

  logout() {
    this.accountService.logout();
  }

}
