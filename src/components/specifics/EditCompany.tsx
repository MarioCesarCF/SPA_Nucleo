import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies';
import style from "../../styles/cadastrar.module.css";

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
  const [companyData, setCompanyData] = useState<Company | null>(null);

  useEffect(() => {
    if (typeof companyId === "string") {
      getCompany(companyId);
    }
  }, [companyId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    const {"nucleo-token": token} = parseCookies();

    const name = document.getElementById('inputName').value.trim();
    const doc = document.getElementById('inputDoc').value.trim();
    const city = document.getElementById('inputCity').value.trim();
    const coordX = document.getElementById('inputCoordX').value.trim();
    const coordY = document.getElementById('inputCoordY').value.trim();
    const infos = document.getElementById('inputInfos').value.trim();
    const numberProcesso = document.getElementById('inputNumberPros').value.trim();
  
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
        router.push("/");
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
        router.push("/");
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
      <div className={style.titleCadastro}>
      <h1>Formulário para atualização de dados da empresa</h1>
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
