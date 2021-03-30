/**
 * Title: employee.interface.ts
 * Author: Professor Krasso
 * Date: 29 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: interface that defines the data fields of the employee object
 */

import { Item } from "./item.interface";

export interface Employee{
  empId: string;
  todo: Item[];
  done: Item[];
}
