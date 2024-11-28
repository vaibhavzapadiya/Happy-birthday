<div class="container">
  <h2>Add Employee</h2>

  <form [formGroup]="addform" (ngSubmit)="onSubmit()">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" formControlName="name" required>
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" class="form-control" id="email" formControlName="email" required>
    </div>

    <div class="mb-3">
      <label for="department" class="form-label">Department</label>
      <input type="text" class="form-control" id="department" formControlName="department" required>
    </div>

    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button type="submit" class="btn btn-primary me-md-2" *ngIf="!editmode">Add Employee</button>
      <button type="submit" class="btn btn-primary" *ngIf="editmode">Update Employee</button>
      <button type="button" class="btn btn-secondary" (click)="cancelEdit()" *ngIf="editmode">Cancel</button>
    </div>
  </form>

  <div *ngIf="errmsg">
    <alert type="danger" [dismissible]="false">{{ errmsg }}</alert>
  </div>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let employee of employees; let i = index">
        <td>{{ employee.name }}</td>
        <td>{{ employee.email }}</td>
        <td>{{ employee.department }}</td>
        <td>
          <button type="button" class="btn btn-sm btn-warning me-2" (click)="editemployee(i)">Edit</button>
          <button type="button" class="btn btn-sm btn-danger" (click)="deleteemployee(i)" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this employee? This action cannot be undone.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-danger" (click)="deleteemployee(editindex)" data-bs-dismiss="modal">Delete</button>
        </div>
      </div>
    </div>
  </div>
</div>
