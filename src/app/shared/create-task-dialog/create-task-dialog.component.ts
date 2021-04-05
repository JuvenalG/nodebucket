/**
 * Title: create-task-dialog.component.ts
 * Author: Professor Krasso
 * Date: 4 April 2021
 * Modified By: Juvenal Gonzalez
 * Description: main component for create-task-dialog component
 */


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;
             //services are passed upon initialization of each dialog
  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {

            //defines what values are to be used in the form and what validations are requried
      this.taskForm= this.fb.group({
        title:[null, Validators.compose([Validators.required])],
        description:[null, Validators.compose([Validators.required])]
      })
  }

  createTask(){   //closes the dialog once a new task is created
    this.dialogRef.close(this.taskForm.value);
  }

  cancel() { //closed the dialog when cancel button is submitted
    this.dialogRef.close();
  }


}
