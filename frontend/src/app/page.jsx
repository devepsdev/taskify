import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <section className="max-w-3xl text-center w-full">

        {/* Título */}
        <div className="header">
          <h1>Taskify</h1>
          <p>Gestión de tareas full stack con Django REST + Next.js</p>
        </div>

        {/* Descripción */}
        <div className="glass-card p-6 mb-6 text-left">
          <p className="text-white text-lg mb-3">
            Aplicación Full Stack que combina un backend en{" "}
            <strong>Django REST Framework</strong> con un frontend en{" "}
            <strong>Next.js y TailwindCSS</strong>.
          </p>
          <p className="text-white text-lg">
            El backend expone una <strong>API REST pública</strong> utilizando
            modelos, viewsets, routers y serializadores. La base de datos es{" "}
            <strong>SQLite3</strong>. El frontend consume esa API mostrando una
            interfaz intuitiva para crear, leer, actualizar y eliminar tareas.
          </p>
        </div>

        {/* GIF de demostración */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Demostración en acción
          </h2>
          <div className="flex justify-center">
            <img
              src="/Animation.gif"
              alt="Demostración del proyecto"
              className="rounded-md shadow-lg max-h-96"
            />
          </div>
        </div>

        {/* Tecnologías */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Tecnologías utilizadas
          </h2>
          <ul className="grid grid-cols-2 gap-3 text-left text-white">
            <li><i className="fas fa-check-circle text-green-300 mr-2" />Django REST Framework</li>
            <li><i className="fas fa-check-circle text-green-300 mr-2" />SQLite3</li>
            <li><i className="fas fa-check-circle text-green-300 mr-2" />Viewsets &amp; Routers</li>
            <li><i className="fas fa-check-circle text-green-300 mr-2" />CORS Headers</li>
            <li><i className="fas fa-check-circle text-green-300 mr-2" />Next.js 15</li>
            <li><i className="fas fa-check-circle text-green-300 mr-2" />TailwindCSS 4</li>
          </ul>
        </div>

        {/* CTA */}
        <Link href="/tasks">
          <button className="btn-gradient" style={{ fontSize: "1.1rem", padding: "14px 36px" }}>
            <i className="fas fa-tasks" />
            Ver mis tareas
          </button>
        </Link>

      </section>
    </main>
  );
};

export default Home;
