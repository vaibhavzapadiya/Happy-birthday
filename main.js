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

  addEmployee(employee: Employee): void {
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

  deleteEmployee(id: string): void {
    this.employees = this.employees.filter((e) => e.id !== id);
    this.displayEmployees();
  }

  private validateSalary(salary: number, department: Department): boolean {
    if (department === Department.Engineering) return salary >= 50000 && salary <= 200000;
    if (department === Department.HR) return salary >= 30000 && salary <= 100000;
    if (department === Department.Sales) return salary >= 40000 && salary <= 150000;
    return false;
  }

  private showError(controlId: string, message: string) {
    document.getElementById(controlId)!.innerHTML = message;
  }

  private clearErrors() {
    document.getElementById("nameError")!.innerHTML = "";
    document.getElementById("idError")!.innerHTML = "";
    document.getElementById("departmentError")!.innerHTML = "";
    document.getElementById("salaryError")!.innerHTML = "";
  }

  displayEmployees() {
    const tableBody = document.getElementById("employeeTableBody") as HTMLElement;
    tableBody.innerHTML = ""; // Clear existing rows

    this.employees.forEach((employee) => {
      tableBody.innerHTML += `
        <tr>
          <td>${employee.name}</td>
          <td>${employee.id}</td>
          <td>${employee.department}</td>
          <td>${employee.salary}</td>
          <td>
            <button onclick="deleteEmployee('${employee.id}')">Delete</button>
          </td>
        </tr>`;
    });
  }
}

// Initialize
const service = new EmployeeService();

function addEmployee() {
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
}

function deleteEmployee(id: string) {
  if (confirm("Are you sure you want to delete this employee?")) {
    service.deleteEmployee(id);
  }
}

document.getElementById("addEmployeeButton")!.addEventListener("click", addEmployee);