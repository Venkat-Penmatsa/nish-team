import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FaqSection {
  id: string;
  title: string;
  contact: string;
  escalation: string;
  groups: {
    heading?: string;
    items: {
      question: string;
      answer: string;
      searchText: string;
    }[];
  }[];
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit, AfterViewInit, OnDestroy {
  searchQuery = '';
  faqData: FaqSection[] = [];

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('clearBtn') clearBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('nores') nores!: ElementRef<HTMLDivElement>;
  private observer?: IntersectionObserver;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get<FaqSection[]>('assets/data/faqs.json').subscribe((data) => {
      this.faqData = data || [];
      setTimeout(() => {
        this.applyFilter();
        this.setupSectionObserver();
      });
    });
  }

  ngAfterViewInit(): void {
    this.applyFilter();
    this.setupSectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  applyFilter(): void {
    const query = this.searchQuery.trim();
    const normalizedQuery = this.normalizeSearchText(query);

    if (this.clearBtn) {
      this.clearBtn.nativeElement.style.display = normalizedQuery
        ? 'block'
        : 'none';
    }

    const sections = Array.from(
      this.elementRef.nativeElement.querySelectorAll('section.sec'),
    ) as HTMLElement[];
    const links = Array.from(
      this.elementRef.nativeElement.querySelectorAll('.navlink'),
    ) as HTMLElement[];
    let anyVisible = false;
    let lastVisibleSectionId = '';

    sections.forEach((section) => {
      const sectionLabel = `${section.id} ${section.querySelector('h2')?.textContent ?? ''}`;
      const sectionTitleMatch =
        !normalizedQuery || this.matchesSearch(sectionLabel, normalizedQuery);

      let sectionVisible = sectionTitleMatch;
      const groups = Array.from(
        section.querySelectorAll('.subgroup'),
      ) as HTMLElement[];

      groups.forEach((group) => {
        let groupVisible = false;
        const headingText = group.querySelector('h3')?.textContent ?? '';
        const details = Array.from(
          group.querySelectorAll('details.qa'),
        ) as HTMLElement[];

        details.forEach((detail) => {
          const summaryText =
            detail.querySelector('summary')?.textContent ?? '';
          const answerText = detail.querySelector('.a')?.textContent ?? '';
          const searchText = `${detail.dataset['q'] ?? ''} ${summaryText} ${answerText}`;
          const hit =
            !normalizedQuery ||
            this.matchesSearch(searchText, normalizedQuery) ||
            this.matchesSearch(headingText, normalizedQuery) ||
            this.matchesSearch(sectionLabel, normalizedQuery);

          detail.style.display = hit ? '' : 'none';
          if (detail instanceof HTMLDetailsElement) {
            detail.open = !!normalizedQuery && !!hit;
          }
          if (hit) {
            groupVisible = true;
            sectionVisible = true;
          }
        });

        group.style.display = groupVisible ? '' : 'none';
      });

      const link = links.find(
        (item) =>
          item.dataset['cat'] === section.id ||
          item.getAttribute('href') === `#${section.id}`,
      );

      section.style.display = sectionVisible ? '' : 'none';
      if (link) {
        link.style.display = sectionVisible || !normalizedQuery ? '' : 'none';
      }

      if (sectionVisible) {
        anyVisible = true;
        lastVisibleSectionId = section.id;
      }
    });

    if (!normalizedQuery) {
      links.forEach((link) => {
        link.classList.remove('active');
        link.style.display = '';
      });
    } else {
      links.forEach((link) => {
        const isVisible =
          link.style.display !== 'none' &&
          !!link.dataset['cat'] &&
          link.dataset['cat'] === lastVisibleSectionId;
        link.classList.toggle('active', isVisible);
      });
    }

    if (this.nores) {
      this.nores.nativeElement.style.display = anyVisible ? 'none' : 'block';
    }
  }

  private matchesSearch(sourceText: string, query: string): boolean {
    if (!query) {
      return true;
    }

    const normalizedSource = this.normalizeSearchText(sourceText);
    const normalizedQuery = this.normalizeSearchText(query);

    if (!normalizedQuery) {
      return true;
    }

    if (normalizedSource.includes(normalizedQuery)) {
      return true;
    }

    const sourceWords = this.expandSearchTerms(normalizedSource);
    const queryWords = this.expandSearchTerms(normalizedQuery);

    return queryWords.every((queryWord) =>
      sourceWords.some((sourceWord) => sourceWord === queryWord),
    );
  }

  private normalizeSearchText(value: string): string {
    return (value || '')
      .toLowerCase()
      .replace(/&amp;/g, ' and ')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private expandSearchTerms(value: string): string[] {
    const normalized = this.normalizeSearchText(value);
    const terms = normalized.split(' ').filter(Boolean);
    const expanded = new Set<string>();

    terms.forEach((term) => {
      const singular = this.toSingular(term);
      expanded.add(term);
      expanded.add(singular);
      if (term.endsWith('s') && term.length > 3) {
        expanded.add(term.slice(0, -1));
      }
      if (term.length > 4 && !singular.includes(' ')) {
        expanded.add(singular);
      }
    });

    return Array.from(expanded).filter(Boolean);
  }

  private toSingular(word: string): string {
    if (word.endsWith('ies') && word.length > 4) {
      return word.slice(0, -3) + 'y';
    }
    if (word.endsWith('sses') && word.length > 4) {
      return word.slice(0, -2);
    }
    if (word.endsWith('es') && word.length > 4) {
      return word.slice(0, -2);
    }
    if (word.endsWith('s') && word.length > 3) {
      return word.slice(0, -1);
    }
    return word;
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

    this.observer?.disconnect();
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
