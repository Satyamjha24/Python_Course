import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://todo-typescript-ddgu.onrender.com/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createTodo(todo: any): Observable<any> {
    return this.http.post(this.apiUrl, todo);
  }

  updateTodo(id: number, todo: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, todo);
  }

  deleteTodo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
