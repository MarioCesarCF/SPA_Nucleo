import style from "../../styles/cadastrar.module.css";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Router from 'next/router';

export default function CreateCompany() {
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { "nucleo-token": token } = parseCookies();
    
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
    
    if (!name || !doc || !city || !coordX || !coordY || !numberProcesso) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // LEMBRAR DE SELECT PARA O CLIENTE
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

        Router.push("/home");
        alert('Dados salvos com sucesso!');
      } else {
        const errorData = await response.json();
        alert(`Erro ao salvar os dados: ${errorData.message}`);
      }
    } catch (error) {      
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
      <button className={style.btn_return_home} onClick={() => router.push(`/home`)}><i className="fa-solid fa-house" title="Botão para voltar à página principal."></i></button>
      <div className={style.titleCadastro}>
        <h1>Formulário para cadastro de empreendimentos</h1>
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
