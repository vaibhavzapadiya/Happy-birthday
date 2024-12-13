<div class="container mt-4">
  <h2 class="text-center">Product List</h2>

  <!-- Products Table -->
  <div class="table-responsive mt-4">
    <table class="table table-bordered table-hover text-center">
      <thead class="thead-dark">
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let product of paginatedProducts">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price | currency }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.category }}</td>
        </tr>
        <tr *ngIf="paginatedProducts.length === 0">
          <td colspan="5" class="text-muted">No products available.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <nav class="d-flex justify-content-center mt-4">
    <ul class="pagination">
      <li class="page-item" [class.disabled]="currentpage === 1">
        <button class="page-link" (click)="changepage(currentpage - 1)">
          Previous
        </button>
      </li>
      <li
        class="page-item"
        *ngFor="let page of [].constructor(totalpages); let i = index"
        [class.active]="currentpage === i + 1"
      >
        <button class="page-link" (click)="changepage(i + 1)">
          {{ i + 1 }}
        </button>
      </li>
      <li class="page-item" [class.disabled]="currentpage === totalpages">
        <button class="page-link" (click)="changepage(currentpage + 1)">
          Next
        </button>
      </li>
    </ul>
  </nav>
</div>