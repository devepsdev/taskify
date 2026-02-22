"use client";
import { useState, useEffect } from "react";
import FormTask from "../components/FormTask";
import ListTask from "../components/ListTask";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks`
  : "/api/tasks";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/`);
      if (res.ok) setTasks(await res.json());
      else setError("Error al cargar las tareas");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    try {
      const method = editingTask ? "PUT" : "POST";
      const url = editingTask
        ? `${API_BASE}/${editingTask.id}/`
        : `${API_BASE}/`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        setTasks(
          editingTask
            ? tasks.map((t) => (t.id === editingTask.id ? data : t))
            : [data, ...tasks]
        );
        resetForm();
        setShowModal(false);
      } else {
        setError("Error al guardar la tarea");
      }
    } catch {
      setError("Error de conexión");
    }
  };

  const toggleDone = async (task) => {
    try {
      const res = await fetch(`${API_BASE}/${task.id}/done/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setTasks(tasks.map((t) =>
          t.id === task.id ? { ...t, done: !t.done } : t
        ));
      } else {
        setError("Error al actualizar la tarea");
      }
    } catch {
      setError("Error de conexión");
    }
  };

  const deleteTask = async (id) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta tarea?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}/`, { method: "DELETE" });
      if (res.ok || res.status === 204) {
        setTasks(tasks.filter((t) => t.id !== id));
      } else {
        setError("Error al eliminar la tarea");
      }
    } catch {
      setError("Error de conexión");
    }
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setFormData({ title: task.title, description: task.description || "" });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "" });
    setEditingTask(null);
  };

  const openNew = () => {
    resetForm();
    setShowModal(true);
  };

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <div className="page-container">

      {/* Header */}
      <div className="header">
        <h1>
          <i className="fas fa-tasks" style={{ marginRight: "0.75rem" }} />
          Tasks
        </h1>
        <p>Organiza tu vida con estilo y eficiencia</p>
      </div>

      {/* Error */}
      {error && (
        <div className="error-alert">
          <i className="fas fa-exclamation-triangle" />
          {error}
          <button onClick={() => setError("")}>✕</button>
        </div>
      )}

      {/* Stats + lista de tareas */}
      <ListTask
        tasks={tasks}
        loading={loading}
        completedCount={completedCount}
        onNewTask={openNew}
        onToggleDone={toggleDone}
        onEdit={openEdit}
        onDelete={deleteTask}
      />

      {/* Botón flotante */}
      <button className="floating-action" onClick={openNew} title="Nueva tarea">
        <i className="fas fa-plus" />
      </button>

      {/* Modal de creación / edición */}
      <FormTask
        formData={formData}
        setFormData={setFormData}
        editingTask={editingTask}
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={handleSubmit}
      />

    </div>
  );
}
