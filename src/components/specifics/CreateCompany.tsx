import style from "../../styles/cadastrar.module.css";
import { Raleway } from "next/font/google";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';

const raleway = Raleway({ subsets: ["latin"] });

export default function CreateCompany() {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    const token = Cookies.get('token');
    // Obter os valores dos inputs
    const name = document.getElementById('inputName').value.trim();
    const doc = document.getElementById('inputDoc').value.trim();
    const city = document.getElementById('inputCity').value.trim();
    const coordX = document.getElementById('inputCoordX').value.trim();
    const coordY = document.getElementById('inputCoordY').value.trim();
    const infos = document.getElementById('inputInfos').value.trim();
  
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
      number_processo: "123",
      client: "65c6dc8ef5316e4df92e4e94"
    };
  
    console.log(formData);
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
        document.getElementById('inputName').value = '';
        document.getElementById('inputDoc').value = '';
        document.getElementById('inputCity').value = '';
        document.getElementById('inputCoordX').value = '';
        document.getElementById('inputCoordY').value = '';
        document.getElementById('inputInfos').value = '';
  
        alert('Dados salvos com sucesso!');
      } else {
        alert('Erro ao salvar os dados. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao salvar os dados. Por favor, tente novamente.');
    }
  };

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
                <input type="text" className={style.input} id="inputName" />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="inputDoc">DOCUMENTO *</label>
                <input type="text" className={style.input} id="inputDoc" />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="inputCity">CIDADE *</label>
                <input type="text" className={style.input} id="inputCity" />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="inputCoordX">COORDENADA X *</label>
                <input type="number" className={style.input} id="inputCoordX" step="any" />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="inputCoordY">COORDENADA Y *</label>
                <input type="number" className={style.input} id="inputCoordY" step="any" />
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
