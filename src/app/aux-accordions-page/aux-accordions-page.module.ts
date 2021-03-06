import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuxAccordionsPageComponent } from './aux-accordions-page.component';
import { PageFiveComponent } from './page-five/page-five.component';
import { PageFourComponent } from './page-four/page-four.component';
import { PageSixComponent } from './page-six/page-six.component';

const routes: Routes = [
  {
    path: 'accordions',
    component: AuxAccordionsPageComponent,
    children: [
      {
        path: 'page4',
        component: PageFourComponent,
        children: [
          {
            path: 'page5',
            component: PageFiveComponent,
            children: [
              {
                path: 'page6',
                component: PageSixComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [AuxAccordionsPageComponent, PageFourComponent, PageFiveComponent, PageSixComponent],
})
export class AuxAccordionsPageModule {}
