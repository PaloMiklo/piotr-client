import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fadefaster } from 'src/app/animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadefaster],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
