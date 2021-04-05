/**
 * Title: employee-route.js
 * Author: Professor Krasso
 * Date: 28 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: Uses Crud operations to respond to API calls
 */

const { json } = require("body-parser");
const express = require("express");
const Employee = require("../db-models/employee");
const BaseResponse = require("../service/base-response");
const router = express.Router();

// http://localhost:3000/api/employees/:empId



/**
 * API: findEmployeesById
 * @param empId
 * searches employee by id and displays all tasks
 */
 router.get('/:empId', async(req, res) => {

    try
    {
      Employee.findOne({"empId" : req.params.empId}, function(err, employee) {

        if (err)    //if error outputs mongoDb error
        {
          console.log(err);

          const mongoDBErrorResponse = new BaseResponse("500", 'MongoDB Native Error: ${err}', null);

          res.json(mongoDBErrorResponse.toObject());
        }
        else  //if match outputs matching employee
        {
          console.log(employee);

          const employeeResponse = new BaseResponse("200", "Successful query", employee);

          res.json(employeeResponse.toObject());

        }
      })
    }
    catch (e)
    {                      //if error outputs server error
        console.log(e);

        const findEmployeeCatchError = new BaseResponse("500", 'internal Server Error: ${e.message}', null);

        res.json(findEmployeeCatchError.toObject());
    }
 });

/**
 * API: createTask
 * @param empId
 * adds new task to todo array
 */
router.post('/:empId/tasks', async(req,res) => {

  try {
      Employee.findOne({"empId": req.params.empId}, function(err,employee){
              if(err)
                  {
                    console.log(err);  //if error outputs mongoDB error

                    const createTaskMongoDbError = new BaseResponse('500', 'MongoDB Exception: ${err.message}', null)

                    res.status(500).send(createTaskMongoDbError.toObject());
                  }
                  else{
                     console.log(employee);  //if employee match, pushes item with title and description to the todo array

                     const item = {
                       title: req.body.title,
                       description: req.body.description
                       };
                     console.log(item);

                     employee.todo.push(item);

                     employee.save(function(err,updatedEmployee){

                        if(err)   //catches onsSave exception
                        {
                          console.log(err);

                          const createTaskOnSaveMongoDbError = new BaseResponse("500", 'MongoDB onSave() exception: ${err.message}', null);

                          res.status(500).send(createTaskOnSaveMongoDbError.toObject());
                        } else {
                            console.log(updatedEmployee);    //outputs successful queries and displays the employee

                            const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful query', updatedEmployee);

                            res.status(200).send(createTaskOnSaveSuccessResponse.toObject());
                        }


                     })

                  }


            })
  }
  catch (e) {
      console.log(e);   //catches sever error

      const creatTaskCatchExcecption = new BaseResponse('500', 'Internal Server Error: ${e.message}', null)
      res.json(creatTaskCatchExcecption.toObject());
  }
});

/**
 * API: updateTasks
 * @param empId
 * updates the employee arrays
 */

  router.put('/:empId/tasks', async(req, res) => {
      try{
            Employee.findOne({'empId': req.params.empId}, function (err,employee)
            {
                if(err)
              {

                console.log(err);   //outputs mongoDB error

                const updateTaskMongodbException = new BaseResponse('500', 'Internal sever error ${err.message}', null);

                res.status(500).send(updateTaskMongodbException.toObject());
            }
            else
            {
                console.log(employee);

                if(employee)              //if employee is found, appends the previous array with the newly inputed array
                {

                  employee.set({
                    todo: req.body.todo,
                    done: req.body.done
                  });

                  employee.save(function(err,updatedEmployee){
                      if(err)
                      {
                        console.log(err);            //if mongoDB has an error when saving updated employee output is displayed here

                        const updateTaskMongodbError = new BaseResponse('500', 'Internal server error ${err.message}', null);

                        res.status(500).send(updateTaskMongodbError.toObject());
                      }
                      else
                      {
                        console.log(updatedEmployee); // successful query response

                        const updatedTaskSuccessResponse = new BaseResponse('200', 'Query successful', updatedEmployee);

                        res.status(200).send(updatedTaskSuccessResponse.toObject());
                      }
                  })

                }

                else{
                      console.log('invalid employeeId! ${req.params.empId} was not a valid entry.');  //invalid employee entry output

                      const invalidEmployeeIdResponse = new BaseResponse('200', 'Query successful', updatedEmployee);

                      res.status(200).send(invalidEmployeeIdResponse.toObject());

                }

            }



            })
      }
      catch (e) {
        console.log(e);            //server error output

        const creatTaskCatchExcecption = new BaseResponse('500', 'Internal Server Error: ${e.message}', null)
        res.json(creatTaskCatchExcecption.toObject());
    }
  });

/**
 * API: deleteTasks
 * @param empId
 * @param taskId
 * deletes tasks with matching uniqe Id numbers
 */


  router.delete("/:empId/tasks/:taskId", async (req, res) => {
    try {
            Employee.findOne({ empId: req.params.empId }, function (err, employee) {
            if (err)
            {
              console.log(err);      //catches mongoDB server error

              const deleteTaskMongodbError = new BaseResponse("500",`Internal server error ${err.message}`,null);

              res.status(500).send(deleteTaskMongodbError.toObject());
            }
            else {

             console.log(employee);         //upon succesful matching criteria, an item object is generated

             const todoItem = employee.todo.find((item) => item._id.toString() === req.params.taskId);

             const doneItem = employee.done.find((item) => item._id.toString() === req.params.taskId);
           // When a todo item id is matched, remove() is used to remove it from the array, various catches are used to gracefully handle any errors
          if (todoItem)
          {
            console.log(todoItem);

            employee.todo.id(todoItem._id).remove();

            employee.save(function (err, updatedTodoItemEmployee) {
              if (err) {console.log(err);

                const deleteTodoItemMongodbError = new BaseResponse("500",`Internal server error ${err.message}`,null);

                res.status(500).send(deleteTodoItemMongodbError.toObject());
              }

              else {
                console.log(updatedTodoItemEmployee);

                const deleteTodoItemSuccess = new BaseResponse("200","Query successful", updatedTodoItemEmployee);

                res.status(200).send(deleteTodoItemSuccess.toObject());
              }
            });
          }
            // When a done item id is matched, remove() is used to remove it from the array, various catches are used to gracefully handle any errors
            else if (doneItem) {

            console.log(doneItem);

            employee.done.id(doneItem._id).remove();

            employee.save(function (err, updatedDoneItemEmployee) {
              if (err) {
                console.log(err);

                const deleteDoneItemMongodbError = new BaseResponse("500",`Internal server error ${err.message}`,null);

                res.status(500).send(deleteDoneItemMongodbError.toObject());
              }
              else {

                console.log(updatedDoneItemEmployee);

                const deleteDoneItemSuccess = new BaseResponse("200","Query Successful",updatedDoneItemEmployee);

                res.status(200).send(deleteDoneItemSuccess);
              }
            });
          }

             else {  //output when no taskId matches the query
            console.log(`Invalid taskId: passed-in value ${req.params.taskId}`);

            const invalidTaskIdResponse = new BaseResponse("200","Invalid taskId", null);

            res.status(200).send(invalidTaskIdResponse.toObject());
          }
        }
      });
    }
    catch (e) {
      console.log(e);          //internal server error output

      const deleteTaskCatchError = new BaseResponse("500",`Internal server error ${e.message}`,null);

      res.status(500).send(deleteTaskCatchError.toObject());
    }
  });

  /**
 * API: findAllTasks
 * @param empId
 * @param tasks
 * finds all tasks
 */

  router.get("/:empId/tasks", async (req, res) => {
    try {
      Employee.findOne({ empId: req.params.empId },"empId todo done",
        function (err, employee) {
          if (err) {
                    console.log(err);

                    const mongoDBFindAllTasksException = new BaseResponse("500", `Internal server error ${err.message}`, null);

                    res.status(500).send(mongoDBFindAllTasksException.toObject());
                   }
          else {
                  console.log(employee);

                  const employeeTaskResponse = new BaseResponse("200", "Query successful" , employee);

                  res.status(200).send(employeeTaskResponse.toObject());
               }
        }
      );
    } catch (e) {
      const findAllTasksError = new BaseResponse("500", `Internal server error ${e.message}`, null
      );

      res.status(500).send(findAllTasksError.toObject());
    }
  });




module.exports = router;
