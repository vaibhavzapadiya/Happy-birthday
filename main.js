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