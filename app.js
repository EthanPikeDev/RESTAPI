const express = require('express')
const app = express();

//add middleware for json parsing in express
app.use(express.json());


//define some example projects
const projects = [
    { id: 1, name: "React Weather App", description: "This is a simple weather app built with react and the openweather API"},
    { id: 2, name: "React Calculator App", description: "This is a simple react calculator app"},
    { id: 3, name: "Online store", description: "This is a simple online store built with html, css and js"},
]; 

//Root folder view
app.get('/', (req, res) => {
    
    res.send("Please go to /api/projects to view the projects" );
});

//Project folder view
app.get('/api/projects', (req, res) => {
    
    res.send(projects);
});

//Add new project with post request
app.post('/api/projects', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        // 400 Bad request
        res.status(400).send('Name is required an should be atleast 3 characters');
        return;
    }
    //To add a new project name and description, the id is added automatically
    const project = {
        id: projects.length + 1,
        name: req.body.name,
        description: req.body.description

    };
    projects.push(project);
    res.send(project);

});


//Update a project using a PUT Request
app.put('/api/projects/:id', (req, res) => {
    //Lookup the project with the id
    //if doesnt exist retunr 404
    const project = projects.find(c => c.id === parseInt(req.params.id));
    if (!project) {
        res.status(404).send('The project with the given id was not found');
        return;
    }

    //update project
    project.name = req.body.name;
    project.description = req.body.description;
    //return updated project to client
    res.send(project);
});


//Delete a project using a DELETE Request
app.delete('/api/projects/:id', (req, res) => {
    //Look up the course
    // if doesnt exist return 404
    const project = projects.find(c => c.id === parseInt(req.params.id));
    if (!project)  {
        res.status(404).send('The project with the given id was not found');
        return;
    }
    
    //delete
    const index = projects.indexOf(project);
    projects.splice(index, 1);
    
    //return response to the client
    res.send(project);

})


//Get request to lookup specific project based on their ID
app.get('/api/projects/:id', (req, res) => {
    const project = projects.find(c => c.id === parseInt(req.params.id));
    if (!project) {
        res.status(404).send('The project with the given id was not found');
        res.send(project);
        return;
    }
});



//set enviroment variable for the port to listen on 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});