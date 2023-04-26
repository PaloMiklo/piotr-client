import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from './core/alert/service/alert.service';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _datePipe: DatePipe,
    private readonly _alert: AlertService,
    private readonly _storage: StorageService
  ) {
    this._storage.clearItemsWithExpirations();
    this._storage.clearItemsWithoutExpirations();
  }

  ngOnInit(): void {
    console.log(
      `${this._datePipe.transform(
        environment.buildDate,
        'dd.MM.yyyy HH:mm:ss'
      )}`
    );

    this._alert.info(`Hello,\n

      I wanted to give you an update on my project. I am currently working on rebuilding and refactoring the app to improve its performance and security. However, due to the ongoing development process, some features may not be fully functional at this time.\n
      
      Please feel free to check out the project and let me know if you have any feedback or suggestions. I am always looking to improve my skills and knowledge, and I welcome any constructive criticism.\n
      
      Thank you for your time and interest in my project.`);
  }
}
