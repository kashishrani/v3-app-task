const app = require('express')();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { User, Task } = require('./models/schema');
const dotenv = require('dotenv');

app.use(bodyParser.json());
dotenv.config();

const db_uri = process.env.DATABASE_URI || "mongodb://localhost:27017";

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

async function run() {
    try {
        const conn = await mongoose.connect(db_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Database Connected on Port ${conn.connection.port} ... ${conn.connection.host}`);
    } catch (error) {
        if (error == "MongoNetworkError") {
            console.log("MongoNetworkError - No connection")
        }
        console.log(error)
    }

}
run().catch(console.dir);

app.post('/tasks', async (req, res) => {
    const { title, description, deadline } = req.body;
    // let deadline_date = new Date(deadline)
    // console.log(deadline_date);
    const task = await new Task({ title, description, deadline });
    const created_task = await task.save();
    // console.log(created_task);

    res.status(200).json({ task: created_task })
})

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    // console.log(tasks);
    return res.json({ tasks })
})

app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    // console.log(task);
    return res.json({ task })
})

app.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, deadline, isCompleted } = req.body;

    // Check if the task exists
    const task = await Task.findById(id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task
    task.title = title;
    task.description = description;
    task.deadline = deadline;
    task.isCompleted = Boolean(isCompleted)

    // Save the task
    try {
        await task.save();
    } catch (error) {
        return res.status(500).json({ error });
    }

    // Return the updated task
    return res.json({ updatedTask: task });
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Task.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).send({ deletedId: id });
});

app.get("/", (req, res) => {
    res.send("hi")
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server started at ${port}`);
})