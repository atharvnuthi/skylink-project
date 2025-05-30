import { useState, useEffect } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    document.title = "SkyLink - Contato";
  }, []);

  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert(
      `Mensagem enviada por ${formData.name} (${formData.email}):\n\n${formData.message}`
    );
  }

  return (
    <>
      <section
        className="py-5 bg-primary text-white text-center"
        data-aos="fade-down"
      >
        <div className="container">
          <h1 className="display-5 fw-bold">Entre em Contato</h1>
          <p className="lead">
            Envie uma mensagem, estamos prontos para ajudar você!
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="card shadow-sm rounded p-4" data-aos="fade-up">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome Completo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Digite seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Mensagem
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  placeholder="Sua mensagem aqui..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Enviar Mensagem
              </button>
            </form>
          </div>

          <div
            className="map-container mt-5"
            style={{
              height: "400px",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <iframe
              title="Mapa"
              src="https://www.google.com/maps/embed/v1/place?q=SkyLink+Headquarters&key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
