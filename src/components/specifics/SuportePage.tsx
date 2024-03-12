import { useRouter } from "next/router";
import style from "@/styles/suportepage.module.css";


const SuportePage = () => {
  const router = useRouter();

  return (
    <div>
      <button className={style.btn_return_home} onClick={() => router.push(`/home`)}><i className="fa-solid fa-house" title="Botão para voltar à página principal."></i></button>
      <div className={style.container}>

        <div className={style.titleSuporte}>
          <h1>Formulário para envio de mensagem ao suporte</h1>
        </div>

        <div className={style.background}>
          <div className={style.modal}>
            <div className={style.center}>
              

              <form className={style.form} action="https://formsubmit.co/mc.dev.suporte@gmail.com" method="POST">
                <input type="hidden" name="_next" value="https://coordenadas-nucleo.vercel.app/home" />
                <input type="hidden" name="_autoresponse" value="Recebemos seu contato. Responderemos assim que possível." />
                <div className={style.formGroup}>
                  <label htmlFor="inputName">NOME: </label>
                  <input type="text" className={style.input} name="name" />
                </div>

                <div className={style.formGroup}>
                  <label htmlFor="inputMail">E-MAIL: </label>
                  <input type="text" className={style.input} name="email" />
                </div>

                <div className={style.formGroup}>
                  <label htmlFor="inputMsg">MENSAGEM: </label>
                  <textarea className={style.textarea} name="message" />
                </div>

                <button type="submit" className={style.button} onClick={() => {alert("Mensagem será enviada após o captcha. Por favor confirme o envio na próxima página.")}}>Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuportePage;