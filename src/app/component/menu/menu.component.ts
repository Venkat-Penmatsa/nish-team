
import { Component, OnInit, ViewEncapsulation, Input, HostBinding } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavItem } from 'src/app/model/nav-item';
import { NavService } from 'src/app/services/navigation.service.spec';
import { User } from 'src/app/model/User';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuComponent implements OnInit {

  expanded: boolean = false;
  user: User;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;


  constructor(public navService: NavService,
    public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: NavItem) {
    console.log('menu...');
    this.user = JSON.parse(localStorage.getItem("userDetails") || '{}') as User;
    if (!(this.user.role == 'hr' && item.displayName == 'Finance')) {
      if (!item.children || !item.children.length) {
        this.router.navigate([item.route]);
      }
      if (item.children && item.children.length) {
        this.expanded = !this.expanded;
      }
    }
  }

}


