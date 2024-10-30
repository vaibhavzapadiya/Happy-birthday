// employee.model.ts
export enum Department {
  Engineering = "Engineering",
  HR = "HR",
  Sales = "Sales",
}

export interface IEmployee {
  id: string;
  name: string;
  department: Department;
  salary: number;
}

export class Employee implements IEmployee {
  constructor(
    public id: string,
    public name: string,
    public department: Department,
    public salary: number
  ) {}
}

// employee.service.ts
import { Employee, Department } from './employee.model';

export class EmployeeService {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): string {
    if (this.employees.some(emp => emp.id === employee.id)) {
      return "Employee ID must be unique.";
    }

    if (!this.isValidSalary(employee.department, employee.salary)) {
      return `Invalid salary for the ${employee.department} department.`;
    }

    this.employees.push(employee);
    return "Employee added successfully.";
  }

  viewEmployees(): Employee[] {
    return this.employees;
  }

  updateEmployee(employeeId: string, name: string, department: Department, salary: number): string {
    const employee = this.employees.find(emp => emp.id === employeeId);
    if (!employee) return "Employee not found.";

    if (!this.isValidSalary(department, salary)) {
      return `Invalid salary for the ${department} department.`;
    }

    employee.name = name;
    employee.department = department;
    employee.salary = salary;
    return "Employee updated successfully.";
  }

  deleteEmployee(employeeId: string): string {
    const index = this.employees.findIndex(emp => emp.id === employeeId);
    if (index === -1) return "Employee not found.";

    this.employees.splice(index, 1);
    return "Employee deleted successfully.";
  }

  private isValidSalary(department: Department, salary: number): boolean {
    const salaryRanges = {
      [Department.Engineering]: { min: 50000, max: 200000 },
      [Department.HR]: { min: 30000, max: 100000 },
      [Department.Sales]: { min: 40000, max: 150000 },
    };
    const { min, max } = salaryRanges[department];
    return salary >= min && salary <= max;
  }
}

// main.ts
import { EmployeeService } from './employee.service';
import { Employee, Department } from './employee.model';

const service = new EmployeeService();
let isEditing = false;
let currentEmployeeId: string = "";

const formElements = {
  id: document.getElementById("employeeId") as HTMLInputElement,
  name: document.getElementById("employeeName") as HTMLInputElement,
  department: document.getElementById("employeeDepartment") as HTMLSelectElement,
  salary: document.getElementById("employeeSalary") as HTMLInputElement,
  addBtn: document.getElementById("addEmployeeButton") as HTMLButtonElement,
  updateBtn: document.getElementById("updateEmployeeButton") as HTMLButtonElement,
};

function addEmployee() {
  const id = formElements.id.value.trim();
  const name = formElements.name.value.trim();
  const department = formElements.department.value as Department;
  const salary = parseFloat(formElements.salary.value);

  const employee = new Employee(id, name, department, salary);
  const result = service.addEmployee(employee);
  alert(result);
  if (result === "Employee added successfully.") refreshEmployeeList();
}

function updateEmployee() {
  const name = formElements.name.value.trim();
  const department = formElements.department.value as Department;
  const salary = parseFloat(formElements.salary.value);

  const result = service.updateEmployee(currentEmployeeId, name, department, salary);
  alert(result);
  if (result === "Employee updated successfully.") {
    isEditing = false;
    formElements.updateBtn.style.display = "none";
    formElements.addBtn.style.display = "inline-block";
    refreshEmployeeList();
  }
}

function deleteEmployee(id: string) {
  const result = service.deleteEmployee(id);
  alert(result);
  refreshEmployeeList();
}

function refreshEmployeeList() {
  const tableBody = document.querySelector("#employeeTable tbody");
  if (tableBody) {
    tableBody.innerHTML = "";
    service.viewEmployees().forEach(employee => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>
          <button id="edit${employee.id}" onclick="editEmployee('${employee.id}')">Edit</button>
          <button id="delete${employee.id}" onclick="deleteEmployee('${employee.id}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
}

function editEmployee(id: string) {
  isEditing = true;
  currentEmployeeId = id;
  formElements.updateBtn.style.display = "inline-block";
  formElements.addBtn.style.display = "none";
  // Populate form with current employee details
  const employee = service.viewEmployees().find(emp => emp.id === id);
  if (employee) {
    formElements.id.value = employee.id;
    formElements.name.value = employee.name;
    formElements.department.value = employee.department;
    formElements.salary.value = employee.salary.toString();
  }
}

// Event listeners
formElements.addBtn.addEventListener("click", addEmployee);
formElements.updateBtn.addEventListener("click", updateEmployee);
refreshEmployeeList();