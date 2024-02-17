import Link from "next/link";
import styles from "@/styles/login.module.css";
import { Raleway } from "next/font/google";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {useForm} from 'react-hook-form';
import { useContext } from "react";
import { UserContext } from "../commons/UserContext";

const raleway = Raleway({ subsets: ["latin"] });

export default function LoginAccess() {
  const {register, handleSubmit} = useForm();
  //const router = useRouter();
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  const {signIn} = useContext(UserContext);

  async function handleSignIn(data: any) {
    try{
      await signIn(data);
    } catch (error){
      alert(`Error: ${error}`);
    }    
  }

  return (
    <div className={styles.pageContainer}>
      <div className={raleway.className}>
        <div className={styles.contentWrap}></div>
        <main className={styles.main}>
          <form className={styles.login_form} onSubmit={handleSubmit(handleSignIn)}>
            <h1>E-mail:</h1>
            <input {...register("email")} type="mail" name="email" />
            <h1>Senha:</h1>
            <input {...register("password")} type="password" name="password"  />
            <Link href="/">
              <p className={styles.esqueceu_senha}>Esqueceu a senha?</p>
            </Link>
            <button className={styles.button} type="submit">ENTRAR</button>
          </form>
        </main>
      </div>
    </div>
  );
}