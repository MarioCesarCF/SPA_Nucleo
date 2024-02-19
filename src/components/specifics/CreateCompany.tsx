import style from "../../styles/cadastrar.module.css";
import { Raleway } from "next/font/google";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const raleway = Raleway({ subsets: ["latin"] });

export default function CreateCompany() {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    const {"nucleo-token": token} = parseCookies();
    // Obter os valores dos inputs
    const name = document.getElementById('inputName').value.trim();
    const doc = document.getElementById('inputDoc').value.trim();
    const city = document.getElementById('inputCity').value.trim();
    const coordX = document.getElementById('inputCoordX').value.trim();
    const coordY = document.getElementById('inputCoordY').value.trim();
    const infos = document.getElementById('inputInfos').value.trim();
    const numberProcesso = document.getElementById('inputNumberPros').value.trim();
  
    // Verificar se os campos obrigatórios estão preenchidos
    if (!name || !doc || !city || !coordX || !coordY) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    // LEMBRAR DE INPUT PARA NÚMERO DE PROCESSO E SELECT PARA O CLIENTE
    // Criar o objeto com os dados do formulário
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
  
    // Enviar os dados para o backend
    try {
      const response = await fetch('https://api-coordinates.onrender.com/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        limparForm()
  
        alert('Dados salvos com sucesso!');
      } else {
        const errorData = await response.json();    
        alert(`Erro ao salvar os dados: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar os dados. Por favor, tente novamente.');
    }
  };

  function limparForm() {
    document.getElementById('inputName').value = '';
    document.getElementById('inputDoc').value = '';
    document.getElementById('inputCity').value = '';
    document.getElementById('inputCoordX').value = '';
    document.getElementById('inputCoordY').value = '';
    document.getElementById('inputInfos').value = '';
    document.getElementById('inputNumberPros').value = '';
  }

  return (
    <div>
      <div className={style.titleCadastro}>
      <h1>Formulário para cadastro de empresa</h1>
      </div>
      
      <div className={style.background}>
        <div className={style.modal}>
          <div className={style.center}>


            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.formGroup}>
                <label htmlFor="inputName">NOME *</label>
                <input type="text" className={style.inputName} id="inputName" />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="inputDoc">DOCUMENTO *</label>
                <input type="text" className={style.inputDoc} id="inputDoc" />
                <label htmlFor="inputCity">CIDADE *</label>
                <input type="text" className={style.inputCity} id="inputCity" />
                <label htmlFor="inputNumberPros">NÚMERO PROCESSO *</label>
                <input type="text" className={style.inputNumber} id="inputNumberPros" />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="inputCoordX">COORDENADA X *</label>
                <input type="number" className={style.inputCoordX} id="inputCoordX" step="any" />
                <label htmlFor="inputCoordY">COORDENADA Y *</label>
                <input type="number" className={style.inputCoordY} id="inputCoordY" step="any" />
              </div>
              
              <div className={style.formGroup}>
                <label htmlFor="inputInfos">INFORMAÇÕES GERAIS</label>
                <textarea className={style.textarea} id="inputInfos" />
              </div>
              <button type="submit" className={style.button}>Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
