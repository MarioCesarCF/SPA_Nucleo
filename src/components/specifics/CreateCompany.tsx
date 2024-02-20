import style from "../../styles/cadastrar.module.css";
import { Raleway } from "next/font/google";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const raleway = Raleway({ subsets: ["latin"] });

export default function CreateCompany() {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { "nucleo-token": token } = parseCookies();
    // Obter os valores dos inputs
    const nameElement = document.getElementById('inputName') as HTMLInputElement | null;
    const docElement = document.getElementById('inputDoc') as HTMLInputElement | null;
    const cityElement = document.getElementById('inputCity') as HTMLInputElement | null;
    const coordXElement = document.getElementById('inputCoordX') as HTMLInputElement | null;
    const coordYElement = document.getElementById('inputCoordY') as HTMLInputElement | null;
    const infosElement = document.getElementById('inputInfos') as HTMLInputElement | null;
    const numberProcessoElement = document.getElementById('inputNumberPros') as HTMLInputElement | null;

    // Verificar se todos os elementos existem antes de acessar suas propriedades
    const name = nameElement?.value?.trim() ?? '';
    const doc = docElement?.value?.trim() ?? '';
    const city = cityElement?.value?.trim() ?? '';
    const coordX = coordXElement?.value?.trim() ?? '';
    const coordY = coordYElement?.value?.trim() ?? '';
    const infos = infosElement?.value?.trim() ?? '';
    const numberProcesso = numberProcessoElement?.value?.trim() ?? '';

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
    const inputName = document.getElementById('inputName') as HTMLInputElement | null;
    const inputDoc = document.getElementById('inputDoc') as HTMLInputElement | null;
    const inputCity = document.getElementById('inputCity') as HTMLInputElement | null;
    const inputCoordX = document.getElementById('inputCoordX') as HTMLInputElement | null;
    const inputCoordY = document.getElementById('inputCoordY') as HTMLInputElement | null;
    const inputInfos = document.getElementById('inputInfos') as HTMLInputElement | null;
    const inputNumberPros = document.getElementById('inputNumberPros') as HTMLInputElement | null;

    // Verificar se todos os elementos existem antes de acessar suas propriedades
    if (inputName) inputName.value = '';
    if (inputDoc) inputDoc.value = '';
    if (inputCity) inputCity.value = '';
    if (inputCoordX) inputCoordX.value = '';
    if (inputCoordY) inputCoordY.value = '';
    if (inputInfos) inputInfos.value = '';
    if (inputNumberPros) inputNumberPros.value = '';
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
