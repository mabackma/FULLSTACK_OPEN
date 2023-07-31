sequenceDiagram
    participant browser
    participant server
    participant database

    Note right of browser: User types a new note into the text field and clicks Save
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>database: Save the new note (data: { "content": "New note content", "date":"2023-07-31" })
    activate database
    database-->>server: Confirmation: Note saved
    deactivate database
    server-->>browser: Response: status code "200 OK"
    deactivate server

    Note right of browser: The browser updates the notes list on the screen
    