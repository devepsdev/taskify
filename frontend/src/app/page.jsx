import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="page-container" style={{ maxWidth: "900px" }}>

        {/* Header */}
        <div className="header">
          <h1>
            <i className="fas fa-tasks" style={{ marginRight: "0.75rem" }} />
            Taskify
          </h1>
          <p>Gestión de tareas full stack con Django REST + Next.js</p>
        </div>

        {/* Descripción */}
        <div className="glass-card home-card">
          <p style={{ marginBottom: "0.75rem", lineHeight: "1.7" }}>
            Aplicación Full Stack que combina un backend en{" "}
            <strong>Django REST Framework</strong> con un frontend en{" "}
            <strong>Next.js y TailwindCSS</strong>.
          </p>
          <p style={{ lineHeight: "1.7" }}>
            El backend expone una <strong>API REST pública</strong> usando modelos,
            viewsets, routers y serializadores con base de datos <strong>SQLite3</strong>.
            El frontend consume esa API con una interfaz para crear, leer, actualizar y eliminar tareas.
          </p>
        </div>

        {/* GIF */}
        <div className="glass-card home-card" style={{ textAlign: "center" }}>
          <h2 className="home-section-title">
            <i className="fas fa-play-circle" style={{ marginRight: "0.5rem" }} />
            Demostración en acción
          </h2>
          <img
            src="/Animation.gif"
            alt="Demostración del proyecto"
            className="home-gif"
          />
        </div>

        {/* Tecnologías */}
        <div className="glass-card home-card">
          <h2 className="home-section-title">
            <i className="fas fa-code" style={{ marginRight: "0.5rem" }} />
            Tecnologías utilizadas
          </h2>
          <div className="tech-grid">
            {[
              { icon: "fa-server",      label: "Django REST Framework" },
              { icon: "fa-database",    label: "SQLite3" },
              { icon: "fa-route",       label: "Viewsets & Routers" },
              { icon: "fa-shield-alt",  label: "CORS Headers" },
              { icon: "fa-layer-group", label: "Next.js 15" },
              { icon: "fa-paint-brush", label: "TailwindCSS 4" },
            ].map(({ icon, label }) => (
              <div key={label} className="tech-badge">
                <i className={`fas ${icon}`} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <Link href="/tasks">
            <button className="btn-gradient" style={{ fontSize: "1.05rem", padding: "13px 36px" }}>
              <i className="fas fa-tasks" />
              Ver mis tareas
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
};

export default Home;
