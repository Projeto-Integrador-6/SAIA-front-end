import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { ButtonOne } from "../../components/Button";
import { Input } from "../../components/Input";

import './index.css';

export default function Login() {

  useEffect(() => {
    document.title = `SAIA`
  })

  return (
    <div className="login-container">
      <div className="side-image">
        <div className="image" />
      </div>

      <div className="side-login">
        <div className="welcome-text">
          <h2>Olá! Bem-vindo ao SAIA.</h2>
          <p>Insira seus dados abaixo para efetuar o login no sistema.</p>
        </div>

        <div>
          <form className="login">
            <div className="input-block">
              <Input
                label="Usuário"
                type="text"
                placeholder="Digite seu usuário"
              />
            </div>
            <div className="input-block">
              <Input
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
              >
                <Link className="forgotten-password" to="/forgotten_password">Esqueceu a senha?</Link>
              </Input>
            </div>

            <div className="input-block">
              <ButtonOne
                description="Entrar"
                color="var(--green)"
                link="/home"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}