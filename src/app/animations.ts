import { transition, trigger, style, animate, state } from '@angular/animations';

export const fade = trigger('fade', [state('void', style({ opacity: 0 })), transition('void => *', [animate(3400, style({ opacity: 1 }))])]);

export const fadefaster = trigger('fadefaster', [
  state('void', style({ opacity: 0 })),
  transition('void => *', [animate(2000, style({ opacity: 1 }))]),
]);
