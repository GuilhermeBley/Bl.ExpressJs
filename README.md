# Bl.Express
Project created for studies purposes

## Todo project
This is an example node project.
Go to `Bl.ExpressJs\src\todo` direactory and run the `docker-compose.yml` file to execute this app in your machine and go navigate to `http://localhost:3010/`.
![react-proj](https://github.com/user-attachments/assets/ac221b60-c7d8-45a2-a7e5-42e22c859e5f)

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


## Import and export modules
This import/export functionality is crucial for JavaScript development; that's why this allows you to share code/dependencies across your files, helping your code organization.

### Exportation
If you intend to use a specific file method/class in another part of the code, you can use the following instruction to set the functionality as importable:
```js
const myFunctionality = () => { }
export myFunctionality; // setting as importable
```

You can export multiple as well:
```js
const myFunctionality1 = () => { }
const myFunctionality2 = () => { }
export { myFunctionality2, myFunctionality1 }; // setting as importable
```

### Imports
The import could be interpreted as the use of the exportation; with this key word, you can effectively use the code from other files.
Having the previous example in mind, let's see how to use the `import`:
```js
import { myFunctionality2, myFunctionality1 } from './file.js'

const usingTheImports = () => { myFunctionality2(); }
```
You can see that the order of the method names doesn't matter, but the name is the most important.
There are several ways to use the import, but another important way is the following:
```js
import * as Example from './file.js'

const usingTheImports = () => { Example.myFunctionality2(); }
```
