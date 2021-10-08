import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDividerModule } from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  imports: [MatCardModule, MatButtonModule
, MatInputModule,
    MatFormFieldModule, MatIconModule, MatExpansionModule, MatListModule
    , MatTabsModule, MatChipsModule, ReactiveFormsModule, FormsModule,
    MatChipsModule, MatPaginatorModule, MatSlideToggleModule, MatSidenavModule,
    MatToolbarModule, MatDividerModule, MatProgressSpinnerModule,
    OverlayModule, MatSelectModule, FlexLayoutModule, MatTableModule,
    MatDialogModule],
  exports: [
    MatCardModule, MatButtonModule, MatInputModule,
    MatFormFieldModule, MatIconModule, MatExpansionModule
    , MatListModule, MatTabsModule, MatChipsModule,
    ReactiveFormsModule, FormsModule, MatChipsModule,
    MatPaginatorModule, MatSlideToggleModule, MatSidenavModule, MatToolbarModule,
    MatDividerModule, MatProgressSpinnerModule, OverlayModule, MatSelectModule,
     FlexLayoutModule, MatTableModule, MatDialogModule]
})
export class MaterialModule { }
