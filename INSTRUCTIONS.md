# Instructions

## Part 1

Functionality to add todos and mark them as completed or uncompleted exists. Implement the ability to update the “description” field of a given todo in the database.

## Part 2

Implement optimistic updates for updating the “completed” and “description” fields for a given todo. When a user creates a todo, toggles a todo completeness, or updates a todo description, those updates should be made immediately in the frontend of the application, before the updates are saved in the database. If the API responds with a success status, then the frontend updates are allowed to persist. If the API responds with an error status, the frontend update must be reverted.

Example:

1. Todo with id 2 is marked as completed. The frontend immediately shows that todo as complete, despite the change having not been persisted in the database.
2. The API responds with a 500 because todo 2 could not be saved.
3. The frontend must now revert the change to todo 2 and show it as incomplete.
