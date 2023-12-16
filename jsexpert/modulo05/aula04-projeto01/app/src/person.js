const { evaluateRegex } = require("./util");

class Person {
  // (\w+):\s(.+)(,)
  // $1$3
  constructor([
    nome, 
    nacionalidade, 
    estadoCivil, 
    document, 
    rua,
    numero,
    bairro,
    estado,
  ]) {

    console.log('nacionalidade',nacionalidade)

    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/)

    const formatFirstLetter = (prop) => {
      return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
        // { fullMatch: 'brasileira', group1: 'b', group2: 'rasileira', index: 0 }
        return `${group1.toUpperCase()}${group2.toLowerCase()}`
      })
    }

    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    this.document = document.replace(evaluateRegex(/\D/g), '');
    // comeca a procurar depois do " a " e pega tudo que tem a frente utilizando o positive lookbehind
    // (?<= faz com que ignore tudo que tiver antes desse match)
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/), '').join();
    this.numero = numero;
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
    this.estado = estado.replace(evaluateRegex(/\.$/), '');
  }
}

module.exports = Person