import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  token: any = localStorage.getItem('token');
  registerForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _HttpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  editProduct() {
    this.registerForm.markAllAsTouched();

    this._HttpClient
      .put(
        `http://localhost:5000/products/${this.data.id}`,
        {
          title: this.data.title,
          price: this.data.price,
          image: this.data.image,
          category: this.data.category,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .subscribe((res) => {
        this.dialogRef.close();
      });
  }
}
