import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies';
import style from "@/styles/viewpage.module.css";

const apiKey = process.env.API_KEY;

type Props = {
  companyId: string | string[];
}

type Company = {
  id: string;
  name: string;
  document: string;
  city: string;
  createdAt: Date | null;
  coordinatesX: number;
  coordinatesY: number;
  informations: string;
  number_processo: string;
}

const ViewCompany = ({ companyId }: Props) => {
  const router = useRouter();
  const [companyData, setCompanyData] = useState<Company | null>(null);

  useEffect(() => {
    if (typeof companyId === "string") {
      getCompany(companyId);
    }
  }, [companyId]);

  async function getCompany(companyId: string) {
    const { "nucleo-token": token } = parseCookies();

    try {
      const response = await fetch(`https://api-coordinates.onrender.com/company/${companyId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const companyData: Company = await response.json();
        setCompanyData(companyData);
      } else {
        alert("Erro ao carregar as informações. Por favor, tente novamente ou entre em contato com o setor de suporte.");
        router.push("/home");
      }
    } catch (error) {
      console.error("Erro ao obter dados da empresa:", error);
    }
  };

  if (!companyData) {
    return <div>Carregando...</div>;
  }

  const formatDocument = (document: string): string => {
    if (document.length === 11) {
      return `${document.substring(0, 3)}.${document.substring(3, 6)}.${document.substring(6, 9)}-${document.substring(9)}`;
    } else if (document.length === 14) {
      return `${document.substring(0, 2)}.${document.substring(2, 5)}.${document.substring(5, 8)}/${document.substring(8, 12)}-${document.substring(12)}`;
    } else {
      return document;
    }
  };

  return (
    <div>
      <button className={style.btn_return_home} onClick={() => router.push(`/home`)}><i className="fa-solid fa-house" title="Botão para voltar à página principal."></i></button>
      <div className={style.container}>
            <div>
              <h1 className={style.title}>{companyData.name}</h1>
            </div>
            <br></br>
            <h2 className={style.subtitle}>Informações cadastradas</h2>
            <br></br>
            <ol className={style.lista}>
              <li><strong>Nome:</strong> {companyData.name}</li>
              <li><strong>Documento:</strong> {companyData.document && formatDocument(companyData.document)}</li>
              <li><strong>Cidade:</strong> {companyData.city}</li>
              <li><strong>Número Processo:</strong> {companyData.number_processo}</li>
              <li><strong>Coordenada X:</strong> {companyData.coordinatesX}</li>
              <li><strong>Coordenada Y:</strong> {companyData.coordinatesY}</li>
              <li><strong>Informações Gerais: </strong> {companyData.informations}</li>
            </ol>
            <br></br>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe 
                width="320"
                height="200"
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&zoom=11&q=${companyData.coordinatesX},${companyData.coordinatesY}`}
                ></iframe>
            </div>
          </div>
        </div>
  );
}

export default ViewCompany;