<div class="container mt-4">
    <div class="form-group">
        <h3 class="mb-4">{{ editmode ? 'Edit Employee' : 'Add Employee' }}</h3>
        <form [formGroup]="addform" (ngSubmit)="onSubmit()" class="needs-validation">
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="name" class="form-label">Name:</label>
                    <input id="name" formControlName="name" class="form-control" />
                    <div *ngIf="addform.get('name')?.invalid && addform.get('name')?.touched" class="text-danger">
                        Name is required.
                    </div>
                </div>

                <div class="col-md-6">
                    <label for="email" class="form-label">Email:</label>
                    <input id="email" formControlName="email" type="email" class="form-control" />
                    <div *ngIf="addform.get('email')?.invalid && addform.get('email')?.touched" class="text-danger">
                        Valid email is required.
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="department" class="form-label">Department:</label>
                    <select id="department" formControlName="department" class="form-select">
                        <option value="">Select department</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Tech">Tech</option>
                    </select>
                    <div *ngIf="addform.get('department')?.invalid && addform.get('department')?.touched" class="text-danger">
                        Department is required.
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">
                    {{ editmode ? 'Update' : 'Add' }}
                </button>
                <button type="button" *ngIf="editmode" (click)="cancelEdit()" class="btn btn-warning">
                    Cancel Edit
                </button>
            </div>
        </form>

        <div *ngIf="errmsg" class="error text-danger mt-3">{{ errmsg }}</div>
    </div>

    <div id="displayrecord" class="mt-5">
        <h3>Employee List</h3>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let employee of employees; let i = index">
                    <td>{{ employee.name }}</td>
                    <td>{{ employee.email }}</td>
                    <td>{{ employee.department }}</td>
                    <td>
                        <button (click)="editemployee(i)" class="btn btn-primary btn-sm">Edit</button>
                        <button (click)="openDeleteModal(i)" class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<!-- Delete Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Are you sure you want to delete this employee?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" (click)="deleteemployee(selectedIndex)">Delete</button>
            </div>
        </div>
    </div>
</div>

<!-- Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit Employee</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form [formGroup]="addform">
                    <div class="mb-3">
                        <label for="editName" class="form-label">Name:</label>
                        <input id="editName" formControlName="name" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="editEmail" class="form-label">Email:</label>
                        <input id="editEmail" formControlName="email" type="email" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="editDepartment" class="form-label">Department:</label>
                        <select id="editDepartment" formControlName="department" class="form-select">
                            <option value="">Select department</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Tech">Tech</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" (click)="updateEmployee()">Save Changes</button>
            </div>
        </div>
    </div>
</div>