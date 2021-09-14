import React from "react";

import './index.css';

export default function Login() {
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
              <label>Usuário</label>
              <input type="email" placeholder="Digite seu usuário" />
            </div>
            <div className="input-block">
              <label>Senha</label>
              <input type="password" placeholder="Digite sua senha" />
              <p className="forgotten-password">Esqueceu a senha?</p>
            </div>
            
            <div className="input-block">
              <button className="btn-login">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}