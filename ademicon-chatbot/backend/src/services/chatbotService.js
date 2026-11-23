export function getBotReply(rawMessage) {
  const message = rawMessage.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (/(oi|ola|bom dia|boa tarde|boa noite| tudo bem)/.test(message)) {
    return "Olá! Seja bem-vindo ao atendimento do Maycon Abraham, representante comercial da Ademicon. 😊 Como posso ajudar? Digite 1 para imóveis, 2 para veículos, 3 para entender como funciona ou 4 para falar com o consultor.";
  }
  if (/(^|\\D)1(\\D|$)|imovel|casa|apartamento|terreno/.test(message)) {
    return "O consórcio imobiliário pode ajudar no planejamento para comprar, construir ou reformar um imóvel, conforme as regras do grupo. Você procura comprar, construir ou investir em um imóvel?";
  }
  if (/(^|\\D)2(\\D|$)|veiculo|carro|moto/.test(message)) {
    return "O consórcio de veículos é uma modalidade de compra planejada. Você tem interesse em carro, moto ou veículo pesado?";
  }
  if (/(^|\\D)3(\\D|$)|como funciona|consorcio/.test(message)) {
    return "No consórcio, pessoas participam de um grupo e contribuem mensalmente. A contemplação acontece por sorteio ou lance, conforme contrato e disponibilidade do grupo. Não há garantia de contemplação em uma data específica. Quer conversar sobre uma simulação?";
  }
  if (/(^|\\D)4(\\D|$)|consultor|atendente|humano|maycon|whatsapp/.test(message)) {
    return "Perfeito! Você pode falar diretamente com Maycon Abraham pelo WhatsApp: https://wa.me/5595981294876. Se preferir, deixe seus dados no formulário desta página.";
  }
  if (/(parcela|simula|credito|valor|preco)/.test(message)) {
    return "Posso ajudar a encaminhar uma simulação. Informe o valor aproximado da carta de crédito e se procura imóvel ou veículo. Os valores finais dependem do plano, taxas, prazo e regras vigentes.";
  }

  return "Entendi! Para direcionar seu atendimento, me diga se procura consórcio imobiliário, de veículos ou se deseja falar diretamente com o consultor. Você também pode digitar 1, 2, 3 ou 4.";
}
