import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: AboutComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
  declarations: [AboutComponent],
})
export class AboutModule {}
