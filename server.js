const express = require("express");

const server = express();
server.use(express.json());

server.get("/health", (req, res) => {
    res.json({
        status: "Running"
    })
})

let tasks = [
    {
      id: 1,
      name: "Comprar leite",
      description: "Ir no mercado da esquina e comprar leite",
      isDone: false
    },
    
]

server.get("/tasks", (req, res) => {
    const moreThan = req.query.more_than ? Number(req.query.more_than) : 0;
    res.json({
      tasks: tasks
            .filter((tasks) => {
                return moreThan < tasks
        })
    })
})

server.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => {
        return task.id === id;
    });
    res.json({
      task
    })
})

server.post("/tasks", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        name: req.body.name,
        description: req.body.description,
        isDone: req.body.isDone
    }
    tasks.push(newTask)
    res.json({
        task: newTask
    })
})

server.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => {
        return task.id === id;
    })
    if (!task) {
        return res.status(404).json({message: "Product not found"});
    }
    product.name = req.body.name;
    product.description = req.body.description;
    product.isDone= req.body.isDone;
    
    res.json({
      task
    })
})

server.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    tasks = tasks.filter((task) => {
        return task.id !== id;
    })
    res.status(204).send();
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});