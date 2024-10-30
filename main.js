enum Department {
  Engineering = "Engineering",
  HR = "HR",
  Sales = "Sales",
}

interface Employee {
  id: string;
  name: string;
  department: Department;
  salary: number;
}

class EmployeeService {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): string | void {
    if (this.employees.some((e) => e.id === employee.id)) {
      this.showError("idError", "Employee ID must be unique.");
      return;
    }
    if (!this.validateSalary(employee.salary, employee.department)) {
      this.showError("salaryError", "Invalid salary for the selected department.");
      return;
    }
    this.employees.push(employee);
    this.clearErrors();
    this.displayEmployees();
  }

  updateEmployee(employee: Employee): void {
    const existingEmployee = this.employees.find((e) => e.id === employee.id);
    if (existingEmployee) {
      existingEmployee.name = employee.name;
      existingEmployee.department = employee.department;
      existingEmployee.salary = employee.salary;
      this.displayEmployees();
    }
  }

  deleteEmployee(id: string): void {
    this.employees = this.employees.filter((e) => e.id !== id);
    this.displayEmployees();
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  private validateSalary(salary: number, department: Department): boolean {
    if (department === Department.Engineering) return salary >= 50000 && salary <= 200000;
    if (department === Department.HR) return salary >= 30000 && salary <= 100000;
    if (department === Department.Sales) return salary >= 40000 && salary <= 150000;
    return false;
  }

  private showError(controlId: string, message: string) {
    const element = document.getElementById(controlId);
    if (element) element.textContent = message;
  }

  private clearErrors() {
    this.showError("nameError", "");
    this.showError("idError", "");
    this.showError("departmentError", "");
    this.showError("salaryError", "");
  }

  displayEmployees() {
    const tableBody = document.querySelector("#employeeTable tbody") as HTMLTableSectionElement;
    tableBody.innerHTML = "";
    this.employees.forEach((employee) => {
      const row = tableBody.insertRow();
      row.insertCell(0).textContent = employee.name;
      row.insertCell(1).textContent = employee.id;
      row.insertCell(2).textContent = employee.department;
      row.insertCell(3).textContent = employee.salary.toString();
      const actionsCell = row.insertCell(4);
      actionsCell.innerHTML = `
        <button id="edit${employee.id}">Edit</button>
        <button id="delete${employee.id}">Delete</button>
      `;
    });
  }
}

// Initialize
const service = new EmployeeService();

document.getElementById("addEmployeeButton")!.addEventListener("click", () => {
  const name = (document.getElementById("employeeName") as HTMLInputElement).value;
  const id = (document.getElementById("employeeId") as HTMLInputElement).value;
  const department = (document.getElementById("employeeDepartment") as HTMLSelectElement).value as Department;
  const salary = +(document.getElementById("employeeSalary") as HTMLInputElement).value;

  if (!name) service.showError("nameError", "Name is required.");
  if (!id) service.showError("idError", "Employee ID is required.");
  if (department === "Select a department") service.showError("departmentError", "Department is required.");
  if (!salary) service.showError("salaryError", "Salary is required.");

  if (name && id && department !== "Select a department" && salary) {
    service.addEmployee({ id, name, department, salary });
  }
});

document.getElementById("employeeTable")!.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.id.startsWith("delete")) {
    const id = target.id.replace("delete", "");
    if (confirm("Are you sure you want to delete this employee?")) {
      service.deleteEmployee(id);
    }
  }
});