import { Observable } from 'rxjs';

export const children = <T>(parentId: string, childId: string = '_id') => (source: Observable<T[]>) =>
  new Observable<T[]>(subscriber => {
    source.subscribe({
      next(value) {
        const items = value.filter(c => c[childId] === parentId);
        subscriber.next(items);
      },
      error(err) {
        subscriber.error(err);
      },
      complete() {
        subscriber.complete();
      }
    });
  });
