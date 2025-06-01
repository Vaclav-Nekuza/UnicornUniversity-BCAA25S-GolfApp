import Container from "react-bootstrap/esm/Container";
import CourseListProvider from "./course-list-provider";
import DashboardContent from "./dashboard-content";

function Dashboard() {
  return (
    <Container>
      <CourseListProvider>
        <DashboardContent />
      </CourseListProvider>
    </Container>
  );
}

export default Dashboard;
