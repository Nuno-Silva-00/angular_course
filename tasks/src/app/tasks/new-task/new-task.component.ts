import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  close = output<void>();
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDueDate = signal('');

  constructor(private taskService: TasksService) {}

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.taskService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        dueDate: this.enteredDueDate(),
      },
      this.userId()
    );
    this.onCancel();
  }
}
