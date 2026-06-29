import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit, AfterViewInit, OnDestroy {
  searchQuery = '';
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('clearBtn') clearBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('nores') nores!: ElementRef<HTMLDivElement>;
  private observer?: IntersectionObserver;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.applyFilter();
    this.setupSectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  applyFilter(): void {
    const query = this.searchQuery.trim().toLowerCase();
    if (this.clearBtn) {
      this.clearBtn.nativeElement.style.display = query ? 'block' : 'none';
    }

    const sections = Array.from(
      this.elementRef.nativeElement.querySelectorAll('section.sec'),
    ) as HTMLElement[];
    let anyVisible = false;

    sections.forEach((section) => {
      let sectionVisible = false;
      const groups = Array.from(
        section.querySelectorAll('.subgroup'),
      ) as HTMLElement[];

      groups.forEach((group) => {
        let groupVisible = false;
        const details = Array.from(
          group.querySelectorAll('details.qa'),
        ) as HTMLElement[];

        details.forEach((detail) => {
          const hit = !query || detail.dataset['q']?.includes(query);
          detail.style.display = hit ? '' : 'none';
          if (detail instanceof HTMLDetailsElement) {
            detail.open = !!query && hit;
          }
          if (hit) {
            groupVisible = true;
          }
        });

        group.style.display = groupVisible ? '' : 'none';
        if (groupVisible) {
          sectionVisible = true;
        }
      });

      section.style.display = sectionVisible ? '' : 'none';
      if (sectionVisible) {
        anyVisible = true;
      }
    });

    if (this.nores) {
      this.nores.nativeElement.style.display = anyVisible ? 'none' : 'block';
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilter();
    this.searchInput?.nativeElement.focus();
  }

  private setupSectionObserver(): void {
    const links = Array.from(
      this.elementRef.nativeElement.querySelectorAll('.navlink'),
    ) as HTMLElement[];
    const sections = Array.from(
      this.elementRef.nativeElement.querySelectorAll('section.sec'),
    ) as HTMLElement[];

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((link) => {
              if (link.dataset['cat'] === id) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      { rootMargin: '-10% 0px -78% 0px' },
    );

    sections.forEach((section) => this.observer?.observe(section));
  }
}
