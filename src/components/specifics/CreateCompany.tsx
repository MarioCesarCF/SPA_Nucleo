import style from "../../styles/cadastrar.module.css";
import { Raleway } from "next/font/google";
import { useRouter } from "next/router";

const raleway = Raleway({ subsets: ["latin"] });

export default function CreateCompany() {
  const router = useRouter();

  return (
    <div>
      <div className={style.titleCadastro}>
      <h1>Formulário para cadastro de empresa</h1>
      </div>
      
      <div className={style.background}>
        <div className={style.modal}>
          <div className={style.center}>


            <form className={style.form}>
              <div className={style.formGroup}>
                <label htmlFor="inputName">NOME:</label>
                <input type="text" className={style.input} id="inputName" />
              </div>

              <div className={style.formGroup}>
                <label htmlFor="inputDoc">DOCUMENTO:</label>
                <input type="text" className={style.input} id="inputDoc" />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="inputCity">CIDADE:</label>
                <input type="text" className={style.input} id="inputCity" />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="inputCoordX">COORDENADA X:</label>
                <input type="number" className={style.input} id="inputCoordX" />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="inputCoordY">COORDENADA Y:</label>
                <input type="number" className={style.input} id="inputCoordY" />
              </div>
              <div className={style.formGroup}>
                <label htmlFor="inputInfos">INFORMAÇÕES GERAIS:</label>
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
