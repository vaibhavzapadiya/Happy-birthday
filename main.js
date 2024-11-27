<div>
  <form [formGroup]="addform" (ngSubmit)="onSubmit()">
    <div>
      <label for="name">Name:</label>
      <input id="name" formControlName="name" />
      <div *ngIf="addform.get('name')?.invalid && addform.get('name')?.touched">
        Name is required.
      </div>
    </div>

    <div>
      <label for="email">Email:</label>
      <input id="email" formControlName="email" type="email" />
      <div *ngIf="addform.get('email')?.invalid && addform.get('email')?.touched">
        Valid email is required.
      </div>
    </div>

    <div>
      <label for="department">Department:</label>
      <input id="department" formControlName="department" />
      <div *ngIf="addform.get('department')?.invalid && addform.get('department')?.touched">
        Department is required.
      </div>
    </div>

    <button type="submit">{{ editmode ? 'Update Employee' : 'Add Employee' }}</button>
    <button type="button" *ngIf="editmode" (click)="cancelEdit()">Cancel Edit</button>
  </form>

  <div *ngIf="errmsg" class="error">{{ errmsg }}</div>

  <h3>Employee List</h3>
  <ul>
    <li *ngFor="let employee of employees; let i = index">
      {{ employee.name }} - {{ employee.email }} - {{ employee.department }}
      <button (click)="editemployee(i)">Edit</button>
      <button (click)="deleteemployee(i)">Delete</button>
    </li>
  </ul>
</div>