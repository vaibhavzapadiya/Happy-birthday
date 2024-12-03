<form [formGroup]="studentForm" id="studentForm" (ngSubmit)="onSubmit()">
  <h2>Student Information</h2>
  <label for="firstName">First Name</label>
  <input id="firstName" formControlName="firstName" />
  <div *ngIf="studentForm.get('firstName')?.invalid && studentForm.get('firstName')?.touched">
    First Name is required.
  </div>

  <label for="middleName">Middle Name</label>
  <input id="middleName" formControlName="middleName" />
  <div *ngIf="studentForm.get('middleName')?.invalid && studentForm.get('middleName')?.touched">
    Middle Name is required.
  </div>

  <!-- Add remaining fields for student information similarly -->

  <h2>Father Information</h2>
  <label for="fatherFullName">Full Name</label>
  <input id="fatherFullName" formControlName="fatherFullName" />
  <div *ngIf="studentForm.get('fatherFullName')?.invalid && studentForm.get('fatherFullName')?.touched">
    Father's Full Name is required.
  </div>

  <!-- Add remaining fields for father's information similarly -->

  <h2>Mother Information</h2>
  <label for="motherFullName">Full Name</label>
  <input id="motherFullName" formControlName="motherFullName" />
  <div *ngIf="studentForm.get('motherFullName')?.invalid && studentForm.get('motherFullName')?.touched">
    Mother's Full Name is required.
  </div>

  <!-- Add remaining fields for mother's information similarly -->

  <h2>Emergency Contacts</h2>
  <div formArrayName="emergencyContacts">
    <div *ngFor="let contact of emergencyContacts.controls; let i = index" [formGroupName]="i">
      <label for="{{ 'emergencyContact' + i }}">Relation</label>
      <select [id]="'emergencyContact' + i" formControlName="relation">
        <option value="Sibling">Sibling</option>
        <option value="Uncle">Uncle</option>
        <option value="Aunt">Aunt</option>
        <option value="Grandparent">Grandparent</option>
      </select>
      <label for="{{ 'emergencyNumber' + i }}">Contact Number</label>
      <input [id]="'emergencyNumber' + i" formControlName="emergencyNumber" />
      <button type="button" (click)="removeEmergencyContact(i)">Remove</button>
    </div>
  </div>
  <button id="add-emergencyContacts" type="button" (click)="addEmergencyContact()">Add More</button>

  <button id="submit" type="submit">Submit</button>
</form>