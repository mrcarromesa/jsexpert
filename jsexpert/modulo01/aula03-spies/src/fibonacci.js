class Fibonacci {
  *execute(input, current = 0, next = 1) {
    console.count('execute!')
    if (input===0){
      return 0;
    }

    // o yield nesse caso é como estivesse retornando os valores sob demanda
    yield current 
    // o yield nesse caso com o "*" vai delegar uma execução, ele não vai retornar esse valor
    yield* this.execute(input -1, next, current + next)
  }
}

module.exports = Fibonacci