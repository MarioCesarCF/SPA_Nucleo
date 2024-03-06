import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies';
import style from "@/styles/btn-return.module.css"

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

  return (
    <div>
      <button className={style.btn_return_home} onClick={() => router.push(`/home`)}><i className="fa-solid fa-house" title="Botão para voltar à página principal."></i></button>
      <div>
        <h1>{companyData.name}</h1>
      </div>
      <br></br>
      <h2>Informações cadastradas</h2>
      <ol>
        <li>Nome: {companyData.name}</li>
        <li>Documento: {companyData.document}</li>
        <li>Cidade: {companyData.city}</li>
        <li>Número Processo: {companyData.number_processo}</li>
        <li>Coordenada X: {companyData.coordinatesX}</li>
        <li>Coordenada Y: {companyData.coordinatesY}</li>
        <li>Informações Gerais: {companyData.informations}</li>
      </ol>
      <br></br>
      <div>Mapa</div>
    </div>
  );
}

export default ViewCompany;