# Plan

- backdrop / modal
- drag and drop
- search
- typeahead

# Data model

- User
- Group
- Tasklist
- Task
- Action
- Resource
- Todo

# API

### user

- POST /api/signup
- POST /api/signin

- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PATCH /api/tasks/:id
- DELETE /api/tasks/:id

- GET/POST/PATCH/DELETE /api/actions, /api/actions/:id
- GET/POST/PATCH/DELETE /api/resources, /api/resources/:id
- GET/POST/PATCH/DELETE /api/todos, /api/todos/:id

### utility

- GET /api/object/:entity/:id
- GET/POST/PATCH/DELETE /api/user/:usedId/todos/:todoId

### admin

- GET/POST/PATCH/DELETE /api/admin/users, /api/admin/users/:id

- GET/POST/PATCH/DELETE /api/admin/groups, /api/admin/groups/:id
- POST /api/admin/groups/:id/user/:id
- DELETE /api/admin/groups/:id/user/:id

- GET/POST/PATCH/DELETE /api/admin/tasklists, /api/admin/tasklists/:id
- POST /api/admin/tasklists/:id/group/:id
- DELETE /api/admin/tasklists/:id/group/:id

# Menus:

## Auth

- Sign up
- Sign in
- Sign out

## User

- Home
- Tasklists
- Pinned: List of objects: Tasklist, Task, Action, Resource, etc
- Profile: Groups, Tasklists, Requests for joining a group (POST /group/:groupId/user/:userId WITH ADMIN ROLE)

## Admin:

- Groups
- Users
- Tasklists

# Components:

- Navbar
- Main

# Pages

- Auth: SignUp
- Auth: SignIn

- User: Home - Latest pending tasks
  => filter by Tasklist, User, Status, Date
  => find typeahead
- User: Tasklists
  => find typeahead
- User: Tasklist
  => filter tasks by status sort by date
  => find typeahead
  => popup: add Group
  => popup: add Task
- User: Task
  => filter actions by contributor sort by date
  => navigate: add/edit Action
- User: Action
- User: Resource

- Admin: Groups => find typeahead
- Admin: Group
- Admin: Users => find typeahead
- Admin: User
- Admin: Tasklists => find typeahead
- Admin: Tasklist
