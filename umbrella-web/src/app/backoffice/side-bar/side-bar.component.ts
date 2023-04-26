import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

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
}


