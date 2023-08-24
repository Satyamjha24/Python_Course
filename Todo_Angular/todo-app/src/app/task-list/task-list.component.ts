import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';
  newTaskCompleted: boolean = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.tasks = todos;
    });
  }

  createNewTask(): void {
    const newTask = {
      title: this.newTaskTitle,
      completed: false,
    };

    this.todoService.createTodo(newTask).subscribe((createdTask) => {
      this.tasks.push(createdTask);
      this.newTaskTitle = ''; // Clear input after creation
      this.newTaskCompleted = false;
    });
  }

  editTask(task: any): void {
    task.editing = true;
    task.editTitle = task.title;
    task.editCompleted = task.completed;
  }

  saveTask(task: any): void {
    task.editing = false;
    const updatedTask = {
      id: task.id,
      title: task.editTitle,
      completed: task.editCompleted,
    };
    this.todoService.updateTodo(updatedTask.id, updatedTask).subscribe((updatedTask) => {
      // Update tasks array or perform other updates
      const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    });
  }

  deleteTask(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
