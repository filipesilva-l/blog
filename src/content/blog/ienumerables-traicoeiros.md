---
author: Filipe Silva
title: IEnumerables traiçoeiros
pubDatetime: 2024-03-22T17:24:13Z
slug: ienumerables-traicoeiros
featured: true
draft: false
tags:
  - dotnet
  - programacao
description:
  O tipo IEnumerable é muito comum no dia a dia dos desenvolvedores dotnet.
  No entanto, é um tipo que muitos não entendem profundamente e acabam
  fazendo uso inadequado dele. Neste post, vou tentar explicar um pouco
  como ele funciona, como evitar erros comuns ao utilizá-lo e compartilhar
  algumas dicas extras.
---

É muito comum encontrar o tipo IEnumerable nas bases de código dotnet e,
ao mesmo tempo, também é comum encontrar o mau uso dele em muitas instâncias.
Neste post, vamos explorar um pouco sobre o que é um IEnumerable, seus
diferentes significados e como utilizá-lo de modo efetivo.

## Tabela de conteúdos

## O que _é_ um IEnumerable?

Respondendo de forma curta e grossamente simplificada: `IEnumerable` é um objeto que gera uma sequência
de elementos ou, para ser um pouco mais preciso, representa algo que pode ser
_enumerado_.

Porém, é mais proveitoso nos aprofundarmos um pouco mais na sua
implementação e no seu conceito. Para isso, vamos dar uma olhada no código
da interface.

```cs
public interface IEnumerable<T>
{
    IEnumerator<T> GetEnumerator();
}

public interface IEnumerator<T>
{
    T Current { get; }

    bool MoveNext();

    void Reset();
}
```

<sup>Referências: _[IEnumerable](https://github.com/dotnet/runtime/blob/3eb129fd57994bb7ecfff6f93259bd829423cde1/src/libraries/System.Private.CoreLib/src/System/Collections/IEnumerable.cs)_, _[IEnumerator](https://github.com/dotnet/runtime/blob/3eb129fd57994bb7ecfff6f93259bd829423cde1/src/libraries/System.Private.CoreLib/src/System/Collections/IEnumerator.cs)_

No trecho de código acima, podemos ver a presença de outra interface com
um nome semelhante à que estamos discutindo: o `IEnumerator`. Ele define
um objeto que gera uma **sequência**, onde o atual elemento fica na
propriedade `Current` e pode-se avançar na sequência usando o `MoveNext()`,
que retorna `false` ao chegar ao fim dela.

Tendo em mente os conceitos do `IEnumerable` e `IEnumerator`, podemos
entender que, por exemplo, o código a seguir:

```cs
foreach (var item in meuIEnumerable)
    Console.WriteLine(item);
```

é traduzido para isso:

```cs
var enumerador = meuIEnumerable.GetEnumerator();

while (enumerador.MoveNext())
    Console.WriteLine(enumerador.Current);
```

<sup>[Referência](https://sharplab.io/#v2:CYLg1APgAgTAjAWAFBQAwAIpwCwG5lQDMmM6AwugN7Lq2bFTboCyAFAJRU108BuAhgCd0AGwCWAZwAu/dAF50AOwCmAd3QAZSVIA8YxVIB8HfEh49x0/gDoAgsGCs47U+bqWZdh6xgvub/3MAMwB7QWV+AGMAC3RWAWExKWUAW3R9UW1+dkCeajM3cywATlYk1L8CtwBfQNqkaqA)

Ou seja, no final das contas, um `IEnumerable` é só um objeto que retorna um
_enumerador_, que por sua vez, é um objeto que tem a lógica para guardar
o valor atual da sequência e como obter o próximo. Simples, não?

## IEnumerable vs coleções

No tópico anterior, conseguimos definir o que é o IEnumerable e as palavras
"coleção", "lista" ou "array" não foram mencionadas uma única vez. Isso,
apesar de poder parecer estranho, não é por acaso. Apesar de ser o caso
de uso mais comum, IEnumerables podem ser empregados em outros contextos.
Vamos explorar alguns destes cenários diferentes.

### Coleções materializadas e não-materializadas

O principal cenário onde os IEnumerables são diferentes que coleções como
listas ou arrays são em relação à materialização. Para entender melhor
este conceito, vamos definir o que é uma coleção materializada.

> Uma coleção materializada é aquela em que todos os elementos pertencentes
> a ela já estão contidos na memória.

A partir desta definição, podemos inferir que coleções não-materializadas
são aquelas em que nem todos os elementos estão contidos na memória.

Sei que minha breve formação em filosofia pode ter escapado nessa parte
de definições, mas vamos sair do abstrato e resgatá-las novamente depois.
nada melhor que alguns exemplos para voltarmos ao prático.

```cs
private List<int> ObterList()
{
    var lista = new List<int>();

    for (var i = 0; i < tamanho; i++)
        lista.Add(i);

    return lista;
}

public int SomarList()
{
    var sum = 0;

    foreach (var item in ObterList())
        sum += item;

    return sum;
}
```

```
| Method               | tamanho | Mean       | Error    | StdDev    | Median     | Gen0   | Allocated |
|--------------------- |-------- |-----------:|---------:|----------:|-----------:|-------:|----------:|
| BenchmarkList        | 100     |   354.8 ns |  2.33 ns |   1.95 ns |   354.5 ns | 0.2828 |    1184 B |
| BenchmarkIEnumerable | 100     |   217.0 ns |  5.36 ns |  15.21 ns |   213.4 ns | 0.0095 |      40 B |
| BenchmarkList        | 1000    | 3,116.9 ns | 96.56 ns | 280.14 ns | 3,037.1 ns | 2.0103 |    8424 B |
| BenchmarkIEnumerable | 1000    | 1,728.2 ns |  5.62 ns |   4.69 ns | 1,728.8 ns | 0.0095 |      40 B |
```

No exemplo
