// Enum for departments
enum Department {
  Engineering = "Engineering",
  HR = "HR",
  Sales = "Sales",
}

// Employee Interface
interface Employee {
  id: string;
  name: string;
  department: Department;
  salary: number;
}

// Employee Class
class EmployeeClass implements Employee {
  constructor(public id: string, public name: string, public department: Department, public salary: number) {}
}

// Employee Service for CRUD operations
class EmployeeService {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): string {
    if (this.employees.find(emp => emp.id === employee.id)) {
      return "Employee ID must be unique.";
    }
    if (!this.isValidSalary(employee)) {
      return "Invalid salary for the selected department.";
    }
    this.employees.push(employee);
    return "Employee added successfully.";
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  updateEmployee(updatedEmployee: Employee): string {
    const employee = this.employees.find(emp => emp.id === updatedEmployee.id);
    if (employee) {
      if (!this.isValidSalary(updatedEmployee)) {
        return "Invalid salary for the selected department.";
      }
      employee.name = updatedEmployee.name;
      employee.department = updatedEmployee.department;
      employee.salary = updatedEmployee.salary;
      return "Employee updated successfully.";
    }
    return "Employee not found.";
  }

  deleteEmployee(id: string): string {
    this.employees = this.employees.filter(emp => emp.id !== id);
    return "Employee deleted successfully.";
  }

  private isValidSalary(employee: Employee): boolean {
    const salaryRanges: { [key in Department]: [number, number] } = {
      [Department.Engineering]: [50000, 200000],
      [Department.HR]: [30000, 100000],
      [Department.Sales]: [40000, 150000],
    };
    const [min, max] = salaryRanges[employee.department];
    return employee.salary >= min && employee.salary <= max;
  }
}

// Initialize Service
const employeeService = new EmployeeService();
const addEmployeeButton = document.getElementById("addEmployeeButton") as HTMLButtonElement;
const updateEmployeeButton = document.getElementById("updateEmployeeButton") as HTMLButtonElement;
let selectedEmployeeId: string | null = null;

// Add Employee
addEmployeeButton.onclick = () => {
  const employee = getEmployeeFormData();
  if (employee) {
    const result = employeeService.addEmployee(employee);
    if (result === "Employee added successfully.") {
      renderEmployeeTable();
      resetForm();
      alert(result);
    } else {
      displayError(result);
    }
  }
};

// Update Employee
updateEmployeeButton.onclick = () => {
  if (selectedEmployeeId) {
    const employee = getEmployeeFormData();
    if (employee) {
      employee.id = selectedEmployeeId; // Ensure ID does not change on update
      const result = employeeService.updateEmployee(employee);
      if (result === "Employee updated successfully.") {
        renderEmployeeTable();
        resetForm();
        alert(result);
      } else {
        displayError(result);
      }
    }
  }
};

// Helper Functions
function getEmployeeFormData(): Employee | null {
  const id = (document.getElementById("employeeId") as HTMLInputElement).value;
  const name = (document.getElementById("employeeName") as HTMLInputElement).value;
  const department = (document.getElementById("employeeDepartment") as HTMLSelectElement).value as Department;
  const salary = parseInt((document.getElementById("employeeSalary") as HTMLInputElement).value);

  if (!id || !name || department === "" || isNaN(salary)) {
    displayError("All fields are required.");
    return null;
  }

  return new EmployeeClass(id, name, department, salary);
}

function renderEmployeeTable(): void {
  const employeeTableBody = document.querySelector("#employeeTable tbody") as HTMLElement;
  employeeTableBody.innerHTML = "";
  employeeService.getEmployees().forEach(employee => {
    const row = `<tr>
      <td>${employee.id}</td>
      <td>${employee.name}</td>
      <td>${employee.department}</td>
      <td>${employee.salary}</td>
      <td>
        <button onclick="editEmployee('${employee.id}')">Edit</button>
        <button onclick="deleteEmployee('${employee.id}')">Delete</button>
      </td>
    </tr>`;
    employeeTableBody.innerHTML += row;
  });
}

function editEmployee(id: string): void {
  const employee = employeeService.getEmployees().find(emp => emp.id === id);
  if (employee) {
    (document.getElementById("employeeId") as HTMLInputElement).value = employee.id;
    (document.getElementById("employeeName") as HTMLInputElement).value = employee.name;
    (document.getElementById("employeeDepartment") as HTMLSelectElement).value = employee.department;
    (document.getElementById("employeeSalary") as HTMLInputElement).value = employee.salary.toString();
    selectedEmployeeId = id;
    addEmployeeButton.style.display = "none";
    updateEmployeeButton.style.display = "inline";
  }
}

function deleteEmployee(id: string): void {
  if (confirm("Are you sure you want to delete this employee?")) {
    const result = employeeService.deleteEmployee(id);
    alert(result);
    renderEmployeeTable();
  }
}

function displayError(message: string): void {
  alert(message);
}

function resetForm(): void {
  (document.getElementById("employeeForm") as HTMLFormElement).reset();
  selectedEmployeeId = null;
  addEmployeeButton.style.display = "inline";
  updateEmployeeButton.style.display = "none";
}

// Render initial table
renderEmployeeTable();