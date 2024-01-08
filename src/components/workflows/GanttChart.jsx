import React, { useEffect, useRef } from 'react';
import './GanttChart.css';
import { Timeline } from 'vis-timeline/standalone';
import { DataSet } from 'vis-data';

const GanttChart = ({ workflows, zoomLevel }) => {
    const timelineContainerRef = useRef(null);
    const timelineRef = useRef(null);
    const dataSetRef = useRef(null);

    useEffect(() => {
        if (timelineContainerRef.current && !timelineRef.current) {
            dataSetRef.current = new DataSet();
            const options = {
                    width: '100%',
                    height: '95vh',
                    margin: {
                      item: 20
                    }
            };
            timelineRef.current = new Timeline(timelineContainerRef.current, dataSetRef.current, options);
        }
    }, []);

    const updateWorkflows = () => {
        const updatedItems = workflows.map(workflow => ({
            id: workflow.id,
            content: workflow.name,
            start: workflow.startDate.toDate(),
            end: workflow.endDate ? workflow.endDate.toDate() : new Date(),
            className: workflow.endDate ? 'completed-workflow' : 'ongoing-workflow'
        }));
    
        dataSetRef.current.clear();
        dataSetRef.current.add(updatedItems);
    
        // Redraw the timeline
        timelineRef.current.redraw();
        timelineRef.current.fit(); // Adjusts the viewport to fit all items
        
    };
    
    const updateOngoingWorkflows = () => {
        const hasOngoing = workflows.some(workflow => !workflow.endDate);
        if (!hasOngoing) return;

        const updatedItems = workflows.map(workflow => ({
            id: workflow.id,
            content: workflow.name,
            start: workflow.startDate.toDate(),
            end: workflow.endDate ? workflow.endDate.toDate() : new Date(), // Current date for ongoing
            className: workflow.endDate ? 'completed-workflow' : 'ongoing-workflow'
        }));

        dataSetRef.current.add(updatedItems);
    };

    useEffect(() => {
        updateWorkflows();

         // Interval for dynamic updates of ongoing workflows
         const dynamicUpdateInterval = setInterval(() => {
            updateOngoingWorkflows();
        }, 1000); // Update every minute or choose a suitable interval

        return () => {
            clearInterval(dynamicUpdateInterval);
        };
    }, []); // Empty dependency array to set it up only once

    // Update for prop changes
    useEffect(() => {
        updateWorkflows(); // This will now handle all updates
    }, [workflows]);
    

    return (
        <div className="gantt-chart-wrapper">
            <div className="gantt-chart-container">
                <div ref={timelineContainerRef} className="timeline-container"></div>
            </div>
        </div>
    );
};

export default GanttChart;
