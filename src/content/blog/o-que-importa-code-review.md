---
author: Filipe Silva
pubDatetime: 2024-12-21T22:02:25Z
modDatetime: 2024-12-22T15:08:44Z
title: O que importa em um code review
slug: o-que-importa-code-review
featured: true
draft: false
tags:
  - code-review
description: |
  Uma das práticas mais comuns e difundidas na indústria de software é o code
  review. Em algum ponto do desenvolvimento, um desenvolvedor deve submeter
  suas alterações a outro profissional para que estas sejam validadas. Após
  algumas idas e vindas, o código é aprovado e segue no fluxo de
  desenvolvimento. A motivação parece clara: validar nossas mudanças antes que
  sejam integradas ao sistema. Contudo, com o tempo e o contato com pessoas de
  diferentes níveis de experiência, tanto avaliando quanto sendo avaliadas, fui
  percebendo que nem sempre é intuitivo o que deve ser avaliado durante um code
  review. É exatamente isso que pretendo explorar neste post.
---

Uma das práticas mais comuns e difundidas na indústria de software é o code
review. Em algum ponto do desenvolvimento, um desenvolvedor deve submeter suas
alterações a outro profissional para que estas sejam validadas. Após algumas
idas e vindas, o código é aprovado e segue no fluxo de desenvolvimento. A
motivação parece clara: validar nossas mudanças antes que sejam integradas ao
sistema. Contudo, com o tempo e o contato com pessoas de diferentes níveis de
experiência, tanto avaliando quanto sendo avaliadas, fui percebendo que nem
sempre é intuitivo o que deve ser avaliado durante um code review. É exatamente
isso que pretendo explorar neste post.

## Tabela de conteúdos

## Não é só sobre o código

Antes mesmo de começar a escrever o código que está sendo avaliado, o autor
tinha uma intenção clara: resolver algo, seja um bug, uma nova feature ou até
mesmo realizar um refactor. Um ponto importante, e muitas vezes negligenciado
pelos avaliadores, é não se limitar a avaliar apenas a forma como o código foi
escrito, mas também como ele se relaciona com a intenção original por trás do
trabalho. Isso pode parecer óbvio, mas são incontáveis as vezes em que
presenciei esse cenário se repetir.

Pois, uma estratégia comum para realizar revisões é varrer, de cima para baixo, as
alterações enviadas em um _pull request_, observando as linhas vermelhas e
verdes que se entrelaçam e formam o novo código. Durante essa leitura, o
avaliador concentra sua atenção na forma como o código foi escrito, analisando
como variáveis e funções foram definidas. Geralmente, o objetivo é ler o código
apresentado e avaliá-lo de forma crítica.

Uma prática que eu adoto para code reviews é seguir a seguinte hierarquia para
se avaliar um PR (pull request):

- Avaliar como o código escrito resolve o problema inicial.
- Avaliar a arquitetura do código.
- Avaliar a forma como o código foi escrito.

Como qualquer outra prática, essa abordagem exige disciplina e não deve ser
vista como uma solução universal. Ela pode não se encaixar perfeitamente em
todos os cenários.

## Como o código escrito resolve o problema inicial

Para avaliar uma solução, é essencial compreender profundamente o problema que
está sendo resolvido. Em minha experiência, acredito que todos os
desenvolvedores com quem tive contato reconhecem a importância disso. No
entanto, apesar de reconhecerem essa importância, muitos se contentam em ter
uma visão superficial do problema, o que acaba resultando em avaliações
igualmente superficiais.

Em um time que aplica alguma metodologia ágil, todos os membros se reúnem para
o planejamento de uma _sprint_ ou ciclo, dependendo do _sabor agile_ que você
prefere. Juntos, tentam explicar e discutir a solução de um problema. Porém,
com o passar do tempo e à medida que o time se ocupa com as outras atividades,
essa discussão vai sendo esquecida. Assim, no momento de revisar a solução, nem
o planejamento nem o problema discutido são lembrados.

Isso, claro, varia de acordo com a cultura do time e a senioridade dos membros.
No entanto, caso você perceba que os _code reviews_ não estão sendo críticos em
relação ao problema, uma abordagem interessante pode ser tentar registrar as
discussões durante o planejamento, para que elas possam ser resgatadas durante
o processo de avaliação.

Outra abordagem interessante é o autor do PR resgatar os pontos principais das
discussões e registrar as dificuldades enfrentadas durante o desenvolvimento,
além dos pontos que precisaram ser alterados desde o período de planejamento.
Dessa forma, os avaliadores conseguem avaliar criticamente as soluções
apresentadas, com mais contexto sobre como as decisões foram tomadas e também
sobre a abordagem escolhida para resolver o problema inicial.

## A arquitetura do código

Após avaliar como o problema foi resolvido e se a solução é realmente adequada,
a arquitetura é o segundo ponto mais importante devido ao custo de sua
correção, que é o esforço necessário para ajustar uma arquitetura não ideal.

Este é um ponto mais delicado, pois, dependendo do escopo das alterações, a
arquitetura pode significar coisas distintas. No caso de estruturar um novo
micro-serviço, pode envolver a forma como os outros serviços existentes vão se
relacionar com esse serviço. No caso de uma nova feature, pode significar a
maneira como as novas classes ou métodos foram estruturados.

Como membro do time e corresponsável pela saúde da _codebase_ e pelas entregas,
seu papel ao avaliar a arquitetura é pensar criticamente se há uma solução
melhor que pode ser alcançada de forma **razoável**. O foco na palavra
“razoável” é importante, pois, no mundo do software e na vida como um todo,
muitas vezes precisamos nos comprometer com o _“bom o suficiente”_. O objetivo
não deve ser a arquitetura ou o código perfeito, mas o “bom o suficiente”,
aquele com o qual, como time, podemos nos comprometer para garantir a
manutenibilidade e o bom funcionamento.

Ou seja, diante de uma arquitetura proposta, o que deve ser avaliado é o
seguinte: considerando os requisitos atuais e a arquitetura existente do
sistema, há algum ponto em que a nova arquitetura submetida pode gerar ganhos
no momento? “Ganhos” é uma palavra vaga de forma proposital, pois esses podem
incluir maior testabilidade, aderência aos padrões existentes, uso de soluções
mais conhecidas… basicamente, é o que seu time considera valioso para o código.

## A forma como o código foi escrito

Chegamos ao ponto menos prioritário da nossa hierarquia de itens a serem
revisados. Este é o momento em que surgem sugestões para mudar o nome de uma
variável, alterar a estrutura de uma função ou usar o tipo _X_ em vez do tipo
_Y_ para otimizar aqueles importantes 10ns na execução do código.

Esses tipos de comentários têm seu valor, porém, em comparação com os outros
itens, o custo de correção que eles envolvem é muito mais baixo do que erros
arquiteturais ou de funcionalidade. Um _refactor_ de nome de variável pode ser
facilmente corrigido em um _commit_ posterior. Isso é interessante, pois,
embora seja o item menos importante, é também o tipo de comentário mais
presente nos code reviews.

É importante evitar que o processo de code review se torne cansativo para o
autor do PR. Uma prática pessoal que adoto é fazer comentários do tipo nitpick
apenas quando os outros tipos de observações mais relevantes já foram
abordados. Isso ajuda a (1) manter o foco nos aspectos mais importantes, (2)
evitar sobrecarregar o autor com sugestões superficiais e (3) não prolongar
desnecessariamente o ciclo de revisão.

Recomendo a leitura desse
[post](https://blog.danlew.net/2021/02/23/stop-nitpicking-in-code-reviews/).

## Conclusão

O code review é um processo crucial no desenvolvimento de software. No entanto,
entender que a revisão vai além de simplesmente analisar o código escrito e
saber o que priorizar ao revisar um PR é fundamental. Escrevo a partir da
perspectiva de um tech lead de um time pequeno, com membros de diferentes
níveis de experiência, mas espero que minhas reflexões possam ser úteis
independentemente do contexto em que você se encontra. Até a próxima!
