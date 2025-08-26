# Bl.Express
Project created for studies purposes

## Debug facilities
To help to debug the project, we can install `npm install -g nodemon`.
And then, to execute the project you can type `nodemon index.js`.


### Express annotations
Utils Express tools to improve your app quality and development.

### Middlewares
Runs between the requests, being a valuable resource for global control, logging, so on...
How to use:
```js
app.use(/*put here your middleware handler*/);
```

## Best libraries
- morgan: This library is used to log information `https://www.npmjs.com/package/morgan`.
- body-parser: Parse URL-Encoded to objects `https://www.npmjs.com/package/body-parser`.

## EJS (Embedded JavaScript)
Interpolate JS in the middle of the HTML, being processed by the browser.
That's how the EJS TAGS work:

- `<%= variable %>` JS Output
- `<% console.log("hello") %>` JS Execute
- `<%- <h1>Hello</h1> %>` Render HTML
- `<%# this is a comment %>` EJS code comment
- `<%% %%>`Show `<%` or `%>`.
- `<%- include("header.ejs") %>` Insert another EJS file