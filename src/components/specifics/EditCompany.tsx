import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies';
import style from "@/styles/cadastrar.module.css";

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

export default function EditCompany({ companyId }: Props) {
  const router = useRouter();
  const {"nucleo-token": token} = parseCookies();

  const [companyData, setCompanyData] = useState<Company | null>(null);

  useEffect(() => {
    if (typeof companyId === "string") {
      getCompany(companyId);
    }
  }, [companyId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const nameElement = document.getElementById('inputName') as HTMLInputElement | null;
    const docElement = document.getElementById('inputDoc') as HTMLInputElement | null;
    const cityElement = document.getElementById('inputCity') as HTMLInputElement | null;
    const coordXElement = document.getElementById('inputCoordX') as HTMLInputElement | null;
    const coordYElement = document.getElementById('inputCoordY') as HTMLInputElement | null;
    const infosElement = document.getElementById('inputInfos') as HTMLInputElement | null;
    const numberProcessoElement = document.getElementById('inputNumberPros') as HTMLInputElement | null;
    
    const name = nameElement?.value?.trim() ?? '';
    const doc = docElement?.value?.trim() ?? '';
    const city = cityElement?.value?.trim() ?? '';
    const coordX = coordXElement?.value?.trim() ?? '';
    const coordY = coordYElement?.value?.trim() ?? '';
    const infos = infosElement?.value?.trim() ?? '';
    const numberProcesso = numberProcessoElement?.value?.trim() ?? '';
  
    if (!name || !doc || !city || !coordX || !coordY) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    const formData = {
      name: name,
      document: doc,
      city: city,
      coordinatesX: parseFloat(coordX),
      coordinatesY: parseFloat(coordY),
      informations: infos,
      number_processo: numberProcesso,
      client: "65c6dc8ef5316e4df92e4e94"
    };
  
    try {
        const response = await fetch(`https://api-coordinates.onrender.com/company/${companyId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
          });
  
      if (response.ok) {  
        alert('Dados salvos com sucesso!');
        router.push("/home");
      } else {
        const errorData = await response.json();    
        alert(`Erro ao salvar os dados: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar os dados. Por favor, tente novamente.');
    }
  };

  async function getCompany(companyId: string) {
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
      alert("Erro ao obter dados da empresa: " + error);
    }
  };

  if (!companyData) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <button className={style.btn_return_home} onClick={() => router.push(`/home`)}><i className="fa-solid fa-house" title="Botão para voltar à página principal."></i></button>
      <div className={style.titleCadastro}>
      <h1>Formulário para atualização de dados do empreendimento</h1>
      </div>
      
      <div className={style.background}>
        <div className={style.modal}>
          <div className={style.center}>


            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.formGroup}>
                <label htmlFor="inputName">NOME *</label>
                <input type="text" className={style.inputName} id="inputName" defaultValue={companyData.name} />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="inputDoc">DOCUMENTO *</label>
                <input type="text" className={style.inputDoc} id="inputDoc" defaultValue={companyData.document} />
                <label htmlFor="inputCity">CIDADE *</label>
                <input type="text" className={style.inputCity} id="inputCity" defaultValue={companyData.city} />
                <label htmlFor="inputNumberPros">NÚMERO PROCESSO *</label>
                <input type="text" className={style.inputNumber} id="inputNumberPros" defaultValue={companyData.number_processo} />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="inputCoordX">COORDENADA X *</label>
                <input type="number" className={style.inputCoordX} id="inputCoordX" defaultValue={companyData.coordinatesX} step="any" />
                <label htmlFor="inputCoordY">COORDENADA Y *</label>
                <input type="number" className={style.inputCoordY} id="inputCoordY" defaultValue={companyData.coordinatesY} step="any" />
              </div>
              
              <div className={style.formGroup}>
                <label htmlFor="inputInfos">INFORMAÇÕES GERAIS</label>
                <textarea className={style.textarea} id="inputInfos" defaultValue={companyData.informations} />
              </div>
              <button type="submit" className={style.button}>Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
