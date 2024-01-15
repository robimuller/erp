// Filename: GanttChart.jsx
import dayjs from "dayjs";
import { Gantt } from "react-virtual-gantt";
import { getRandomGanttData } from "./getRandomGanttDate";

const mockData = getRandomGanttData(
    5,
    dayjs().subtract(7, "days").toDate(),
    dayjs().add(7, "days").toDate()
  );
  
  console.log({ mockData });
  
  export default function Home() {
    return (
      <main style={{ padding: "16px", height: "85vh" }}>
        <Gantt>
          <Gantt.Controls />
          <Gantt.Chart data={mockData} />
        </Gantt>
      </main>
    );
  }
