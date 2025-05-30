import React, { useEffect } from "react";

const About: React.FC = () => {
  useEffect(() => {
    document.title = "SkyLink - Sobre";
  }, []);

  return (
    <>
      <section
        className="py-5 text-center text-white bg-primary"
        data-aos="fade-down"
      >
        <div className="container">
          <h1 className="display-5 fw-bold">Sobre a SkyLink</h1>
          <p className="lead">
            Nossa missão é tornar a internet acessível em qualquer lugar — não
            importa quão remoto.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6" data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                className="img-fluid rounded"
                alt="Imagem da Missão"
              />
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <h2 className="section-title mb-4">Nossa Visão</h2>
              <p>
                Acreditamos que a conectividade é um direito humano básico. É
                por isso que a SkyLink constrói internet via satélite acessível
                e de baixa latência para alcançar até as comunidades mais
                remotas da Terra.
              </p>
              <p>
                Fundada em 2023, nossa tecnologia capacita empresas, famílias e
                exploradores em oceanos, montanhas e desertos — online e fora da
                rede.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center section-title mb-4" data-aos="fade-up">
            Como Funciona
          </h2>
          <div className="accordion" id="accordionHow" data-aos="fade-up">
            <div className="accordion-item">
              <h2 className="accordion-header" id="stepOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Passo 1: Instale o Kit SkyLink
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="stepOne"
                data-bs-parent="#accordionHow"
              >
                <div className="accordion-body">
                  Enviamos um kit fácil de instalar com uma antena, roteador e
                  guia rápido. Você não precisa de um técnico!
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="stepTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Passo 2: Conecte-se à Nossa Rede de Satélites
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="stepTwo"
                data-bs-parent="#accordionHow"
              >
                <div className="accordion-body">
                  Assim que ligado, o prato se alinha automaticamente com o
                  satélite mais próximo. Você estará online em minutos.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="stepThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Passo 3: Aproveite a Internet em Qualquer Lugar
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="stepThree"
                data-bs-parent="#accordionHow"
              >
                <div className="accordion-body">
                  Seja para streaming, trabalho remoto ou videochamadas, a
                  SkyLink mantém você conectado.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center section-title mb-4" data-aos="fade-up">
            Conheça a Equipe
          </h2>
          <div className="row g-4">
            {[
              {
                img: "https://randomuser.me/api/portraits/men/32.jpg",
                name: "Lucas Fernandez",
                role: "CEO & Fundador",
                description:
                  "Empreendedor visionário com a missão de reduzir a exclusão digital.",
                modalId: "ceoModal",
                modalBody:
                  "Lucas lançou a SkyLink para capacitar comunidades rurais e viajantes. Ele liderou três startups de sucesso antes e fala 6 idiomas.",
              },
              {
                img: "https://randomuser.me/api/portraits/women/44.jpg",
                name: "Priya Mehta",
                role: "CTO & Arquiteta de Sistemas",
                description:
                  "Engenheira da nossa grade global de satélites com mais de 12 anos em tecnologia aeroespacial.",
                modalId: "ctoModal",
                modalBody:
                  "Priya projetou o sistema de roteamento de baixa latência usado pela SkyLink, que reduziu o atraso de sinal em 42% em comparação com os concorrentes.",
              },
              {
                img: "https://randomuser.me/api/portraits/men/65.jpg",
                name: "Marcus Silva",
                role: "COO",
                description:
                  "Mago das operações, garantindo excelência na entrega e suporte em todo o mundo.",
                modalId: "cooModal",
                modalBody:
                  "Marcus coordena a logística e os lançamentos de satélites. Ele gerenciou mais de 70 implantações e fala fluentemente português e inglês.",
              },
            ].map(({ img, name, role, description, modalId }) => (
              <div className="col-md-4" key={modalId} data-aos="flip-left">
                <div className="card team-card">
                  <img src={img} className="card-img-top" alt={role} />
                  <div className="card-body text-center">
                    <h5 className="card-title">
                      {name}{" "}
                      <span data-bs-toggle="tooltip" title={role}>
                        <i className="bi bi-info-circle"></i>
                      </span>
                    </h5>
                    <p className="card-text">{description}</p>
                    <button
                      className="btn btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#${modalId}`}
                    >
                      Mais
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {[
        {
          modalId: "ceoModal",
          title: "Lucas Fernandez",
          body: "Lucas lançou a SkyLink para capacitar comunidades rurais e viajantes. Ele liderou três startups de sucesso antes e fala 6 idiomas.",
        },
        {
          modalId: "ctoModal",
          title: "Priya Mehta",
          body: "Priya projetou o sistema de roteamento de baixa latência usado pela SkyLink, que reduziu o atraso de sinal em 42% em comparação com os concorrentes.",
        },
        {
          modalId: "cooModal",
          title: "Marcus Silva",
          body: "Marcus coordena a logística e os lançamentos de satélites. Ele gerenciou mais de 70 implantações e fala fluentemente português e inglês.",
        },
      ].map(({ modalId, title, body }) => (
        <div
          className="modal fade"
          id={modalId}
          aria-labelledby={`${modalId}Label`}
          aria-hidden="true"
          key={modalId}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${modalId}Label`}>
                  {title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">{body}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default About;
