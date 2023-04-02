import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  public form: FormGroup;
  public password = 'password';
  public show = false;

  constructor(private readonly _route: ActivatedRoute, private readonly _router: Router, private readonly _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      username: [null],
      password: [null],
    });
  }

  public readonly showHide = (): boolean => (this.show = !this.show);

  public readonly loginUser = (): Promise<boolean> => this._router.navigate(['main'], { relativeTo: this._route });
}
