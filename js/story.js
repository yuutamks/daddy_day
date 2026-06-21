/**
 * story.js — Datos de la historia para la Novela Visual del Día del Padre
 * 
 * Cada capítulo contiene escenas con:
 *   - text: Texto narrativo (aparece con typewriter)
 *   - background: Imagen de fondo
 *   - photo: Foto familiar (opcional)
 *   - mood: Tono emocional (controla partículas y colores)
 *   - choices: Opciones emotivas (opcional)
 *   - chapterTitle: Título del capítulo (solo en la primera escena)
 *   - chapterSubtitle: Subtítulo (solo en la primera escena)
 *   - effect: Efecto especial ('fireworks', 'stars', 'rain')
 *   - narrator: Nombre del narrador
 */

const STORY_DATA = {
  chapters: [
    // ═══════════════════════════════════════════════════════════
    // CAPÍTULO 1 — EL INICIO
    // ═══════════════════════════════════════════════════════════
    {
      id: "ch1",
      title: "El Inicio",
      scenes: [
        {
          id: "ch1_s1",
          chapterTitle: "Capítulo 1",
          chapterSubtitle: "El Inicio",
          text: "",
          background: "assets/backgrounds/ch1_inicio.png",
          mood: "nostalgic",
          narrator: "",
          isChapterCard: true
        },
        {
          id: "ch1_s2",
          text: "Mi padre nunca fue un padre para mí... al menos no de la manera en que uno imagina que debería ser.",
          background: "assets/backgrounds/ch1_inicio.png",
          mood: "nostalgic",
          narrator: "Narrador"
        },
        {
          id: "ch1_s3",
          text: "Cuando tenía 5 años, mis padres se divorciaron. El mundo que conocía se partió en dos, como una hoja de papel rasgada por la mitad.",
          background: "assets/backgrounds/ch1_inicio.png",
          mood: "nostalgic",
          narrator: "Narrador"
        },
        {
          id: "ch1_s4",
          text: "De pronto, siendo el hijo mayor, tuve que crecer lo más rápido posible. Responsabilidades que no deberían caer sobre los hombros de un niño... cayeron sobre los míos.",
          background: "assets/backgrounds/ch1_inicio.png",
          photo: "assets/photos/papa_yo_y_mi_hermano.jpg",
          photoCaption: "Mi padre, mi hermano y yo",
          mood: "nostalgic",
          narrator: "Narrador"
        },
        {
          id: "ch1_s5",
          text: "Tuve que cuidar de mi hermano menor. Tomar responsabilidades que mi padre debería haber tomado.",
          background: "assets/backgrounds/ch1_inicio.png",
          photo: "assets/photos/papa_yo_y_mi_hermano.jpg",
          photoCaption: "Mi padre, mi hermano y yo",
          mood: "melancholic",
          narrator: "Narrador",
          choices: [
            {
              text: "Fue difícil, pero me hizo fuerte",
              mood: "determined",
              nextVariant: "Sin embargo, esa carga me forjó. Me hizo más fuerte de lo que jamás imaginé que sería."
            },
            {
              text: "A veces dolía llevar ese peso",
              mood: "sad",
              nextVariant: "Hubo noches donde el peso era demasiado. Donde solo quería ser un niño más, sin preocupaciones de adulto."
            }
          ]
        },
        {
          id: "ch1_s6",
          text: null,  // Se llena dinámicamente con la elección anterior
          background: "assets/backgrounds/ch1_inicio.png",
          mood: "reflective",
          narrator: "Narrador",
          isDynamic: true,
          defaultText: "Mi madre hizo todo lo posible por criarnos como madre soltera. Es difícil mantener un equilibrio entre responsabilidades, economía y tiempo de calidad."
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════
    // CAPÍTULO 2 — CRECER RÁPIDO
    // ═══════════════════════════════════════════════════════════
    {
      id: "ch2",
      title: "Crecer Rápido",
      scenes: [
        {
          id: "ch2_s1",
          chapterTitle: "Capítulo 2",
          chapterSubtitle: "Crecer Rápido",
          text: "",
          background: "assets/backgrounds/ch2_crecer.png",
          mood: "determined",
          narrator: "",
          isChapterCard: true
        },
        {
          id: "ch2_s2",
          text: "Crecer aceleradamente me hizo madurar en pensamiento y responsabilidades. Me volví muy autodidacta en muchos aspectos.",
          background: "assets/backgrounds/ch2_crecer.png",
          mood: "determined",
          narrator: "Narrador"
        },
        {
          id: "ch2_s3",
          text: "Mi mente siempre andaba descubriendo cosas nuevas por aprender. Cada día era una oportunidad para entender algo que no entendía antes.",
          background: "assets/backgrounds/ch2_crecer.png",
          mood: "hopeful",
          narrator: "Narrador"
        },
        {
          id: "ch2_s4",
          text: "Eso es lo que me llevó hasta lo que soy el día de hoy. No fue un camino fácil, pero fue el mío.",
          background: "assets/backgrounds/ch2_crecer.png",
          mood: "proud",
          narrator: "Narrador",
          choices: [
            {
              text: "El dolor fue mi mejor maestro",
              mood: "resilient",
              nextVariant: "Cada tropiezo me enseñó más que cualquier libro. El dolor se convirtió en sabiduría, y la soledad en independencia."
            },
            {
              text: "Aprendí a caminar solo",
              mood: "independent",
              nextVariant: "Cuando nadie te lleva de la mano, aprendes a encontrar tu propio camino. Y lo encontré... paso a paso, tropiezo a tropiezo."
            }
          ]
        },
        {
          id: "ch2_s5",
          text: null,
          background: "assets/backgrounds/ch2_crecer.png",
          mood: "reflective",
          narrator: "Narrador",
          isDynamic: true,
          defaultText: "Me llené del coraje para poder enfrentar las cosas yo solo. La ausencia de mi padre, sin saberlo, me estaba formando."
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════
    // CAPÍTULO 3 — LA CHISPA
    // ═══════════════════════════════════════════════════════════
    {
      id: "ch3",
      title: "La Chispa",
      scenes: [
        {
          id: "ch3_s1",
          chapterTitle: "Capítulo 3",
          chapterSubtitle: "La Chispa",
          text: "",
          background: "assets/backgrounds/ch3_chispa.png",
          mood: "curious",
          narrator: "",
          isChapterCard: true
        },
        {
          id: "ch3_s2",
          text: "A pesar de estar divorciados, muy ocasionalmente mi padre nos visitaba. Y a él... le encantaban los circuitos electrónicos.",
          background: "assets/backgrounds/ch3_chispa.png",
          mood: "curious",
          narrator: "Narrador"
        },
        {
          id: "ch3_s3",
          text: "Tenía un emprendimiento con un negocio de cámaras de seguridad. La tecnología era parte de su mundo, y en esas breves visitas... me dejó entrar en él.",
          background: "assets/backgrounds/ch3_chispa.png",
          mood: "warm",
          narrator: "Narrador"
        },
        {
          id: "ch3_s4",
          text: "Me enseñaba un par de cosas y yo fui descubriendo cómo funcionaban. Eso plantó en mí una curiosidad insaciable de entender cómo funciona el mundo.",
          background: "assets/backgrounds/ch3_chispa.png",
          photo: "assets/photos/papa_spiderman_mi_hermano.jpg",
          photoCaption: "Mi padre con mi hermano",
          mood: "inspired",
          narrator: "Narrador",
          choices: [
            {
              text: "Eso encendió algo en mí",
              mood: "grateful",
              nextVariant: "Fue ahí donde nació mi curiosidad insaciable. Una chispa que mi padre encendió sin darse cuenta... y que nunca se apagó."
            },
            {
              text: "Ojalá hubiera estado más tiempo",
              mood: "bittersweet",
              nextVariant: "Esos momentos fueron breves, pero dejaron una huella profunda. Como las estrellas: lejanas, pero su luz alcanza a iluminar la noche."
            }
          ]
        },
        {
          id: "ch3_s5",
          text: null,
          background: "assets/backgrounds/ch3_chispa.png",
          mood: "warm",
          narrator: "Narrador",
          isDynamic: true,
          defaultText: "Mi tío nos había regalado una computadora. Comencé a explorar, la llené de virus, exploré modos de personalización de Windows... ya era un 'power user' desde la era de Windows XP."
        },
        {
          id: "ch3_s6",
          text: "Todos los objetos tecnológicos tenían un misterio por resolver. Y yo quería resolverlos todos.",
          background: "assets/backgrounds/ch3_chispa.png",
          mood: "inspired",
          narrator: "Narrador"
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════
    // CAPÍTULO 4 — EL COLEGIO
    // ═══════════════════════════════════════════════════════════
    {
      id: "ch4",
      title: "El Colegio",
      scenes: [
        {
          id: "ch4_s1",
          chapterTitle: "Capítulo 4",
          chapterSubtitle: "El Colegio",
          text: "",
          background: "assets/backgrounds/ch4_colegio.png",
          mood: "determined",
          narrator: "",
          isChapterCard: true
        },
        {
          id: "ch4_s2",
          text: "Surgió la oportunidad de estudiar en un colegio dedicado a enseñar computación y tecnología. La colegiatura era accesible.",
          background: "assets/backgrounds/ch4_colegio.png",
          mood: "hopeful",
          narrator: "Narrador"
        },
        {
          id: "ch4_s3",
          text: "Mi padre comenzó a pagarlo. Pero al no tener preparatoria, no podía acceder a un sueldo mayor. El tema económico se le complicaba mucho.",
          background: "assets/backgrounds/ch4_colegio.png",
          photo: "assets/photos/papa_de_excursion.jpg",
          photoCaption: "Mi padre de excursión",
          mood: "bittersweet",
          narrator: "Narrador"
        },
        {
          id: "ch4_s4",
          text: "Después de unos meses, mi padre ya no pudo pagarlo. Pero yo no iba a rendirme. Con mis ahorros de un trabajo informal, comencé a pagar yo mismo.",
          background: "assets/backgrounds/ch4_colegio.png",
          mood: "determined",
          narrator: "Narrador"
        },
        {
          id: "ch4_s5",
          text: "Trabajaba medio día por la mañana y acudía a la preparatoria en la tarde. Sin gastar nada para poder pagar la colegiatura.",
          background: "assets/backgrounds/ch4_colegio.png",
          mood: "resilient",
          narrator: "Narrador",
          choices: [
            {
              text: "Ese sacrificio valió cada segundo",
              mood: "proud",
              nextVariant: "Cada peso ahorrado, cada madrugada, cada cena que me salté... todo tuvo un propósito. Y ese propósito se convirtió en mi futuro."
            },
            {
              text: "Ningún joven debería pasar por eso",
              mood: "reflective",
              nextVariant: "Mirando atrás, sé que no debería haber sido así. Pero la vida no siempre es justa, y a veces hay que construir el camino con las propias manos."
            }
          ]
        },
        {
          id: "ch4_s6",
          text: null,
          background: "assets/backgrounds/ch4_colegio.png",
          mood: "proud",
          narrator: "Narrador",
          isDynamic: true,
          defaultText: "Fueron cerca de año y medio. Aprendí desde gestión de documentos hasta diseño gráfico, modelado 3D, páginas web... Habilidades que me abrieron las puertas al mundo."
        },
        {
          id: "ch4_s7",
          text: "Con lo que estudié pude abrirme camino: primero como docente, y después como desarrollador de software. Hoy desarrollo sistemas complejos combinando diferentes tecnologías.",
          background: "assets/backgrounds/ch4_colegio.png",
          mood: "proud",
          narrator: "Narrador"
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════
    // CAPÍTULO 5 — OTRA FAMILIA
    // ═══════════════════════════════════════════════════════════
    {
      id: "ch5",
      title: "Otra Familia",
      scenes: [
        {
          id: "ch5_s1",
          chapterTitle: "Capítulo 5",
          chapterSubtitle: "Otra Familia",
          text: "",
          background: "assets/backgrounds/ch1_inicio.png",
          mood: "complex",
          narrator: "",
          isChapterCard: true
        },
        {
          id: "ch5_s2",
          text: "Después, mi padre formó otra familia. Otros hijos. En Veracruz. Pasamos por ese proceso y los vi crecer.",
          background: "assets/backgrounds/ch1_inicio.png",
          photo: "assets/photos/papa_con_mis_otros_hermanos_de_otra_familia.jpg",
          photoCaption: "Mi padre con mis medios hermanos",
          mood: "complex",
          narrator: "Narrador"
        },
        {
          id: "ch5_s3",
          text: "No soy tan cercano con mis medios hermanos, pero tampoco llevamos una mala relación. La vida es más compleja de lo que parece a simple vista.",
          background: "assets/backgrounds/ch1_inicio.png",
          photo: "assets/photos/papa_con_mis_otros_hermanos_de_otra_familia.jpg",
          photoCaption: "Mi padre con mis medios hermanos",
          mood: "bittersweet",
          narrator: "Narrador",
          choices: [
            {
              text: "La familia no siempre es simple",
              mood: "accepting",
              nextVariant: "Aprendí que las familias vienen en todas las formas. No hay un molde perfecto, y está bien que sea así."
            },
            {
              text: "Sentí que nos reemplazó",
              mood: "hurt",
              nextVariant: "Hubo un tiempo en que sentí que éramos piezas intercambiables. Que podía simplemente empezar de nuevo... sin nosotros."
            }
          ]
        },
        {
          id: "ch5_s4",
          text: null,
          background: "assets/backgrounds/ch1_inicio.png",
          mood: "reflective",
          narrator: "Narrador",
          isDynamic: true,
          defaultText: "Sin embargo, con el tiempo entendí que la vida no es blanco y negro. Mi padre no es un villano... es un ser humano imperfecto, como todos."
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════
    // CAPÍTULO 6 — HERIDAS
    // ═══════════════════════════════════════════════════════════
    {
      id: "ch6",
      title: "Heridas",
      scenes: [
        {
          id: "ch6_s1",
          chapterTitle: "Capítulo 6",
          chapterSubtitle: "Heridas",
          text: "",
          background: "assets/backgrounds/ch6_heridas.png",
          mood: "dark",
          narrator: "",
          isChapterCard: true
        },
        {
          id: "ch6_s2",
          text: "Crecimos en el entorno familiar de mi madre. Y ella, con su rencor guardado, en ciertas ocasiones nos guiaba por un camino de dolor.",
          background: "assets/backgrounds/ch6_heridas.png",
          mood: "dark",
          narrator: "Narrador"
        },
        {
          id: "ch6_s3",
          text: "Guiados por esa ideología, llegamos a lastimar emocionalmente a mi padre. Con comentarios hirientes... con formas de agresión emocional que hoy me pesan.",
          background: "assets/backgrounds/ch6_heridas.png",
          mood: "regret",
          narrator: "Narrador"
        },
        {
          id: "ch6_s4",
          text: "No me enorgullezco de esos momentos. Eran heridas que generaban más heridas. Un ciclo que alguien tenía que romper.",
          background: "assets/backgrounds/ch6_heridas.png",
          mood: "regret",
          narrator: "Narrador",
          choices: [
            {
              text: "El rencor solo destruye a quien lo carga",
              mood: "wise",
              nextVariant: "Entendí que el rencor es como beber veneno esperando que el otro se enferme. Solo me estaba destruyendo a mí mismo."
            },
            {
              text: "Todos estábamos rotos de alguna forma",
              mood: "compassionate",
              nextVariant: "Mi madre cargaba sus propias heridas. Mi padre también. Y yo, sin querer, me convertí en eslabón de una cadena de dolor que no me pertenecía."
            }
          ]
        },
        {
          id: "ch6_s5",
          text: null,
          background: "assets/backgrounds/ch6_heridas.png",
          mood: "somber",
          narrator: "Narrador",
          isDynamic: true,
          defaultText: "Pero algo dentro de mí sabía que ese no era el camino. Que tenía que haber otra forma de ver las cosas."
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════
    // CAPÍTULO 7 — EL PERDÓN
    // ═══════════════════════════════════════════════════════════
    {
      id: "ch7",
      title: "El Perdón",
      scenes: [
        {
          id: "ch7_s1",
          chapterTitle: "Capítulo 7",
          chapterSubtitle: "El Perdón",
          text: "",
          background: "assets/backgrounds/ch7_perdon.png",
          mood: "hopeful",
          narrator: "",
          isChapterCard: true,
          effect: "stars"
        },
        {
          id: "ch7_s2",
          text: "A medida que voy creciendo, entiendo la parte de mi padre. Es difícil ser adulto y cargar con los hijos cuando no siempre todo sale como uno se imagina.",
          background: "assets/backgrounds/ch7_perdon.png",
          mood: "understanding",
          narrator: "Narrador"
        },
        {
          id: "ch7_s3",
          text: "Ahora, en mi nueva etapa de vida, entiendo a mi padre. No es el mejor... al menos para mí. Pero sé que no lo hizo con intención.",
          background: "assets/backgrounds/ch7_perdon.png",
          photo: "assets/photos/papa_frente_auto_coleccion.jpg",
          photoCaption: "Mi padre",
          mood: "warm",
          narrator: "Narrador"
        },
        {
          id: "ch7_s4",
          text: "Es algo que no estaba del todo en su control. O quizá sí... si hubiera tenido una buena guía para tomar el control de sus emociones y tomar buenas decisiones.",
          background: "assets/backgrounds/ch7_perdon.png",
          mood: "compassionate",
          narrator: "Narrador"
        },
        {
          id: "ch7_s5",
          text: "Él siempre intenta apoyarme en mis proyectos. Quise ser músico y él quiso apoyarme. No pudo en lo económico, pero sí en lo emocional.",
          background: "assets/backgrounds/ch7_perdon.png",
          mood: "warm",
          narrator: "Narrador"
        },
        {
          id: "ch7_s6",
          text: "Me felicitaba cada que le contaba lo que hacía. Escuchaba mis canciones. Me quiere, aunque no siempre sepa cómo demostrarlo.",
          background: "assets/backgrounds/ch7_perdon.png",
          mood: "loving",
          narrator: "Narrador",
          choices: [
            {
              text: "El amor no siempre se dice con palabras",
              mood: "grateful",
              nextVariant: "A veces el amor se esconde en pequeños gestos. En un \"qué bien, hijo\", en una sonrisa al escuchar una canción, en un intento fallido de estar presente."
            },
            {
              text: "Gracias por nunca dejar de intentar",
              mood: "forgiving",
              nextVariant: "Quizá nunca fue perfecto. Quizá se equivocó mil veces. Pero nunca dejó de intentarlo... y eso, hoy lo entiendo, es lo que cuenta."
            }
          ]
        },
        {
          id: "ch7_s7",
          text: null,
          background: "assets/backgrounds/ch7_perdon.png",
          mood: "hopeful",
          narrator: "Narrador",
          isDynamic: true,
          defaultText: "Mi padre, a pesar de todos los fallos del pasado, lo perdono y lo admiro. No por ser perfecto, sino por ser humano."
        },
        {
          id: "ch7_s8",
          text: "Por eso, desde hace ya unos años, aprendí a perdonar. A pesar de todo, nunca ha sido un padre convencional... pero sí ha sido un impulso hacia lo que soy hoy.",
          background: "assets/backgrounds/ch7_perdon.png",
          mood: "serene",
          narrator: "Narrador",
          effect: "stars"
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════
    // CAPÍTULO 8 — CELEBRACIÓN
    // ═══════════════════════════════════════════════════════════
    {
      id: "ch8",
      title: "Celebración",
      scenes: [
        {
          id: "ch8_s1",
          chapterTitle: "Capítulo 8",
          chapterSubtitle: "Celebración",
          text: "",
          background: "assets/backgrounds/ch8_celebracion.png",
          mood: "celebration",
          narrator: "",
          isChapterCard: true,
          effect: "fireworks"
        },
        {
          id: "ch8_s2",
          text: "Hoy, en este Día del Padre, celebro la gran labor que ha hecho.",
          background: "assets/backgrounds/ch8_celebracion.png",
          mood: "celebration",
          narrator: "Narrador",
          effect: "fireworks"
        },
        {
          id: "ch8_s3",
          text: "Celebro que a mis hermanos menores, con su otra familia, no les faltó el padre que él es.",
          background: "assets/backgrounds/ch8_celebracion.png",
          photo: "assets/photos/papa_con_mis_otros_hermanos_de_otra_familia_actual_crecidos.jpg",
          photoCaption: "Mi padre con mis hermanos, hoy",
          mood: "celebration",
          narrator: "Narrador",
          effect: "fireworks"
        },
        {
          id: "ch8_s4",
          text: "Y gracias... gracias por hacerme lo que soy hoy.",
          background: "assets/backgrounds/ch8_celebracion.png",
          photo: "assets/photos/papa_con_mis_otros_hermanos_de_otra_familia_actual_crecidos.jpg",
          photoCaption: "Mi padre con mis hermanos, hoy",
          mood: "celebration",
          narrator: "Narrador",
          effect: "fireworks",
          choices: [
            {
              text: "Te quiero, papá 💛",
              mood: "love",
              nextVariant: null
            },
            {
              text: "Gracias por todo, papá ✨",
              mood: "gratitude",
              nextVariant: null
            }
          ]
        },
        {
          id: "ch8_s5",
          text: "Feliz Día del Padre",
          background: "assets/backgrounds/ch8_celebracion.png",
          mood: "celebration",
          narrator: "",
          effect: "fireworks",
          isFinalScene: true,
          finalEmoji: "🎉💛👨‍👦",
          finalSubtext: "Con todo mi cariño, respeto y admiración."
        }
      ]
    }
  ]
};

// Exportar para uso global
window.STORY_DATA = STORY_DATA;
