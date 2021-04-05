/**
 * Title: task.service.ts
 * Author: Professor Krasso
 * Date: 29 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: Allows client to hande server calls with inputed parameters
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
                        //talks to API
  constructor(private http: HttpClient) { }

                                               //each task uses the API defined in server/routes/employe-route.js to either delete, create, or update a task array

   /**
    * Find All tasks
    * @param empId
    * @returns all tasks
    */                           //return type
  findAllTasks(empId: string): Observable<any> {
      return this.http.get('/api/employees/' + empId + "/tasks")
  }
  /**
   * Create Task
   * @param empId
   * @param task
   * @returns  new task
   */
  createTask(empId: string, task: string, taskb: string): Observable<any>{
            return this.http.post('/api/employees/' + empId + '/tasks', {
              title: task,
              description: taskb
            })
  }
/**
 * Update Task
 * @param empId
 * @param todo
 * @param done
 * @returns updated array with new task
 */
  updateTask(empId: string, todo: Item[], done: Item[]): Observable<any>{
      return this.http.put('/api/employees/' + empId + '/tasks/', {
        todo,
        done
      })
  }
/**
 * Delete Task
 * @param empId
 * @param taskId
 * @returns deleted task
 */
  deleteTask(empId: string, taskId: string): Observable<any> {
      return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }
}
