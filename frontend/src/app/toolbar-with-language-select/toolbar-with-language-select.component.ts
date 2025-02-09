import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'toolbar-with-language-select',
  templateUrl: './toolbar-with-language-select.component.html',
  styleUrls: ['./toolbar-with-language-select.component.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  standalone: true,
})
export class ToolbarWithLanguageSelect {
  @Input() title: string = '';
  constructor(public translateService: TranslateService) {}
}
