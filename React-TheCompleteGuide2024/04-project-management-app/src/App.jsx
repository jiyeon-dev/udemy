import { useState } from "react";
import { v4 as uuid4 } from "uuid";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined, // undefined: no selected | null: create new project | project id: selected project
    projects: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProject: null,
    }));
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProject: undefined,
    }));
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: uuid4(),
      };

      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  let content;
  if (projectsState.selectedProject === null)
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  else if (projectsState.selectedProject === undefined)
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
