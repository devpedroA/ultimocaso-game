import { Caso } from '@/types';
import { generateRandomCase } from '@/utils/caseGenerator';

const caseTemplates: Record<string, Caso> = {
  blackwood: {
    id: 'blackwood',
    titulo: '🕵️‍♂️ O Mistério da Mansão Blackwood',
    descricao: 'Numa noite chuvosa de novembro, Sir Reginald Blackwood foi encontrado morto em sua biblioteca. A causa da morte foi envenenamento, e o relógio parou às 23:45. Como detetive convidado, você tem 48 horas para desvendar este mistério antes que o assassino escape ou destrua as evidências.',
    dificuldade: 'medio',
    tempoLimite: 48,
    locais: [
      {
        id: 'biblioteca',
        nome: 'Biblioteca',
        descricao: 'Uma vasta biblioteca com milhares de livros antigos. O corpo de Sir Blackwood foi encontrado em sua poltrona favorita, com uma xícara de chá pela metade na mesa ao lado.',
        itens: [
          {
            id: 'livro_veneno',
            nome: 'Livro sobre Venenos',
            descricao: 'Um livro antigo detalhando diferentes tipos de venenos e suas propriedades.',
            tipo: 'evidencia',
            relevancia: 8,
            localEncontrado: 'biblioteca',
          },
          {
            id: 'carta_ameaca',
            nome: 'Carta de Ameaça',
            descricao: 'Uma carta ameaçadora endereçada a Sir Blackwood.',
            tipo: 'evidencia',
            relevancia: 9,
            localEncontrado: 'biblioteca'
          },
          {
            id: 'xicara_cha',
            nome: 'Xícara de Chá',
            descricao: 'A xícara de chá que Sir Blackwood estava bebendo.',
            tipo: 'evidencia',
            relevancia: 10,
            localEncontrado: 'biblioteca'
          }
        ],
        pistas: [
          'Há marcas de dedos na prateleira mais alta',
          'O tapete está levemente desalinhado',
          'Uma janela está entreaberta',
          'Há um cheiro estranho misturado ao aroma do chá',
          'O relógio de parede parou exatamente às 23:45'
        ],
        imagem: 'https://imgs.search.brave.com/swY6GN2ujzxzsLCiMUfwGJLogP8m2mBrt1yGno0jSks/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vQTJqQThl/MUxNNDh1Rzg0d1M0/a01YRG9HbXR4S01s/TUhJV0tnWTdCdWlK/dy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlw/YldjdS9abkpsWlhC/cGF5NWpiMjB2L1pt/OTBiM010Y0hKbGJX/bDEvYlM5aWFXSnNh/VzkwWldOaC9MWFJw/Wlc1bExXMTFZMmh2/L2N5MXNhV0p5YjNO/Zk1UQXgvTXpJeU1D/MDBPVGd1YW5Cbi9Q/M05sYlhROVlXbHpY/Mmg1L1luSnBaQ1oz/UFRjME1B.jpeg',

        visitado: false
      },
      {
        id: 'escritorio',
        nome: 'Escritório',
        descricao: 'O escritório particular de Sir Blackwood.',
        itens: [
          {
            id: 'testamento',
            nome: 'Testamento',
            descricao: 'O testamento de Sir Blackwood com alterações recentes.',
            tipo: 'evidencia',
            relevancia: 7,
            localEncontrado: 'escritorio'
          },
          {
            id: 'diario_pessoal',
            nome: 'Diário Pessoal',
            descricao: 'O diário pessoal de Sir Blackwood com anotações recentes.',
            tipo: 'evidencia',
            relevancia: 8,
            localEncontrado: 'escritorio'
          }
        ],
        pistas: [
          'O cofre está aberto',
          'Há uma xícara de chá pela metade',
          'O relógio parou às 23:45',
          'Documentos importantes estão espalhados sobre a mesa'
        ],
        imagem: 'https://imgs.search.brave.com/C5AXGhl1qsAOzZzytI-_7aJvwTRFXwO8eBz9--vKyvw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vRzBzc2FR/bmNuRkZYUk14OUhy/WGhRSUdIdWxIbTZK/NnFfTkZuWVZUVjFM/US9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTkz/WVd4cy9jR0Z3WlhK/ekxtTnZiUzlwL2JX/Rm5aWE12YUdRdlky/OW0vWm1WbExXWnNi/M2RsY25NdC9ZVzVr/TFdKdmIydHpMV1Jo/L2Ntc3RZV05oWkdW/dGFXRXQvWkdWemEz/UnZjQzB6Wm1KbC9O/M0p4TnpKeU5qQXpO/bU5qL0xtcHdadw.jpeg',

        visitado: false
      },
      {
        id: 'cozinha',
        nome: 'Cozinha',
        descricao: 'A cozinha da mansão.',
        itens: [
          {
            id: 'chaleira',
            nome: 'Chaleira Antiga',
            descricao: 'A chaleira usada para preparar o chá.',
            tipo: 'evidencia',
            relevancia: 8,
            localEncontrado: 'cozinha'
          },
          {
            id: 'receita_cha',
            nome: 'Receita de Chá',
            descricao: 'Uma receita antiga para preparar o chá especial de Sir Blackwood.',
            tipo: 'evidencia',
            relevancia: 6,
            localEncontrado: 'cozinha'
          }
        ],
        pistas: [
          'A chaleira ainda está quente',
          'Há um pó estranho espalhado sobre o balcão',
          'O livro de receitas está aberto em uma página sobre chás'
        ],
        imagem: 'https://img-cdn.pixlr.com/image-generator/history/6830d7d24994efcd8280c843/cf1d9611-53d0-4f0e-a551-6fb27ccb64d4/preview.webp',
        visitado: false
      },
      {
        id: 'jardim',
        nome: 'Jardim de Inverno',
        descricao: 'Um elegante jardim de inverno com plantas exóticas.',
        itens: [
          {
            id: 'planta_venenosa',
            nome: 'Planta Exótica',
            descricao: 'Uma planta rara e venenosa que não deveria estar aqui.',
            tipo: 'evidencia',
            relevancia: 9,
            localEncontrado: 'jardim'
          },
          {
            id: 'pegadas',
            nome: 'Pegadas Suspeitas',
            descricao: 'Pegadas recentes na terra molhada do jardim.',
            tipo: 'evidencia',
            relevancia: 7,
            localEncontrado: 'jardim'
          }
        ],
        pistas: [
          'Algumas plantas foram arrancadas recentemente',
          'Há pegadas de salto alto na terra molhada',
          'Uma cadeira está desalinhada'
        ],
        imagem: 'https://img-cdn.pixlr.com/image-generator/history/6830d81dd1f85f909fda7ffa/a4b76723-66cf-451a-9a42-edd4cfd27ed0/preview.webp',
        visitado: false
      }
    ],
    suspeitos: {
      mordomo: {
        id: "mordomo",
        nome: "James, o Mordomo",
        ocupacao: "Mordomo",
        descricao: "Mordomo leal da família há 30 anos. Conhecido por sua dedicação e conhecimento dos segredos da família.",
        motivo: "Vingança por descobrir que Sir Blackwood planejava demiti-lo e revelar seu passado criminoso",
        imagem: "https://img-cdn.pixlr.com/image-generator/history/6830d9a0d1f85f909fdaa4c4/cb9b22a6-1751-4bf4-bf5e-8eebc75decda/preview.webp",
        evidenciasPerson: [
          "livro_veneno",
          "xicara_cha",
          "testamento",
          "chaleira",
          "diario_pessoal"
        ],
        dialogos: {
          textoGeral: "Sir Blackwood era como um pai para mim. Eu nunca faria nada para prejudicá-lo... embora ele tenha levantado a sua contra meu futuro.",
          reacao: {
            culpado: {
              livro_veneno: { text: "Este compêndio... costumava estar na estante leste. Alguém o moveu recentemente - eu notaria, pois organizo os livros por cor e altura." },
              carta_ameaca: { text: "Esta caligrafia... não é minha. Mas observo que foi escrita com a caneta tinteiro do escritório - a mesma que sumiu semana passada." },
              xicara_cha: { text: "Preparei o chá como todas as noites... porém, nessa ocasião, Lady Victoria insistiu em 'ajudar' a levar a bandeja." },
              testamento: { text: "O testamento... eu não poderia deixar ele me deserdar após três décadas de serviço impecável!" },
              chaleira: { text: "A chaleira... notei marcas de pó branco no cabo naquela noite, mas... decidi não comentar." },
              planta_venenosa: { text: "Essas plantas... eu as encontrei no jardim na manhã seguinte. Alguém as plantou ali recentemente." },
              diario_pessoal: { text: "O diário... ele descobriu meu... incidente em Yorkshire. Eu não podia permitir que isso viesse à tona." },
              receita_cha: { text: "A receita... eu a segui à risca, como sempre. Exceto por... um pequeno acréscimo naquela noite." },
              pegadas: { text: "As pegadas... eu estava no jardim... procurando pelas plantas que sumiram do estoque." }
            },
            inocente: {
              livro_veneno: { text: "Este compêndio deveria estar trancado. Sir Blackwood o mantinha no cofre após descobrir sobre... certos interesses da Lady Victoria." },
              carta_ameaca: { text: "Nunca vi esta carta. Observe o papel - é do bloco pessoal do Sr. Thomas, guardado em sua escrivaninha." },
              xicara_cha: { text: "Sir Blackwood sempre pedia seu chá às 23:30. Naquela noite, porém, Lady Victoria insistiu em levá-lo pessoalmente." },
              testamento: { text: "As alterações no testamento preocupavam o senhor. Ele mencionou receber ameaças do Sr. Thomas naquela tarde." },
              chaleira: { text: "A chaleira tem 47 anos - presente de casamento. Eu a polia toda noite, mas naquela tarde... notei que já estava manchada." },
              planta_venenosa: { text: "Estas espécies não constam no inventário do jardim. O jardineiro Robert as trouxe secretamente, creio eu." },
              diario_pessoal: { text: "O diário estava aberto na página onde Sir Blackwood detalhava as dívidas de jogo do filho com a máfia de Londres." },
              receita_cha: { text: "A receita original está guardada no cofre. Esta cópia foi adulterada - compare a tinta do terceiro ingrediente." },
              pegadas: { text: "As pegadas combinam com as botas do jardineiro, mas os passos são muito leves... como se alguém tivesse usado seus sapatos." }
            }
          }
        },
        personalidade: ["Leal", "Reservado", "Metódico"],
        relacoes: {
          "Sir Reginald": "Meu patrão por 30 anos, que descobriu meu segredo",
          "Thomas": "O herdeiro, que sempre me tratou com desprezo",
          "Margaret": "A governanta, que suspeita de mim"
        }
      },
      herdeiro: {
        id: "herdeiro",
        nome: "Thomas Blackwood, O Herdeiro",
        ocupacao: "Herdeiro",
        descricao: "Filho mais velho e herdeiro principal. Conhecido por seu estilo de vida extravagante e dívidas de jogo.",
        motivo: "Medo de perder a herança e exposição de suas dívidas ilegais com a máfia",
        imagem: "https://img-cdn.pixlr.com/image-generator/history/6830da9c746fdec43693eb57/b97b008b-23a6-4262-86c6-ffb3bb4712f8/preview.webp",
        evidenciasPerson: [
          "carta_ameaca",
          "testamento",
          "diario_pessoal",
          "pegadas",
          "planta_venenosa"
        ],
        dialogos: {
          textoGeral: "Meu pai era um velho teimoso! Mas... mas eu não... você acha mesmo que eu faria isso?!",
          reacao: {
            culpado: {
              livro_veneno: { text: "Esse livro... eu o vi na biblioteca quando... quando procurava um volume de poesia!" },
              carta_ameaca: { text: "Eu... eu não escrevi essa carta! Bem, não EXATAMENTE dessa forma..." },
              xicara_cha: { text: "O chá... eu vi o mordomo preparando... ele parecia nervoso... diferente do normal..." },
              testamento: { text: "O testamento... ele ia me deserdar por causa daquelas malditas dívidas!" },
              chaleira: { text: "A chaleira... eu a vi na cozinha quando fui buscar uísque... estava estranhamente limpa." },
              planta_venenosa: { text: "Essas plantas... o jardineiro as trouxe. Eu avisei ao pai que ele era perigoso!" },
              diario_pessoal: { text: "O diário... ele descobriu minhas dívidas com os Moretti... eu estava perdido!" },
              receita_cha: { text: "A receita... eu a vi na cozinha... aberta exatamente na página errada..." },
              pegadas: { text: "As pegadas... eu estava no jardim fumando... não podia fumar dentro de casa!" }
            },
            inocente: {
              carta_ameaca: { text: "Alguém está tentando me incriminar! Observe o papel - é do meu bloco, mas a caligrafia imita a minha de forma grosseira!" },
              xicara_cha: { text: "Eu vi a governanta Margaret mexendo no chá antes do mordomo servir. Ela nunca fazia isso..." },
              testamento: { text: "Sim, eu estava deserdado! Mas meu tio de Bristol já havia me garantido apoio financeiro." },
              chaleira: { text: "Aquela chaleira é uma relíquia! Meu pai nunca permitiria que eu me aproximasse dela." },
              planta_venenosa: { text: "Victoria coleciona essas plantas venenosas como hobby. Pergunte a ela sobre seu 'herbário secreto'." },
              diario_pessoal: { text: "Meu pai escreveu sobre minhas dívidas, sim. Mas também sobre seu plano para me ajudar a quitá-las." },
              receita_cha: { text: "A receita original está no cofre. Esta cópia foi alterada - compare a assinatura no rodapé." },
              pegadas: { text: "Eu vi Robert, o jardineiro, andando naquela área naquela noite. Ele usava botas novas... muito limpas para um jardineiro." }
            }
          }
        },
        personalidade: ["Extravagante", "Impulsivo", "Ambicioso"],
        relacoes: {
          "Sir Blackwood": "Meu pai, que ia me deserdar",
          "Lady Blackwood": "Minha mãe, que sempre me protegeu",
          "Robert": "Meu irmão, que ia herdar tudo"
        }
      },
      governanta: {
        id: "governanta",
        nome: "Margaret White, A Governanta",
        ocupacao: "Governanta",
        descricao: "Governanta da mansão há 20 anos. Conhecida por sua eficiência e conhecimento dos segredos da família.",
        motivo: "Vingança por descobrir que Sir Blackwood sabia sobre seu esquema de desvio de dinheiro da família",
        imagem: "https://img-cdn.pixlr.com/image-generator/history/6830dac18d26b3bae3b0dd4d/05ee8340-8001-4e34-9f53-b97b1f98f8ec/preview.webp",
        evidenciasPerson: [
          "livro_veneno",
          "xicara_cha",
          "chaleira",
          "receita_cha",
          "diario_pessoal"
        ],
        dialogos: {
          textoGeral: "Sir Blackwood era um homem justo. Sim, tivemos nossas diferenças, mas eu sempre fui leal à família... até onde me convém.",
          reacao: {
            culpado: {
              livro_veneno: { text: "Este livro... eu o consultei para identificar a planta certa... digo, para catalogar a coleção botânica." },
              carta_ameaca: { text: "Nunca vi esta carta... mas reconheço o papel - é do bloco que desapareceu do escritório mês passado." },
              xicara_cha: { text: "O chá... eu o preparei como sempre... embora naquela noite tenha deixado o mordomo completar o serviço." },
              testamento: { text: "O testamento... eu não poderia deixar ele me denunciar à Scotland Yard por meros... desvios de recursos." },
              chaleira: { text: "A chaleira... eu a limpei cuidadosamente após usá-la... como faço todas as noites." },
              planta_venenosa: { text: "Essas plantas... eu as colhi no jardim naquela tarde... para estudo." },
              diario_pessoal: { text: "O diário... ele registrava cada centavo que 'desviava'... o tolo mantinha registros detalhados!" },
              receita_cha: { text: "A receita... eu a modifiquei levemente... afinal, Sir Blackwood sempre reclamava do gosto." },
              pegadas: { text: "As pegadas... eu estava no jardim... eliminando evidências... digo, podando os arbustos." }
            },
            inocente: {
              livro_veneno: { text: "Este livro estava trancado no cofre. Alguém o removeu - note a marca de luva na capa." },
              carta_ameaca: { text: "A carta usa termos financeiros que só o Sr. Thomas e eu conhecemos. E eu não a escrevi." },
              xicara_cha: { text: "Eu preparei o chá, mas foi o mordomo quem o serviu. Note a posição da xícara - ele sempre a colocava 5cm mais à direita." },
              testamento: { text: "As alterações incluíam uma cláusula sobre investigar as contas da casa. Alguém não gostou disso." },
              chaleira: { text: "A chaleira foi limpa com álcool após o uso - procedimento incomum que só o jardineiro costuma seguir." },
              planta_venenosa: { text: "Estas plantas foram transplantadas há três dias. O jardineiro Robert pode explicar sua súbita aparição." },
              diario_pessoal: { text: "A última entrada detalha uma conversa com o mordomo sobre seu passado... criminoso." },
              receita_cha: { text: "Alguém adulterou a receita. O verdadeiro manuscrito está guardado no cofre, como sempre esteve." },
              pegadas: { text: "As pegadas levam à estufa traseira, onde Victoria mantém seu 'laboratório' particular." }
            }
          }
        },
        personalidade: ["Eficiente", "Reservada", "Observadora"],
        relacoes: {
          "Sir Blackwood": "Meu patrão, que descobriu meus desvios",
          "Lady Blackwood": "Minha patroa, que sempre me tratou bem",
          "Thomas": "O herdeiro, sempre tão arrogante"
        }
      },
      jardineiro: {
        id: "jardineiro",
        nome: "Robert Green, O Jardineiro",
        ocupacao: "Jardineiro",
        descricao: "Jardineiro da mansão há 15 anos. Especialista em plantas exóticas e venenosas.",
        motivo: "Vingança por Sir Blackwood ter descoberto seu passado como traficante de plantas venenosas",
        imagem: "https://img.artguru.ai/image/aigc/alg%26watermark%26p%26d1a06e266e4d626d344067737deb8009_1024_1024.webp",
        evidenciasPerson: [
          "livro_veneno",
          "planta_venenosa",
          "pegadas",
          "receita_cha",
          "diario_pessoal"
        ],
        dialogos: {
          textoGeral: "As plantas falam, detetive. E a Hemlock na xícara dele gritou 'vingança' naquela noite... brincadeira. Ou não?",
          reacao: {
            culpado: {
              livro_veneno: { text: "Este livro é minha bíblia... me mostrou exatamente quanto de cicuta um homem pode suportar antes..." },
              xicara_cha: { text: "O chá... eu não tenho nada a ver com isso... embora tenha fornecido os... ingredientes especiais." },
              testamento: { text: "O testamento... ele ia me denunciar à Interpol por meu... negócio de exportação." },
              chaleira: { text: "A chaleira... eu a vi na cozinha quando fui buscar água para minhas... plantas medicinais." },
              planta_venenosa: { text: "Minhas belas meninas... tão úteis em pequenas doses... e tão letais em grandes." },
              diario_pessoal: { text: "O diário... ele registrava cada espécie que eu... 'emprestava' do jardim botânico." },
              receita_cha: { text: "A receita... eu adicionei um toque especial... um presente de despedida." },
              pegadas: { text: "Minhas pegadas? Não, estas são muito pequenas... a menos que alguém tenha usado minhas botas..." }
            },
            inocente: {
              livro_veneno: { text: "Este livro está aberto na página errada. Quem o consultou não sabia que a cicuta deixa odor característico." },
              xicara_cha: { text: "O cheiro do chá está errado. Sir Blackwood nunca tomaria Earl Grey com lavanda - isso mascararia o gosto de..." },
              testamento: { text: "O testamento menciona meu passado? Curioso, pois Sir Blackwood me concedeu perdão formal há dois meses." },
              chaleira: { text: "A chaleira foi limpa com vinagre - método que só Victoria usa para remover resíduos químicos." },
              planta_venenosa: { text: "Estas não são minhas plantas. Note o corte imperfeito - Victoria as colheu sem saber manusear corretamente." },
              diario_pessoal: { text: "A última entrada fala sobre as dívidas de Thomas, não sobre meus... empreendimentos anteriores." },
              receita_cha: { text: "Alguém riscou o ingrediente 'mel' e escreveu 'açúcar' - Sir Blackwood era alérgico a açúcar!" },
              pegadas: { text: "Estas pegadas foram feitas por botas novas. As minhas têm 15 anos e o solado está gasto de forma distinta." }
            }
          }
        },
        personalidade: ["Paciente", "Observador", "Misterioso"],
        relacoes: {
          "Sir Blackwood": "Meu patrão, que descobriu meu passado",
          "Victoria": "A sobrinha, que sempre se interessou por minhas plantas",
          "Margaret": "A governanta, que desconfia de mim"
        }
      },
      sobrinha: {
        id: "sobrinha",
        nome: "Victoria Blackwood, a Sobrinha",
        ocupacao: "Sobrinha",
        descricao: "Sobrinha de Sir Blackwood. Interessada em botânica e herdeira secundária.",
        motivo: "Vingança por Sir Blackwood ter descoberto seu envolvimento com o tráfico de plantas venenosas",
        imagem: "https://img.artguru.ai/image/aigc/alg%26watermark%26p%26ee43a2ba72fd21e1be8b2b71788b323e_1024_1024.webp",
        evidenciasPerson: [
          "livro_veneno",
          "planta_venenosa",
          "pegadas",
          "receita_cha",
          "carta_ameaca"
        ],
        dialogos: {
          textoGeral: "Meu tio chamava meus estudos de 'perversão científica'. Mas quem ri por último... não estará mais aqui para rir.",
          reacao: {
            culpado: {
              livro_veneno: { text: "Este livro é fascinante! A página 143 mostra como extrair toxinas sem deixar... digo, como identificar venenos." },
              carta_ameaca: { text: "Eu... eu não escrevi essa carta! Bem, não TODAS essas palavras... apenas as partes em itálico." },
              xicara_cha: { text: "O chá... eu apenas adicionei um pouco de mel... mel muito especial da minha coleção." },
              testamento: { text: "O testamento... ele ia me deserdar por causa de meu 'hobby'... como se ele fosse um santo!" },
              chaleira: { text: "A chaleira... eu a limpei cuidadosamente com vinagre após usar... para remover manchas." },
              planta_venenosa: { text: "Minhas belas meninas... tão incompreendidas. 0.1g cura enxaquecas, 1g cura... problemas familiares." },
              diario_pessoal: { text: "O diário... ele descobriu meu acordo com o jardineiro... nosso 'negócio de exportação'." },
              receita_cha: { text: "A receita... eu a 'melhorei' com meus conhecimentos botânicos... tio nunca apreciou ciência." },
              pegadas: { text: "As pegadas... eu estava no jardim colhendo ingredientes para meu... pesquisa." }
            },
            inocente: {
              livro_veneno: { text: "Esta edição está desatualizada. A página sobre cicuta omite seu cheiro característico - erro que um assassino cometeria." },
              carta_ameaca: { text: "A caligrafia imita a minha, mas observe os 'R' - eu os faço com curva dupla, não simples como aqui." },
              xicara_cha: { text: "O resíduo na xícara é branco. Veneno de cicuta deixaria resíduo esverdeado - básico para qualquer botânico." },
              testamento: { text: "Eu era a única herdeira além de Thomas. Por que eu o mataria se já herdaria tudo com sua morte natural?" },
              chaleira: { text: "A chaleira foi limpa com álcool 70% - método que só o jardineiro usa para desinfetar ferramentas." },
              planta_venenosa: { text: "Estas foram colhidas incorretamente. Eu jamais cometeria erros tão amadores em minha coleção." },
              diario_pessoal: { text: "Tio escreveu sobre meus estudos, sim. Mas também sobre seu plano de financiar meu doutorado em Edimburgo." },
              receita_cha: { text: "Esta cópia está adulterada. A original especifica 'mel de lavanda' - meu tio era alérgico a açúcar comum." },
              pegadas: { text: "As pegadas são de botas tamanho 42. Eu calço 37 - fácil de verificar." }
            }
          }
        },
        personalidade: ["Intelectual", "Curiosa", "Determinada"],
        relacoes: {
          "Sir Blackwood": "Meu tio, que não aprovava meus estudos",
          "Robert": "O jardineiro, meu mentor em botânica",
          "Thomas": "Meu primo, que sempre me tratou com desprezo"
        }
      }
    },
    pistasIniciais: [
    ],
    solucao: {
      culpado: '',
      motivo: '',
      evidencias: []
    }
  },
};

// Função para gerar uma solução aleatória
function gerarSolucaoAleatoria(caso: Caso): {
  culpado: string;
  motivo: string;
  evidencias: string[];
} {
  const suspeitos = Object.keys(caso.suspeitos);
  const culpadoId = suspeitos[Math.floor(Math.random() * suspeitos.length)];
  const culpado = caso.suspeitos[culpadoId];
  
  // Pega o motivo do suspeito escolhido
  const motivo = culpado.motivo;
  
  // Seleciona 3-4 evidências aleatórias das evidências do suspeito
  const evidencias = culpado.evidenciasPerson
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 2) + 3);
  
  return {
    culpado: culpadoId,
    motivo,
    evidencias
  };
}

// Função para gerar um caso aleatório
export function getRandomCase(caseId: string): Caso | null {
  const template = caseTemplates[caseId];
  if (!template) return null;
  
  const caso = generateRandomCase(template);
  // Adiciona a solução aleatória ao caso
  caso.solucao = gerarSolucaoAleatoria(caso);
  
  return caso;
}

// Função para obter a lista de casos disponíveis
export function getAvailableCases(): Array<Pick<Caso, 'id' | 'titulo' | 'descricao' | 'dificuldade' | 'tempoLimite'>> {
  return Object.values(caseTemplates).map(({ id, titulo, descricao, dificuldade, tempoLimite }) => ({
    id,
    titulo,
    descricao,
    dificuldade,
    tempoLimite
  }));
} 