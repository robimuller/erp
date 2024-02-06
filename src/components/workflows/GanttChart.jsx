import React, { useState, useEffect } from 'react';
import { Gantt } from "react-virtual-gantt";
import './AddWorkflowForm.css';
import { collection, addDoc, updateDoc, doc, getDocs, FieldValue } from "firebase/firestore";
import db from '../../firebase-config';
import { arrayUnion } from "firebase/firestore";


// New Task Form Component
const NewTaskForm = ({ onAddTask, parentTasks }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [parentTaskKey, setParentTaskKey] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        onAddTask({
            title,
            data: {
                startDate: new Date(startDate).toISOString(),
                endDate: new Date(endDate).toISOString()
            }
        }, parentTaskKey);
        setTitle('');
        setStartDate('');
        setEndDate('');
        setParentTaskKey('');
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <div className="row g-3 align-items-end">
                <div className="col-md-3">
                    <label htmlFor="taskTitle" className="form-label">Munkamenet</label>
                    <input
                        type="text"
                        className="form-control"
                        id="taskTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Pl.: Centrifugálás"
                    />
                </div>

                <div className="col-md-3">
                    <label htmlFor="startDate" className="form-label">Kezdés</label>
                    <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <label htmlFor="endDate" className="form-label">End Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <label htmlFor="parentTask" className="form-label">Fő munkamenet</label>
                    <select
                        className="form-control"
                        id="parentTask"
                        value={parentTaskKey}
                        onChange={(e) => setParentTaskKey(e.target.value)}
                    >
                        <option value="">-</option>
                        {parentTasks.map(task => (
                            <option key={task.key} value={task.key}>{task.title}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-2">
                    <button type="submit" className="btn-primary">Add Task</button>
                </div>
            </div>
        </form>
    );
};

// Home Component
export default function GanttChart() {
    const [ganttData, setGanttData] = useState([]);

    const addTask = async (newTask, parentKey) => {
        const workflowsCollection = collection(db, "Workflows");

        if (parentKey) {
            // Update an existing parent task with a new child
            setGanttData(ganttData.map(task => {
                if (task.key === parentKey) {
                    const updatedTask = {
                        ...task,
                        children: [...task.children, {
                            key: `${parentKey}.${task.children.length + 1}`,
                            title: newTask.title,
                            data: newTask.data,
                            children: []
                        }]
                    };

                    // Update Firestore document for the parent task
                    const parentDocRef = doc(db, "Workflows", parentKey);
                    updateDoc(parentDocRef, {
                        subWorkflow: arrayUnion({
                            subWorkflowTitle: newTask.title,
                            subStartDate: newTask.data.startDate,
                            subEndDate: newTask.data.endDate
                        })

                    });

                    return updatedTask;
                }
                return task;
            }));
        } else {
            // Add a new parent task
            const newKey = `Task ${ganttData.length + 1}`;
            setGanttData([...ganttData, {
                key: newKey,
                title: newTask.title,
                data: newTask.data,
                children: []
            }]);

            // Add a new document to Firestore
            await addDoc(workflowsCollection, {
                key: newKey, // or any unique identifier you prefer
                workflowTitle: newTask.title,
                startDate: newTask.data.startDate,
                endDate
                    : newTask.data.endDate ? newTask.data.endDate : null, // Handle optional endDate
                subWorkflow: []
            });
        }
    };

    // Fetch tasks from Firestore on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            const querySnapshot = await getDocs(collection(db, "Workflows"));
            const tasks = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    key: doc.id,
                    title: data.workflowTitle,
                    data: {
                        startDate: data.startDate,
                        endDate: data.endDate,
                        // Assuming no repeatable tasks, so no additional fields are necessary
                    },
                    children: data.subWorkflow.map((sub, index) => ({
                        key: `${doc.id}.${index + 1}`,
                        title: sub.subWorkflowTitle,
                        data: {
                            startDate: sub.subStartDate,
                            endDate: sub.subEndDate,
                            // Add other necessary fields for children here
                        },
                        children: [] // Assuming no further nesting in sub-tasks
                    }))
                };
            });
            setGanttData(tasks);
        };

        fetchTasks().then(() => {
            console.log("Fetched tasks:", ganttData);
        });
    }, []);

    const handleTaskMove = async (movedTask) => {
        // Update local state
        console.log("Moved Task:", movedTask); // Debugging

        const updatedGanttData = ganttData.map(task =>
            task.key === movedTask.key ? { ...task, ...movedTask } : task
        );
        setGanttData(updatedGanttData);

        // Update Firestore
        const taskDocRef = doc(db, "Workflows", movedTask.key);
        try {
            await updateDoc(taskDocRef, {
                startDate: movedTask.data.startDate,
                endDate: movedTask.data.endDate
            });
        } catch (error) {
            console.error("Error updating task in Firestore:", error);
        }
    };


    const parentTasks = ganttData.filter(task => !task.key.includes('.'));

    return (
        <main style={{ padding: "16px", height: "85vh" }}>
            <NewTaskForm onAddTask={addTask} parentTasks={parentTasks} />
            <br />

            <Gantt>
                <Gantt.Controls />
                <Gantt.Chart data={ganttData} onTaskMove={handleTaskMove} />
            </Gantt>
        </main>
    );
}
