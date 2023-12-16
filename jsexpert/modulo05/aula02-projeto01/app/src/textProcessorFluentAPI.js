// (?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$


// O objetivo do Fluent API é executar tarefas
// como um pipeline, step by step
// e no fim, chama o build. Muito similar ao padrao Builder
// a diferenca que aqui é sobre processos, o Builder sobre construcao de objetos

class TextProcessorFluentAPI {
  // propriedade privada!
  #content

  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    // // (?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$
    // ?<= fala que vai extrair os dados que virao depois desse grupo
    // [contratante|contratada] ou um ou outro, (e tem a flag no fim da expressao para pegar maiusculo e minusculo)
    // :\s{1} vai prourar o caracter literal do dois pontos seguindo de um espaco
    // tudo acima fica dentro de um parenteses para falar "vamos pegar daí para frente"

    // (?!\s) => negative look around, vai ignorar os contratantes do fim do documento (que tem só espaco a frente deles)
    // .*\n pega qualquer coisa até o primeiro \n
    // .*? => non greety, esse `?` => pega todas as letras e números que seguem até o primeiro caracter especial, assim ele evita ficar em loop para não deixar tudo .*

    // $ informar que a pesquisa acaba no fim da linha
    // g -> global
    // m -> multiline
    // i -> insensitive


    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi

    // faz o match para encontrar a string inteira que contem os dados que precisamos
    const onlyPerson = this.#content.match(matchPerson)
    // console.log('onlyPerson', matchPerson.test(this.#content))
    this.#content = onlyPerson
    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI;