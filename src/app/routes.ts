import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/product' },
  {
    path: 'product',
    loadChildren: () => import('./components/products/product.module').then(m => m.ProductModule),
  },
  {
    path: 'about',
    children: [
      {
        path: '',
        loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule),
      },
    ],
  },
  {
    path: 'contact',
    children: [
      {
        path: '',
        loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule),
      },
    ],
  },

  {
    path: 'cart',
    children: [
      {
        path: '',
        loadChildren: () => import('./components/cart/cart.module').then(m => m.CartModule),
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
      },
    ],
  },
  {
    path: 'checkout',
    children: [
      {
        path: '',
        loadChildren: () => import('./components/checkout/checkout.module').then(m => m.CheckoutModule),
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full',
  },
];
