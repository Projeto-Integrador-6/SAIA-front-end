import React from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";

import './index.css';

export default function ForgottenPassword() {
  return (
    <div className="login-container">
      <div className="side-image">
        <div className="image" />
      </div>

      <div className="side-login">
        <div className="welcome-text">
          <h2>Recuperação de senha.</h2>
          <p>Insira seus dados abaixo para recuperar a sua senha.</p>
        </div>
        <div>
          <form className="login">
            <div className="input-block">
              <Input
                label="E-mail"
                type="email"
                placeholder="Digite seu e-mail"
              />
            </div>
            <div className="button-spacing">
              <Button
                description="Solicitar"
                color="var(--green)"
              />
            </div>
            <div className="button-spacing">
              <Button
                description="Voltar"
                color="var(--red)"
                link="/"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}