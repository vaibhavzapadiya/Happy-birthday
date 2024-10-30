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
      document.getElementById("idError")!.innerHTML = "Employee ID must be unique.";
      return;
    }
    if (!this.validateSalary(employee.salary, employee.department)) {
      document.getElementById("salaryError")!.innerHTML = "Invalid salary for the selected department.";
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

  if (!name) {
    document.getElementById("nameError")!.innerHTML = "Name is required.";
    return;
  }
  if (!id) {
    document.getElementById("idError")!.innerHTML = "Employee ID is required.";
    return;
  }
  if (department === "Select a department") {
    document.getElementById("departmentError")!.innerHTML = "Department is required.";
    return;
  }
  if (!salary) {
    document.getElementById("salaryError")!.innerHTML = "Salary is required.";
    return;
  }

  service.addEmployee({ id, name, department, salary });
}

function deleteEmployee(id: string) {
  if (confirm("Are you sure you want to delete this employee?")) {
    service.deleteEmployee(id);
  }
}

document.getElementById("addEmployeeButton")!.addEventListener("click", addEmployee);