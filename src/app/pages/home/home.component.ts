/**
 * Title: home.component.ts
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: main component for home
 */

import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Employee } from 'src/app/shared/employee.interface';
import { Item } from 'src/app/shared/item.interface';
import { TaskService } from 'src/app/shared/task.service';
import { MatDialog } from "@angular/material/dialog";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop"
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //objects and arrays to be used in home component
  todo: Item[];
  done: Item[];
  employee: Employee;
  empId: string;
              //services are initialized with the home component so that their features can be used
  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
                              //cookieService uses session user to store credentials
      this.empId = this.cookieService.get('session_user') ;
       //finds all the tasks within an employee
      this.taskService.findAllTasks(this.empId).subscribe(res => {

        console.log('Server Response from findALLTAKS');
        console.log(res);
        this.employee = res.data;
        console.log("Employee Object", this.employee);

      }, err => {  //upon server error displays the error
          console.log(err,'SERVER ERROR', this.employee);
      }, () => {//succesfull query
          this.todo= this.employee.todo;
          this.done= this.employee.done;
          console.log("Oncomplete Section response object", this.employee);

      })

  }

  ngOnInit(): void {
  }
     //used to open matDialog causing a popup animation by calling the defined CreatetaskDialogComponent
    openCreateTaskDialog() {
  const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose:true
    })
     //decides what to do after closing
    dialogRef.afterClosed().subscribe(data => {
      if(data)
      {
        this.taskService.createTask(this.empId, data.title, data.description).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
     })

}
   //uses cdk library to implement drag and drop feature
drop(event: CdkDragDrop<any[]>) {   //uses previous and current to commense a node like connection
    if(event.previousContainer === event.container)
    {   //when rearragend in current array
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("Reordered item in an existing array");
      this.updateTaskList(this.empId, this.todo, this .done);
    }
    else{  //when dragged to another array stores the previous index and current index with the circular array idealogy
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
      console.log('Arranged item to different array');
      this.updateTaskList(this.empId, this.todo, this.done);
    }
}

deleteTask(taskId: string): void {
  if (taskId)
  {   //deletes task by using the unique id of the object
    console.log(`${taskId} was deleted`);
    this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
      this.employee = res.data;;
    }, err => {
       console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;

    })
  }
}



  //updates tasks by changing the old array with a new array that contains the new task
private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err);
    }, () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
    })

}




}
