import { useEffect } from "react";

const Plans: React.FC = () => {
  useEffect(() => {
    document.title = "SkyLink - Planos";
  }, []);

  return (
    <>
      <section
        className="py-5 text-center text-white bg-primary"
        data-aos="fade-down"
      >
        <div className="container">
          <h1 className="display-5 fw-bold">Planos de Preços SkyLink</h1>
          <p className="lead">
            Escolha o plano perfeito para suas necessidades de internet.
            Conectividade via satélite rápida, acessível e confiável para todos.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center section-title mb-4" data-aos="fade-up">
            Nossos Planos
          </h2>
          <div className="row g-4">
            <div className="col-lg-4" data-aos="fade-right">
              <div className="card plan-card shadow-sm border-light rounded">
                <div className="card-body">
                  <h5 className="card-title text-center">Básico</h5>
                  <p className="text-center text-muted">
                    Perfeito para usuários leves
                  </p>
                  <h3 className="text-center">R$19,99/mês</h3>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Até 20 Mbps</li>
                    <li className="list-group-item">Perfeito para navegação</li>
                    <li className="list-group-item">Acesso Ilimitado</li>
                  </ul>
                  <div className="d-grid gap-2 mt-4">
                    <button className="btn btn-primary">Começar Agora</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-up">
              <div className="card plan-card shadow-sm border-light rounded">
                <div className="card-body">
                  <h5 className="card-title text-center">Padrão</h5>
                  <p className="text-center text-muted">Para uso moderado</p>
                  <h3 className="text-center">R$39,99/mês</h3>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Até 50 Mbps</li>
                    <li className="list-group-item">Streaming e navegação</li>
                    <li className="list-group-item">Suporte Prioritário</li>
                  </ul>
                  <div className="d-grid gap-2 mt-4">
                    <button className="btn btn-primary">Começar Agora</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-left">
              <div className="card plan-card shadow-sm border-light rounded">
                <div className="card-body">
                  <h5 className="card-title text-center">Premium</h5>
                  <p className="text-center text-muted">
                    Para usuários intensivos e empresas
                  </p>
                  <h3 className="text-center">R$69,99/mês</h3>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Até 100 Mbps</li>
                    <li className="list-group-item">
                      Perfeito para streaming HD e trabalho
                    </li>
                    <li className="list-group-item">Suporte 24/7</li>
                  </ul>
                  <div className="d-grid gap-2 mt-4">
                    <button className="btn btn-primary">Começar Agora</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center section-title mb-4" data-aos="fade-up">
            Comparação de Recursos
          </h2>
          <table
            className="table table-bordered table-hover"
            data-aos="fade-up"
          >
            <thead className="table-primary">
              <tr>
                <th>Recursos</th>
                <th>Básico</th>
                <th>Padrão</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Velocidade</td>
                <td>Até 20 Mbps</td>
                <td>Até 50 Mbps</td>
                <td>Até 100 Mbps</td>
              </tr>
              <tr>
                <td>Streaming</td>
                <td>Limitado</td>
                <td>Streaming HD</td>
                <td>Streaming 4K</td>
              </tr>
              <tr>
                <td>Suporte ao Cliente</td>
                <td>Padrão</td>
                <td>Prioritário</td>
                <td>Premium 24/7</td>
              </tr>
              <tr>
                <td>Roteador Dedicado</td>
                <td>Não</td>
                <td>Sim</td>
                <td>Sim</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-5">
        <div className="container" data-aos="fade-up">
          <h2 className="section-title text-center mb-4">
            Perguntas Frequentes
          </h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq1Heading">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq1"
                  aria-expanded="true"
                  aria-controls="faq1"
                >
                  O que está incluído no equipamento?
                </button>
              </h2>
              <div
                id="faq1"
                className="accordion-collapse collapse show"
                aria-labelledby="faq1Heading"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  O equipamento inclui antena parabólica, roteador Wi-Fi e cabos
                  de instalação.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq2Heading">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq2"
                  aria-expanded="false"
                  aria-controls="faq2"
                >
                  Como funciona a conexão via satélite?
                </button>
              </h2>
              <div
                id="faq2"
                className="accordion-collapse collapse"
                aria-labelledby="faq2Heading"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  A conexão via satélite transmite dados entre a antena do
                  cliente e os satélites em órbita, proporcionando acesso à
                  internet mesmo em áreas remotas.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq3Heading">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq3"
                  aria-expanded="false"
                  aria-controls="faq3"
                >
                  Posso mudar de plano a qualquer momento?
                </button>
              </h2>
              <div
                id="faq3"
                className="accordion-collapse collapse"
                aria-labelledby="faq3Heading"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Sim, você pode atualizar ou mudar seu plano facilmente pelo
                  painel do cliente.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Plans;
