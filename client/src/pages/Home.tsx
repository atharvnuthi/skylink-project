import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  useEffect(() => {
    document.title = "SkyLink - Início";
  }, []);

  return (
    <>
      <section
        className="hero text-center text-white"
        style={{
          background: "linear-gradient(to right, #002244, #005288)",
          padding: "100px 0",
        }}
        data-aos="fade-up"
      >
        <div className="container">
          <h1 className="display-4 fw-bold">
            Internet Ilimitada. Em Qualquer Lugar do Mundo.
          </h1>
          <p className="lead">
            A SkyLink oferece conectividade via satélite acessível para todos os
            cantos do planeta.
          </p>
          <Link to="/plans" className="btn btn-primary btn-lg mt-4">
            Ver Planos
          </Link>
        </div>
      </section>

      <section className="py-5" id="features">
        <div className="container">
          <h2 className="text-center mb-5" data-aos="fade-up">
            Por que Escolher a SkyLink?
          </h2>
          <div className="row g-4">
            <Feature
              title="Cobertura de Alta Velocidade"
              delay={100}
              icon="bi-speedometer2"
              text="Aproveite internet ultrarrápida em áreas urbanas, rurais ou remotas com nossos satélites de baixa órbita."
            />
            <Feature
              title="Sinal Confiável"
              delay={200}
              icon="bi-wifi"
              text="Serviço ininterrupto 24/7 com latência mínima para trabalho, jogos e streaming."
            />
            <Feature
              title="Alcance Global"
              delay={300}
              icon="bi-globe"
              text="Sem fronteiras. A SkyLink conecta pessoas em montanhas, ilhas, desertos e muito mais."
            />
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5" data-aos="fade-up">
            O Que as Pessoas Dizem
          </h2>
          <div
            id="testimonials"
            className="carousel slide text-center"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <blockquote className="blockquote">
                  <p className="mb-4">
                    “Eu moro fora da rede na Amazônia, e a SkyLink mudou minha
                    vida.”
                  </p>
                  <footer className="blockquote-footer">Maria Silva</footer>
                </blockquote>
              </div>
              <div className="carousel-item">
                <blockquote className="blockquote">
                  <p className="mb-4">
                    “Nenhum outro provedor nos deu cobertura no nosso barco — a
                    SkyLink deu!”
                  </p>
                  <footer className="blockquote-footer">Carlos Mendes</footer>
                </blockquote>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#testimonials"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#testimonials"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
      </section>

      <section
        className="py-5 text-white text-center"
        style={{ backgroundColor: "#0d6efd" }}
        data-aos="zoom-in"
      >
        <div className="container">
          <h3>Pronto para se conectar com o mundo?</h3>
          <p className="lead">
            Junte-se a milhares que já estão aproveitando a internet via
            satélite sem interrupções com a SkyLink.
          </p>
          <Link to="/contact" className="btn btn-light btn-lg">
            Comece Agora
          </Link>
        </div>
      </section>
    </>
  );
};

type FeatureProps = {
  title: string;
  text: string;
  icon: string;
  delay: number;
};

function Feature({ title, text, icon, delay }: FeatureProps) {
  return (
    <div className="col-md-4" data-aos="fade-up" data-aos-delay={delay}>
      <div className="text-center">
        <div
          className="feature-icon mb-3"
          style={{ fontSize: "2.5rem", color: "#0d6efd" }}
        >
          <i className={`bi ${icon}`}></i>
        </div>
        <h5>{title}</h5>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Home;
