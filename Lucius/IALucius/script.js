const inputQuestion = document.getElementById("inputQuestion");
const result = document.getElementById("result"); 

inputQuestion.addEventListener("keypress", (e) => {
  if (inputQuestion.value && e.key === "Enter") {
    console.log("A tecla Enter foi pressionada!");
    SendQuestion();
  }
});


const OPENAI_API_KEY = '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';

function SendQuestion() {
  var sQuestion = inputQuestion.value;
  



  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: sQuestion,
      max_tokens: 2800, // tamanho da resposta
      temperature: 0.5, // criatividade na resposta
    }),
  })

    .then((response) => response.json())
    .then((json) => {
      ////////////////////////////////////////////////////////////////////////////nome da ia/////////////////////////////////////////////
      const nome = "Meu nome é Lúcius, eu vim do submundo digital ajudar os humanos que querem se desenvolver.";
      const idade = "(ツ)";
      const sexo = "Sou um robô criado por Portes.Darkhat";
      const cidade = "Sou de Cyberpunk";
      const telefone = "999999999";
      const email = "<EMAIL>";
      const profissao = "Desenvolvedor Web";
      
      
      // Condição para responder com base nas informações do usuário

      if (sQuestion === 'Qual é o seu nome?') {
        var text = (`${nome}.`);
        result.value += "\n⛧Lúcius⛧:" + `\n\n${nome}`;
      }

      else if (sQuestion === 'Qual é a sua idade?') {
        var text = (`${idade}.`);
        result.value += "\n⛧Lúcius⛧:" + `\n\n${idade} `;

      }
      else if (sQuestion === 'Qual é o seu gênero?') {
        var text = (`${sexo}.`);
        result.value += "\n⛧Lúcius⛧:" + `\n\n${sexo} `;

      }
      else if (sQuestion === 'De onde você é?') {
        var text = (`${cidade}.`);
        result.value += "\n⛧Lúcius⛧:" + `\n\n${cidade} `;

      }
      /////////////////////////////////////////////////condições para perguntas////////////////////////////////////////////////////////////////

      else if (json.error?.message) {
        result.value += `Error: ${json.error.message}`;
      }
      
      else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";
        result.value += "\n⛧Lúcius⛧:" + text;
      }//comentario finalnode

      result.scrollTop = result.scrollHeight;
    })

    .catch((error) => console.error("Error:", error))
    .finally(() => {
      inputQuestion.value = "";
      inputQuestion.disabled = false;
      inputQuestion.focus();
    });
  
  if (result.value) result.value += "\n\n";
 
  result.value += `Eu: \n\n${sQuestion}\n`;
  inputQuestion.value = "Carregando...";
  inputQuestion.disabled = true;



  result.scrollTop = result.scrollHeight;
}

