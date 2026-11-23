import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function App() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Olá! 👋 Seja bem-vindo ao atendimento do Maycon Abraham, representante comercial da Ademicon. Como posso ajudar?\\n\\n1 - Consórcio imobiliário\\n2 - Consórcio de veículos\\n3 - Como funciona o consórcio\\n4 - Falar com o consultor"
    }
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", interest: "Consórcio imobiliário" });
  const [leadStatus, setLeadStatus] = useState("");

  async function sendMessage(value = input) {
    const message = value.trim();
    if (!message || busy) return;

    setMessages((old) => [...old, { from: "user", text: message }]);
    setInput("");
    setBusy(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível responder.");
      setMessages((old) => [...old, { from: "bot", text: data.reply }]);
    } catch {
      setMessages((old) => [...old, {
        from: "bot",
        text: "Não consegui acessar o servidor agora. Confira se o backend está ligado e tente novamente."
      }]);
    } finally {
      setBusy(false);
    }
  }

  async function submitLead(event) {
    event.preventDefault();
    setLeadStatus("Enviando...");
    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Confira os dados.");
      setLeadStatus("Cadastro recebido! Maycon poderá entrar em contato.");
      setForm({ name: "", phone: "", interest: "Consórcio imobiliário" });
    } catch (error) {
      setLeadStatus(error.message || "Erro ao enviar cadastro.");
    }
  }

  return (
    <main className="page">
      <header className="brand">
        <div className="brand-mark">A</div>
        <div>
          <strong>ADEMICON</strong>
          <span>Consórcio e Investimento</span>
        </div>
      </header>

      <section className="intro">
        <p className="eyebrow">ATENDIMENTO DIGITAL</p>
        <h1>Planeje hoje.<br /><em>Conquiste amanhã.</em></h1>
        <p>Conheça opções de consórcio e tire suas dúvidas com nosso assistente virtual.</p>
      </section>

      <section className="content">
        <div className="chat card">
          <div className="chat-head">
            <div className="avatar">MA</div>
            <div><strong>Assistente Ademicon</strong><small><i /> Atendimento virtual</small></div>
          </div>

          <div className="messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`message ${message.from}`} key={index}>
                {message.text.split("\\n").map((line, i) => <span key={i}>{line || " "}<br /></span>)}
              </div>
            ))}
            {busy && <div className="message bot">Digitando...</div>}
          </div>

          <div className="quick-options">
            {["1", "2", "3", "4"].map((option) => (
              <button key={option} onClick={() => sendMessage(option)} disabled={busy}>{option}</button>
            ))}
          </div>

          <form className="send" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Digite sua mensagem..." aria-label="Mensagem" />
            <button type="submit" disabled={busy || !input.trim()}>Enviar</button>
          </form>
        </div>

        <aside className="lead card">
          <p className="eyebrow">FALE COM A GENTE</p>
          <h2>Receba atendimento personalizado</h2>
          <p>Preencha seus dados para que o consultor possa continuar seu atendimento.</p>
          <form onSubmit={submitLead}>
            <label>Seu nome<input required minLength="2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome completo" /></label>
            <label>WhatsApp<input required minLength="8" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(00) 00000-0000" /></label>
            <label>Tenho interesse em
              <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                <option>Consórcio imobiliário</option>
                <option>Consórcio de veículos</option>
                <option>Simulação de crédito</option>
                <option>Quero tirar dúvidas</option>
              </select>
            </label>
            <button className="primary" type="submit">Enviar meus dados</button>
            {leadStatus && <p className="status" role="status">{leadStatus}</p>}
          </form>
          <a className="whatsapp" href="https://wa.me/5595981294876" target="_blank" rel="noreferrer">Continuar pelo WhatsApp</a>
        </aside>
      </section>

      <footer>Maycon Abraham · Representante comercial<br /><small>As informações são iniciais. Consulte as condições, taxas, prazos e regras do plano antes de contratar. A contemplação depende de sorteio ou lance e não tem data garantida.</small></footer>
    </main>
  );
}
