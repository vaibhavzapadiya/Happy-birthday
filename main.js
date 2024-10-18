<form id="post_form">
    <select id="select_user">
        <option value="">Select User</option>
    </select>
    <p id="user_error" style="color: red;"></p>

    <input type="text" id="title" placeholder="Enter title" />
    <p id="title_error" style="color: red;"></p>

    <textarea id="description" placeholder="Enter description"></textarea>
    <p id="description_error" style="color: red;"></p>

    <input type="submit" id="add_post_btn" value="Submit" disabled />
</form>

<table id="post_table">
    <thead>
        <tr>
            <th>User</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
const userList = [/*... your user data */];
const postList = JSON.parse(localStorage.getItem('posts')) || [];

// Populate Dropdown
const userSelect = document.getElementById('select_user');
userList.forEach(user => {
    const option = document.createElement('option');
    option.value = user.id;
    option.text = user.name;
    userSelect.appendChild(option);
});

// Form Validation
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const submitBtn = document.getElementById('add_post_btn');

const errors = {
    user: document.getElementById('user_error'),
    title: document.getElementById('title_error'),
    description: document.getElementById('description_error'),
};

const validateForm = () => {
    let isValid = true;

    // User Validation
    if (userSelect.value === "") {
        errors.user.textContent = "Username required";
        isValid = false;
    } else {
        errors.user.textContent = "";
    }

    // Title Validation
    const titleValue = titleInput.value.trim();
    if (!titleValue) {
        errors.title.textContent = "Title required";
        isValid = false;
    } else if (titleValue.length < 4) {
        errors.title.textContent = "Title should have atleast 4 characters.";
        isValid = false;
    } else if (titleValue.length > 10) {
        errors.title.textContent = "Title should have atmost 10 characters.";
        isValid = false;
    } else {
        errors.title.textContent = "";
    }

    // Description Validation
    const descriptionValue = descriptionInput.value.trim();
    if (!descriptionValue) {
        errors.description.textContent = "Description required";
        isValid = false;
    } else if (descriptionValue.length < 10) {
        errors.description.textContent = "Description should have atleast 10 characters.";
        isValid = false;
    } else if (descriptionValue.length > 50) {
        errors.description.textContent = "Description should have atmost 50 characters.";
        isValid = false;
    } else {
        errors.description.textContent = "";
    }

    submitBtn.disabled = !isValid;
    return isValid;
};

// Bind posts to table
const bindPostsToTable = () => {
    const tbody = document.querySelector("#post_table tbody");
    tbody.innerHTML = ""; // Clear table
    postList.forEach(post => {
        const row = document.createElement('tr');
        const user = userList.find(user => user.id == post.user_id).name;
        row.innerHTML = `<td>${user}</td><td>${post.title}</td><td>${post.description}</td>`;
        tbody.appendChild(row);
    });
};

// Add Post
const addPost = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const newPost = {
        id: Date.now(),
        user_id: userSelect.value,
        user_name: userSelect.options[userSelect.selectedIndex].text,
        title: titleInput.value,
        description: descriptionInput.value,
    };

    postList.push(newPost);
    localStorage.setItem('posts', JSON.stringify(postList));
    bindPostsToTable();
    document.getElementById("post_form").reset();
    submitBtn.disabled = true;
};

// Event Listeners
document.getElementById('post_form').addEventListener('input', validateForm);
document.getElementById('post_form').addEventListener('submit', addPost);

// Load saved posts on refresh
bindPostsToTable();