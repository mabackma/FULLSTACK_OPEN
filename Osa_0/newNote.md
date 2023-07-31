sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: User types a new note into the text field
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>database: Save the new note (data: { "content": "New note content", "date":"2023-07-31" })
    activate database
    database-->>server: Confirmation: Note saved
    deactivate database
    server-->>browser: Redirect to https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    Note right of browser: The browser reloads the page at the new URL
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document with the updated notes list
    deactivate server

    Note right of browser: The browser displays the updated notes list on the page