require('dotenv').config();
const { permission } = require('process');
const { seedDatabase } = require('./seed-database');

const users = [
    {
        userid: 1,
        name: 'Nava Minsky-Primus',
        email: "nava.minsky-primus@yale.edu",
        permission: "admin",
        sub: "102234124442432259043"
    },
    {
        userid: 2,
        name: 'Nava Minsky-Primus',
        email: 'navaminskyprimus@gmail.com',
        permission: "user",
        sub: null
    },
    // 2021 participants
    { userid: 3,  name: 'Sema Stein',        email: 'semastein74@gmail.com',          permission: 'user', sub: null },
    { userid: 4,  name: 'Jess Tytell',        email: 'jesstytell@gmail.com',           permission: 'user', sub: null },
    { userid: 5,  name: 'Tova Ovadia',        email: 'tovaovpt@gmail.com',             permission: 'user', sub: null },
    { userid: 6,  name: 'Romana Primus',      email: 'romana.primus@gmail.com',        permission: 'user', sub: null },
    { userid: 7,  name: 'Naftaly Minsky',     email: 'nminsky@gmail.com',              permission: 'user', sub: null },
    { userid: 8,  name: 'Yehuda Kurtzer',     email: 'kurtzer@gmail.com',              permission: 'user', sub: null },
    { userid: 9,  name: 'Miri Pomerantz',     email: 'miri.pomerantz@gmail.com',       permission: 'user', sub: null },
    { userid: 10, name: 'Yair Minsky',        email: 'yairminsky@gmail.com',           permission: 'user', sub: null },
    { userid: 11, name: 'Martha Walker',      email: 'marthaestela444@gmail.com',      permission: 'user', sub: null },
    { userid: 12, name: 'Dan Cohen',          email: 'danielrpcohen@gmail.com',        permission: 'user', sub: null },
    { userid: 13, name: 'Martha Escobar',     email: 'mescobar@gmail.com',             permission: 'user', sub: null },
    { userid: 14, name: 'Dave Tytell',        email: 'dtytell@gmail.com',              permission: 'user', sub: null },
    { userid: 15, name: 'Richard Primus',     email: 'raprimus@gmail.com',             permission: 'user', sub: null },
    { userid: 16, name: 'Lisa Primus',        email: 'primusl@gmail.com',              permission: 'user', sub: null },
    { userid: 17, name: 'Zev Minsky-Primus',  email: 'zevminskyprimus@gmail.com',      permission: 'user', sub: null },
    { userid: 18, name: 'Dima Gorenburg',     email: 'gorenburg@gmail.com',            permission: 'user', sub: null },
    { userid: 19, name: 'Ethan Tucker',       email: 'ettucker@gmail.com',             permission: 'user', sub: null },
    { userid: 20, name: 'Yaron Minsky',       email: 'yminsky@gmail.com',              permission: 'user', sub: null },
    { userid: 21, name: 'Ariela Migdal',      email: 'amm266@nyu.edu',                 permission: 'user', sub: null },
    { userid: 22, name: 'Michelle Fisher',    email: 'rabbifisher@gmail.com',          permission: 'user', sub: null },
    { userid: 23, name: 'Jeremy Dauber',      email: 'jdauber@columbia.edu',           permission: 'user', sub: null },
    { userid: 24, name: 'Ida Gorenburg',      email: 'idagorenburg@gmail.com',         permission: 'user', sub: null },
    // 2022 new participants
    { userid: 25, name: 'Debra Fine',          email: 'Debra@finecapitalpartners.com',  permission: 'user', sub: null },
    { userid: 26, name: 'Elana Farbiarz',      email: 'elanamaxfarbiarz1@gmail.com',    permission: 'user', sub: null },
    { userid: 27, name: 'Jacob Gorenburg',     email: 'jacobgorenburg@gmail.com',       permission: 'user', sub: null },
    { userid: 28, name: 'Lois',                email: 'Lgwhrzel@gmail.com',             permission: 'user', sub: null },
    { userid: 29, name: 'Shula Minsky',        email: 'sminsky@gmail.com',              permission: 'user', sub: null },
    { userid: 30, name: 'Ada Fenick',          email: 'afenick@gmail.com',              permission: 'user', sub: null },
    { userid: 31, name: 'Sanjyot Dunung',      email: 'spdunung@atmaglobal.com',        permission: 'user', sub: null },
    { userid: 32, name: 'Sarah Farbiarz',      email: 'sarah.lila.farbiarz@gmail.com',  permission: 'user', sub: null },
    { userid: 33, name: 'Sarah Williams',      email: 'Sarah@propelcapital.org',        permission: 'user', sub: null },
    { userid: 34, name: 'Eitan Minsky-Fenick', email: 'emmf2000@gmail.com',             permission: 'user', sub: null },
    { userid: 35, name: 'Megan Lewis',         email: 'meganelewis859@gmail.com',       permission: 'user', sub: null },
    { userid: 36, name: 'Blanca',              email: 'bsfenix123@gmail.com',           permission: 'user', sub: null },
    { userid: 37, name: 'Alan Promer',         email: 'apromer2@gmail.com',             permission: 'user', sub: null },
    { userid: 38, name: 'Belinda Birnbaum',    email: 'belinda.birnbaum@gmail.com',     permission: 'user', sub: null },
    { userid: 39, name: 'Sharon Fenick',       email: 'sfenick@gmail.com',              permission: 'user', sub: null },
    { userid: 40, name: 'Sally Gottesman',     email: 'sally@eleemosynary.net',         permission: 'user', sub: null },
    { userid: 41, name: 'Dianne Newman',       email: 'dknewman@gmail.com',             permission: 'user', sub: null },
    { userid: 42, name: 'Lucas Kimball',       email: 'lucaskimball98@gmail.com',       permission: 'user', sub: null },
    { userid: 43, name: 'Nick Salter',         email: 'Nick@alliedadvisors.us',         permission: 'user', sub: null },
    { userid: 44, name: 'Sam Wurzel',          email: 'swurzel@gmail.com',              permission: 'user', sub: null },
    { userid: 45, name: 'Jonas Peters',        email: 'jonas.peters@gmail.com',         permission: 'user', sub: null },
    { userid: 46, name: 'Eyal Minsky-Fenick',  email: 'eyjmfc@gmail.com',              permission: 'user', sub: null },
    { userid: 47, name: 'Gabriel Farbiarz',    email: 'gabrielfarbiarz@gmail.com',      permission: 'user', sub: null },
    { userid: 48, name: 'Franco Baseggio',     email: 'fbaseggio@gmail.com',            permission: 'user', sub: null },
    { userid: 49, name: 'Michael Farbiarz',    email: 'farbiarzm@gmail.com',            permission: 'user', sub: null },
    { userid: 50, name: 'David R H Miller',    email: 'davidrhmiller@gmail.com',        permission: 'user', sub: null },
    { userid: 51, name: 'Sigal Minsky-Primus', email: 'sigalrmp@gmail.com',             permission: 'user', sub: null },
    { userid: 52, name: 'Nancy Koziol',        email: 'koziolnancy@gmail.com',          permission: 'user', sub: null },
    { userid: 53, name: 'Monse',               email: 'monserrate.gn@gmail.com',        permission: 'user', sub: null },
    { userid: 54, name: 'Eli Cohen',           email: '734122@dpsk12.net',              permission: 'user', sub: null },
];

const settings = ['2022-01-02T00:00:00Z','2022-02-09T00:00:00Z', 2021]

const questions = [
    // 2021 questions
    { questionid: 1,  text: 'Biden is sworn in, on schedule, on January 20th',                                                                                                                                                                                                      year: 2021, result: true,  isvalid: true  },
    { questionid: 2,  text: 'The Senate confirms at least 12 of Biden\'s first-round picks for the 15 cabinet positions',                                                                                                                                                           year: 2021, result: true,  isvalid: true  },
    { questionid: 3,  text: 'Trump pardons himself or a first-degree relative before leaving office.',                                                                                                                                                                              year: 2021, result: false, isvalid: true  },
    { questionid: 4,  text: 'Either Ossoff or Warnock (but not both) are elected to the Senate in Georgia.',                                                                                                                                                                        year: 2021, result: false, isvalid: true  },
    { questionid: 5,  text: 'All (or almost all) New York City public grade schools are open 5 days a week by the end of the 20-21 school year.',                                                                                                                                   year: 2021, result: true,  isvalid: true  },
    { questionid: 6,  text: 'Arsenal makes the Top Seven of the Premier League.',                                                                                                                                                                                                   year: 2021, result: false, isvalid: true  },
    { questionid: 7,  text: 'Bibi becomes Prime Minister of Israel again, after the 4th election since April 2019',                                                                                                                                                                 year: 2021, result: true,  isvalid: true  },
    { questionid: 8,  text: 'Bibi becomes Prime Minister of Israel again, after the 5th election since April 2019',                                                                                                                                                                 year: 2021, result: false, isvalid: true  },
    { questionid: 9,  text: 'Bibi is indicted (for anything)',                                                                                                                                                                                                                      year: 2021, result: null,  isvalid: false },
    { questionid: 10, text: 'Biden ends the year with his approval rating higher than his disapproval rating (measured by 538)',                                                                                                                                                     year: 2021, result: false, isvalid: true  },
    { questionid: 11, text: 'Boris Johnson\'s father will be granted French ciizenship.',                                                                                                                                                                                           year: 2021, result: null,  isvalid: false },
    { questionid: 12, text: 'By October 1st, Whole Foods no longer has social distancing stickers on the floor (measured at the NYC store on Columbus Ave)',                                                                                                                        year: 2021, result: false, isvalid: true  },
    { questionid: 13, text: 'By executive action, the Biden administration relieves some, but not all, student debt',                                                                                                                                                               year: 2021, result: false, isvalid: true  },
    { questionid: 14, text: 'Camp Ramah in the Berkshires is open and at capacity all summer',                                                                                                                                                                                      year: 2021, result: true,  isvalid: true  },
    { questionid: 15, text: 'Harvard beats Yale at the annual regata on the Thames River in New London.',                                                                                                                                                                           year: 2021, result: false, isvalid: true  },
    { questionid: 16, text: 'Lakers win the NBA Championship.',                                                                                                                                                                                                                     year: 2021, result: false, isvalid: true  },
    { questionid: 17, text: 'Major legislation gets through Congress and is signed into law on at least one of the following: infrastructure, healthcare (not including covid relief), climate change, election law, tax law. Richard Primus to adjuticate the meaning of "major"',  year: 2021, result: true,  isvalid: true  },
    { questionid: 18, text: 'New York State starts vaccinating ordinary healthy people by April 1st',                                                                                                                                                                               year: 2021, result: false, isvalid: true  },
    { questionid: 19, text: 'No court has ordered to break up Facebook, Facebook Messenger, Instagram, and/or Whatsapp',                                                                                                                                                            year: 2021, result: true,  isvalid: true  },
    { questionid: 20, text: 'No more than one major bill from the above list gets through Congress and signed into law in 2021.',                                                                                                                                                    year: 2021, result: false, isvalid: true  },
    { questionid: 21, text: 'The Boeing 737 Max will fly in 2021 without accident',                                                                                                                                                                                                 year: 2021, result: true,  isvalid: true  },
    { questionid: 22, text: 'The Dune remake wins a 2021 Oscar (any category).',                                                                                                                                                                                                    year: 2021, result: null,  isvalid: false },
    { questionid: 23, text: 'The Friends Reunion comes out in December as planned, and Ross and Rachel finally get married.',                                                                                                                                                        year: 2021, result: false, isvalid: true  },
    { questionid: 24, text: 'The biggest US forest fire of 2021 is bigger than any previous forest fire in the 21st century, as measured by square miles.',                                                                                                                         year: 2021, result: false, isvalid: true  },
    { questionid: 25, text: 'Trump officially starts his 2024 presidential campaign',                                                                                                                                                                                               year: 2021, result: false, isvalid: true  },
    { questionid: 26, text: 'US GDP growth in 2021 is the fastest of any year in the 21st century',                                                                                                                                                                                year: 2021, result: true,  isvalid: true  },
    { questionid: 27, text: 'Year-end unemployment is below 5%',                                                                                                                                                                                                                   year: 2021, result: true,  isvalid: true  },
    // 2022 questions
    { questionid: 28, text: 'No new pandemic will be recognized by the WHO. A new pandemic means: not a variant of COVID-19.',                                                                                                                                                      year: 2022, result: true,  isvalid: true  },
    { questionid: 29, text: 'From March 28th to April 10th, omicron will be responsible for fewer than 50% of the cases in New York.',                                                                                                                                              year: 2022, result: false, isvalid: true  },
    { questionid: 30, text: 'Inflation at the end of November 2022 is under 4%. (Inflation here is defined as the Consumer Price Index for All Urban Consumer, including energy and food, from Nov 1, 2021 to Nov 1, 2022.)',                                                        year: 2022, result: false, isvalid: true  },
    { questionid: 31, text: 'The price of bitcoin exceeds 100k USD at some point before Thanksgiving 2022, as measured by Coinbase\'s public price charts.',                                                                                                                        year: 2022, result: false, isvalid: true  },
    { questionid: 32, text: 'Dune doesn\'t win any of the Big 5 awards at the Oscars.',                                                                                                                                                                                            year: 2022, result: true,  isvalid: true  },
    { questionid: 33, text: 'Neither the Oscar for Best Picture nor the Oscar for Best Director will be won by a movie with a female director.',                                                                                                                                    year: 2022, result: false, isvalid: true  },
    { questionid: 34, text: 'Russia invades Ukraine by Thanksgiving 2022, (as arbitrated by Dmitry Gorenburg)',                                                                                                                                                                      year: 2022, result: true,  isvalid: true  },
    { questionid: 35, text: 'Ignoring this question, and considering only people who participated in our survey in both 2021 and 2022, the average subparforecasting score will be the same or lower (i.e. worse) in 2022 than it was in 2021.',                                    year: 2022, result: false, isvalid: true  },
    { questionid: 36, text: 'Justice Breyer announces that he is planning to retire.',                                                                                                                                                                                             year: 2022, result: true,  isvalid: true  },
    { questionid: 37, text: 'Stacey Abrams wins the election for governor of Georgia.',                                                                                                                                                                                            year: 2022, result: false, isvalid: true  },
    { questionid: 38, text: 'Republicans win 220 or fewer seats in the House.',                                                                                                                                                                                                    year: 2022, result: false, isvalid: true  },
    { questionid: 39, text: 'As of the Sunday after Thanksgiving, Joe Biden is still the President and has not announced that he is not running.',                                                                                                                                  year: 2022, result: true,  isvalid: true  },
    { questionid: 40, text: 'The Webb space telescope successfully transmits signals back to Earth, and images from the telescope are published on the front page of the NY Times.',                                                                                                 year: 2022, result: true,  isvalid: true  },
    { questionid: 41, text: 'A regular season major league baseball game is played on or before May 10, 2022.',                                                                                                                                                                    year: 2022, result: true,  isvalid: true  },
    { questionid: 42, text: 'Germany wins the most gold medals at the 2022 Winter Olympics.',                                                                                                                                                                                      year: 2022, result: false, isvalid: true  },
    { questionid: 43, text: 'Saudi Arabia and Israel establish full diplomatic relations, including exchanging (or making explicit plans to exchange) ambassadors.',                                                                                                                 year: 2022, result: false, isvalid: true  },
];

const results = [
    // 2021 results
    { userid: 3,  userName: 'Sema Stein',        year: 2021, confidence: -0.27999999999999936,   score: -Infinity              },
    { userid: 4,  userName: 'Jess Tytell',        year: 2021, confidence: -10,                    score: -1.8325814637483107    },
    { userid: 5,  userName: 'Tova Ovadia',        year: 2021, confidence: -0.5499999999999989,    score: -Infinity              },
    { userid: 6,  userName: 'Romana Primus',      year: 2021, confidence: 0,                      score: -Infinity              },
    { userid: 7,  userName: 'Naftaly Minsky',     year: 2021, confidence: -10,                    score: -0.9162907318741552    },
    { userid: 8,  userName: 'Yehuda Kurtzer',     year: 2021, confidence: -10,                    score: -0.6931471805599453    },
    { userid: 9,  userName: 'Miri Pomerantz',     year: 2021, confidence: -10,                    score: -0.5108256237659906    },
    { userid: 10, userName: 'Yair Minsky',        year: 2021, confidence: -0.2400000000000002,    score: -0.3102033320261401    },
    { userid: 11, userName: 'Martha Walker',      year: 2021, confidence: 0.009999999999999787,   score: -0.1910758856563605    },
    { userid: 12, userName: 'Dan Cohen',          year: 2021, confidence: 0.07000000000000028,    score: -0.18388253942874858   },
    { userid: 13, userName: 'Martha Escobar',     year: 2021, confidence: 0.0600000000000005,     score: -0.16310945169121413   },
    { userid: 14, userName: 'Dave Tytell',        year: 2021, confidence: 0.120000000000001,      score: -0.1081624106955765    },
    { userid: 15, userName: 'Richard Primus',     year: 2021, confidence: 0.13000000000000078,    score: -0.08340544186170368   },
    { userid: 16, userName: 'Lisa Primus',        year: 2021, confidence: 0.15000000000000036,    score: -0.053180838983636146  },
    { userid: 17, userName: 'Zev Minsky-Primus',  year: 2021, confidence: 0.13000000000000078,    score: -0.01534309161602367   },
    { userid: 18, userName: 'Dima Gorenburg',     year: 2021, confidence: 0.16999999999999993,    score: -0.015726004001157326  },
    { userid: 19, userName: 'Ethan Tucker',       year: 2021, confidence: 0.2900000000000009,     score: -0.013607331506751677  },
    { userid: 20, userName: 'Yaron Minsky',       year: 2021, confidence: 0.45000000000000107,    score: 0.10839474263486104    },
    { userid: 21, userName: 'Ariela Migdal',      year: 2021, confidence: 0.620000000000001,      score: 0.12060653731107321    },
    { userid: 22, userName: 'Michelle Fisher',    year: 2021, confidence: 0.20000000000000107,    score: 0.15813476465184662    },
    { userid: 23, userName: 'Jeremy Dauber',      year: 2021, confidence: 9.990000000000002,      score: 0.18232155679395456    },
]

const answers = [
    //2021
    // userid 3 — Sema Stein
    { userid: 3,  questionid: 3,  probability: 100 }, // Trump pardons
    { userid: 3,  questionid: 2,  probability: 75  }, // Senate confirms
    { userid: 3,  questionid: 4,  probability: 100 }, // Ossoff or Warnock
    { userid: 3,  questionid: 17, probability: 40  }, // Major legislation (was q19)
    { userid: 3,  questionid: 20, probability: 60  }, // No more than one bill (was q22)
    { userid: 3,  questionid: 25, probability: 100 }, // Trump 2024 campaign (was q27)
    { userid: 3,  questionid: 5,  probability: 75  }, // NYC schools
    { userid: 3,  questionid: 14, probability: 20  }, // Camp Ramah
    { userid: 3,  questionid: 24, probability: 80  }, // US forest fire (was q26)

    // userid 4 — Jess Tytell
    { userid: 4,  questionid: 25, probability: 92  }, // Trump 2024 campaign (was q27)
    { userid: 4,  questionid: 22, probability: 60  }, // Dune Oscar (was q24, invalid)

    // userid 5 — Tova Ovadia
    { userid: 5,  questionid: 10, probability: 90  }, // Biden approval
    { userid: 5,  questionid: 3,  probability: 100 }, // Trump pardons
    { userid: 5,  questionid: 13, probability: 80  }, // Student debt
    { userid: 5,  questionid: 9,  probability: 70  }, // Bibi indicted (invalid)
    { userid: 5,  questionid: 18, probability: 75  }, // NY vaccines (was q20)
    { userid: 5,  questionid: 5,  probability: 80  }, // NYC schools
    { userid: 5,  questionid: 12, probability: 90  }, // Whole Foods stickers
    { userid: 5,  questionid: 23, probability: 90  }, // Friends Reunion (was q25)
    { userid: 5,  questionid: 26, probability: 70  }, // US GDP growth (was q28)

    // userid 6 — Romana Primus
    { userid: 6,  questionid: 15, probability: 100 }, // Harvard beats Yale (was q16)
    { userid: 6,  questionid: 21, probability: 100 }, // Boeing 737 Max (was q23)
    { userid: 6,  questionid: 11, probability: 100 }, // Boris Johnson (invalid)
    { userid: 6,  questionid: 3,  probability: 100 }, // Trump pardons
    { userid: 6,  questionid: 4,  probability: 80  }, // Ossoff or Warnock
    { userid: 6,  questionid: 1,  probability: 100 }, // Biden sworn in
    { userid: 6,  questionid: 2,  probability: 100 }, // Senate confirms
    { userid: 6,  questionid: 17, probability: 50  }, // Major legislation (was q19)
    { userid: 6,  questionid: 20, probability: 90  }, // No more than one bill (was q22)
    { userid: 6,  questionid: 25, probability: 100 }, // Trump 2024 campaign (was q27)
    { userid: 6,  questionid: 10, probability: 70  }, // Biden approval
    { userid: 6,  questionid: 13, probability: 60  }, // Student debt
    { userid: 6,  questionid: 7,  probability: 80  }, // Bibi 4th election
    { userid: 6,  questionid: 8,  probability: 0   }, // Bibi 5th election
    { userid: 6,  questionid: 9,  probability: 70  }, // Bibi indicted (invalid)
    { userid: 6,  questionid: 5,  probability: 100 }, // NYC schools
    { userid: 6,  questionid: 18, probability: 75  }, // NY vaccines (was q20)
    { userid: 6,  questionid: 14, probability: 90  }, // Camp Ramah
    { userid: 6,  questionid: 12, probability: 80  }, // Whole Foods stickers
    { userid: 6,  questionid: 23, probability: 75  }, // Friends Reunion (was q25)
    { userid: 6,  questionid: 26, probability: 0   }, // US GDP growth (was q28)
    { userid: 6,  questionid: 27, probability: 30  }, // Year-end unemployment (was q29)
    { userid: 6,  questionid: 24, probability: 85  }, // US forest fire (was q26)
    { userid: 6,  questionid: 19, probability: 100 }, // No Facebook breakup (was q21)

    // userid 7 — Naftaly Minsky
    { userid: 7,  questionid: 4,  probability: 80  }, // Ossoff or Warnock

    // userid 8 — Yehuda Kurtzer
    { userid: 8,  questionid: 23, probability: 75  }, // Friends Reunion (was q25)

    // userid 9 — Miri Pomerantz
    { userid: 9,  questionid: 23, probability: 70  }, // Friends Reunion (was q25)

    // userid 10 — Yair Minsky
    { userid: 10, questionid: 3,  probability: 80  }, // Trump pardons
    { userid: 10, questionid: 4,  probability: 60  }, // Ossoff or Warnock
    { userid: 10, questionid: 25, probability: 90  }, // Trump 2024 campaign (was q27)
    { userid: 10, questionid: 17, probability: 70  }, // Major legislation (was q19)
    { userid: 10, questionid: 20, probability: 80  }, // No more than one bill (was q22)
    { userid: 10, questionid: 9,  probability: 30  }, // Bibi indicted (invalid)
    { userid: 10, questionid: 5,  probability: 80  }, // NYC schools
    { userid: 10, questionid: 18, probability: 80  }, // NY vaccines (was q20)
    { userid: 10, questionid: 12, probability: 30  }, // Whole Foods stickers
    { userid: 10, questionid: 24, probability: 50  }, // US forest fire (was q26)
    { userid: 10, questionid: 19, probability: 70  }, // No Facebook breakup (was q21)

    // userid 11 — Martha Walker
    { userid: 11, questionid: 1,  probability: 100 }, // Biden sworn in
    { userid: 11, questionid: 3,  probability: 10  }, // Trump pardons
    { userid: 11, questionid: 2,  probability: 15  }, // Senate confirms
    { userid: 11, questionid: 13, probability: 50  }, // Student debt
    { userid: 11, questionid: 4,  probability: 85  }, // Ossoff or Warnock
    { userid: 11, questionid: 18, probability: 60  }, // NY vaccines (was q20)
    { userid: 11, questionid: 5,  probability: 75  }, // NYC schools
    { userid: 11, questionid: 14, probability: 45  }, // Camp Ramah
    { userid: 11, questionid: 12, probability: 70  }, // Whole Foods stickers
    { userid: 11, questionid: 16, probability: 85  }, // Lakers (was q17)
    { userid: 11, questionid: 22, probability: 80  }, // Dune Oscar (was q24, invalid)
    { userid: 11, questionid: 23, probability: 20  }, // Friends Reunion (was q25)
    { userid: 11, questionid: 6,  probability: 10  }, // Arsenal
    { userid: 11, questionid: 26, probability: 45  }, // US GDP growth (was q28)
    { userid: 11, questionid: 27, probability: 30  }, // Year-end unemployment (was q29)
    { userid: 11, questionid: 24, probability: 85  }, // US forest fire (was q26)
    { userid: 11, questionid: 19, probability: 80  }, // No Facebook breakup (was q21)

    // userid 12 — Dan Cohen
    { userid: 12, questionid: 2,  probability: 80  }, // Senate confirms
    { userid: 12, questionid: 18, probability: 10  }, // NY vaccines (was q20)
    { userid: 12, questionid: 19, probability: 10  }, // No Facebook breakup (was q21)
    { userid: 12, questionid: 22, probability: 80  }, // Dune Oscar (was q24, invalid)

    // userid 13 — Martha Escobar
    { userid: 13, questionid: 4,  probability: 40  }, // Ossoff or Warnock
    { userid: 13, questionid: 3,  probability: 80  }, // Trump pardons
    { userid: 13, questionid: 1,  probability: 95  }, // Biden sworn in
    { userid: 13, questionid: 2,  probability: 70  }, // Senate confirms
    { userid: 13, questionid: 17, probability: 50  }, // Major legislation (was q19)
    { userid: 13, questionid: 20, probability: 80  }, // No more than one bill (was q22)
    { userid: 13, questionid: 25, probability: 80  }, // Trump 2024 campaign (was q27)
    { userid: 13, questionid: 10, probability: 65  }, // Biden approval
    { userid: 13, questionid: 13, probability: 25  }, // Student debt
    { userid: 13, questionid: 7,  probability: 20  }, // Bibi 4th election
    { userid: 13, questionid: 8,  probability: 15  }, // Bibi 5th election
    { userid: 13, questionid: 9,  probability: 45  }, // Bibi indicted (invalid)
    { userid: 13, questionid: 18, probability: 25  }, // NY vaccines (was q20)
    { userid: 13, questionid: 5,  probability: 20  }, // NYC schools
    { userid: 13, questionid: 14, probability: 15  }, // Camp Ramah
    { userid: 13, questionid: 12, probability: 20  }, // Whole Foods stickers
    { userid: 13, questionid: 22, probability: 70  }, // Dune Oscar (was q24, invalid)
    { userid: 13, questionid: 16, probability: 20  }, // Lakers (was q17)
    { userid: 13, questionid: 23, probability: 30  }, // Friends Reunion (was q25)
    { userid: 13, questionid: 6,  probability: 10  }, // Arsenal
    { userid: 13, questionid: 26, probability: 68  }, // US GDP growth (was q28)
    { userid: 13, questionid: 27, probability: 20  }, // Year-end unemployment (was q29)
    { userid: 13, questionid: 24, probability: 70  }, // US forest fire (was q26)
    { userid: 13, questionid: 19, probability: 25  }, // No Facebook breakup (was q21)

    // userid 14 — Dave Tytell
    { userid: 14, questionid: 3,  probability: 20  }, // Trump pardons
    { userid: 14, questionid: 1,  probability: 95  }, // Biden sworn in
    { userid: 14, questionid: 2,  probability: 75  }, // Senate confirms
    { userid: 14, questionid: 17, probability: 95  }, // Major legislation (was q18, kept)
    { userid: 14, questionid: 20, probability: 20  }, // No more than one bill (was q22)
    { userid: 14, questionid: 25, probability: 95  }, // Trump 2024 campaign (was q27)
    { userid: 14, questionid: 10, probability: 70  }, // Biden approval
    { userid: 14, questionid: 13, probability: 60  }, // Student debt
    { userid: 14, questionid: 8,  probability: 65  }, // Bibi 5th election
    { userid: 14, questionid: 18, probability: 70  }, // NY vaccines (was q20)
    { userid: 14, questionid: 5,  probability: 10  }, // NYC schools
    { userid: 14, questionid: 14, probability: 85  }, // Camp Ramah
    { userid: 14, questionid: 12, probability: 5   }, // Whole Foods stickers
    { userid: 14, questionid: 22, probability: 70  }, // Dune Oscar (was q24, invalid)
    { userid: 14, questionid: 23, probability: 85  }, // Friends Reunion (was q25)
    { userid: 14, questionid: 16, probability: 15  }, // Lakers (was q17)
    { userid: 14, questionid: 6,  probability: 60  }, // Arsenal
    { userid: 14, questionid: 26, probability: 90  }, // US GDP growth (was q28)
    { userid: 14, questionid: 27, probability: 15  }, // Year-end unemployment (was q29)
    { userid: 14, questionid: 24, probability: 15  }, // US forest fire (was q26)
    { userid: 14, questionid: 19, probability: 85  }, // No Facebook breakup (was q15)

    // userid 15 — Richard Primus
    { userid: 15, questionid: 4,  probability: 70  }, // Ossoff or Warnock
    { userid: 15, questionid: 1,  probability: 98  }, // Biden sworn in
    { userid: 15, questionid: 2,  probability: 40  }, // Senate confirms
    { userid: 15, questionid: 10, probability: 60  }, // Biden approval
    { userid: 15, questionid: 13, probability: 70  }, // Student debt
    { userid: 15, questionid: 18, probability: 80  }, // NY vaccines (was q20)
    { userid: 15, questionid: 5,  probability: 80  }, // NYC schools
    { userid: 15, questionid: 14, probability: 80  }, // Camp Ramah
    { userid: 15, questionid: 12, probability: 80  }, // Whole Foods stickers
    { userid: 15, questionid: 19, probability: 90  }, // No Facebook breakup (was q21)
    { userid: 15, questionid: 24, probability: 40  }, // US forest fire (was q26)

    // userid 16 — Lisa Primus
    { userid: 16, questionid: 3,  probability: 40  }, // Trump pardons
    { userid: 16, questionid: 1,  probability: 95  }, // Biden sworn in
    { userid: 16, questionid: 2,  probability: 40  }, // Senate confirms
    { userid: 16, questionid: 4,  probability: 10  }, // Ossoff or Warnock
    { userid: 16, questionid: 17, probability: 85  }, // Major legislation (was q19)
    { userid: 16, questionid: 20, probability: 20  }, // No more than one bill (was q22)
    { userid: 16, questionid: 25, probability: 95  }, // Trump 2024 campaign (was q27)
    { userid: 16, questionid: 10, probability: 65  }, // Biden approval
    { userid: 16, questionid: 13, probability: 85  }, // Student debt
    { userid: 16, questionid: 7,  probability: 70  }, // Bibi 4th election
    { userid: 16, questionid: 8,  probability: 30  }, // Bibi 5th election
    { userid: 16, questionid: 9,  probability: 15  }, // Bibi indicted (invalid)
    { userid: 16, questionid: 22, probability: 70  }, // Dune Oscar (was q24, invalid)
    { userid: 16, questionid: 23, probability: 70  }, // Friends Reunion (was q25)
    { userid: 16, questionid: 16, probability: 25  }, // Lakers (was q17)
    { userid: 16, questionid: 26, probability: 90  }, // US GDP growth (was q28)
    { userid: 16, questionid: 27, probability: 50  }, // Year-end unemployment (was q29)
    { userid: 16, questionid: 24, probability: 80  }, // US forest fire (was q26)
    { userid: 16, questionid: 19, probability: 85  }, // No Facebook breakup (was q15)

    // userid 17 — Zev Minsky-Primus
    { userid: 17, questionid: 3,  probability: 43  }, // Trump pardons
    { userid: 17, questionid: 1,  probability: 99  }, // Biden sworn in
    { userid: 17, questionid: 10, probability: 60  }, // Biden approval
    { userid: 17, questionid: 7,  probability: 16  }, // Bibi 4th election
    { userid: 17, questionid: 8,  probability: 14  }, // Bibi 5th election
    { userid: 17, questionid: 9,  probability: 14  }, // Bibi indicted (invalid)
    { userid: 17, questionid: 25, probability: 33  }, // Trump 2024 campaign (was q27)
    { userid: 17, questionid: 6,  probability: 58  }, // Arsenal
    { userid: 17, questionid: 19, probability: 94  }, // No Facebook breakup (was q21)
    { userid: 17, questionid: 18, probability: 90  }, // NY vaccines (was q20)
    { userid: 17, questionid: 5,  probability: 35  }, // NYC schools
    { userid: 17, questionid: 14, probability: 62  }, // Camp Ramah
    { userid: 17, questionid: 26, probability: 79  }, // US GDP growth (was q28)
    { userid: 17, questionid: 27, probability: 71  }, // Year-end unemployment (was q29)

    // userid 18 — Dima Gorenburg
    { userid: 18, questionid: 4,  probability: 20  }, // Ossoff or Warnock
    { userid: 18, questionid: 3,  probability: 90  }, // Trump pardons
    { userid: 18, questionid: 1,  probability: 99  }, // Biden sworn in
    { userid: 18, questionid: 2,  probability: 60  }, // Senate confirms
    { userid: 18, questionid: 18, probability: 10  }, // NY vaccines (was q20)
    { userid: 18, questionid: 5,  probability: 25  }, // NYC schools
    { userid: 18, questionid: 12, probability: 65  }, // Whole Foods stickers
    { userid: 18, questionid: 14, probability: 50  }, // Camp Ramah
    { userid: 18, questionid: 6,  probability: 30  }, // Arsenal
    { userid: 18, questionid: 16, probability: 18  }, // Lakers (was q17)
    { userid: 18, questionid: 22, probability: 25  }, // Dune Oscar (was q24, invalid)
    { userid: 18, questionid: 23, probability: 70  }, // Friends Reunion (was q25)
    { userid: 18, questionid: 27, probability: 30  }, // Year-end unemployment (was q29)
    { userid: 18, questionid: 24, probability: 25  }, // US forest fire (was q26)
    { userid: 18, questionid: 19, probability: 95  }, // No Facebook breakup (was q21)
    { userid: 18, questionid: 26, probability: 35  }, // US GDP growth (was q28)

    // userid 19 — Ethan Tucker
    { userid: 19, questionid: 2,  probability: 80  }, // Senate confirms
    { userid: 19, questionid: 14, probability: 50  }, // Camp Ramah
    { userid: 19, questionid: 16, probability: 70  }, // Lakers (was q17)

    // userid 20 — Yaron Minsky
    { userid: 20, questionid: 3,  probability: 80  }, // Trump pardons
    { userid: 20, questionid: 1,  probability: 95  }, // Biden sworn in
    { userid: 20, questionid: 2,  probability: 75  }, // Senate confirms
    { userid: 20, questionid: 17, probability: 60  }, // Major legislation (was q18, kept)
    { userid: 20, questionid: 20, probability: 50  }, // No more than one bill (was q22)
    { userid: 20, questionid: 25, probability: 70  }, // Trump 2024 campaign (was q27)
    { userid: 20, questionid: 7,  probability: 40  }, // Bibi 4th election
    { userid: 20, questionid: 8,  probability: 15  }, // Bibi 5th election
    { userid: 20, questionid: 9,  probability: 55  }, // Bibi indicted (invalid)
    { userid: 20, questionid: 18, probability: 40  }, // NY vaccines (was q20)
    { userid: 20, questionid: 5,  probability: 85  }, // NYC schools
    { userid: 20, questionid: 14, probability: 40  }, // Camp Ramah
    { userid: 20, questionid: 12, probability: 45  }, // Whole Foods stickers
    { userid: 20, questionid: 23, probability: 80  }, // Friends Reunion (was q25)
    { userid: 20, questionid: 22, probability: 30  }, // Dune Oscar (was q24, invalid)
    { userid: 20, questionid: 26, probability: 90  }, // US GDP growth (was q28)
    { userid: 20, questionid: 27, probability: 85  }, // Year-end unemployment (was q29)
    { userid: 20, questionid: 19, probability: 99  }, // No Facebook breakup (was q15)
    { userid: 20, questionid: 24, probability: 35  }, // US forest fire (was q26)

    // userid 21 — Ariela Migdal
    { userid: 21, questionid: 1,  probability: 90  }, // Biden sworn in
    { userid: 21, questionid: 18, probability: 50  }, // NY vaccines (was q20)
    { userid: 21, questionid: 27, probability: 30  }, // Year-end unemployment (was q29)
    { userid: 21, questionid: 23, probability: 25  }, // Friends Reunion (was q25)

    // userid 22 — Michelle Fisher
    { userid: 22, questionid: 18, probability: 2   }, // NY vaccines (was q20)
    { userid: 22, questionid: 22, probability: 90  }, // Dune Oscar (was q24, invalid)
    { userid: 22, questionid: 24, probability: 65  }, // US forest fire (was q26)

    // userid 23 — Jeremy Dauber
    { userid: 23, questionid: 26, probability: 60  }, // US GDP growth (was q28)

    // 2022 answers
    // userid 20 — Yaron Minsky
    { userid: 20, questionid: 28, probability: 95  },
    { userid: 20, questionid: 29, probability: 20  },
    { userid: 20, questionid: 30, probability: 75  },
    { userid: 20, questionid: 31, probability: 30  },
    { userid: 20, questionid: 32, probability: 85  },
    { userid: 20, questionid: 33, probability: 20  },
    { userid: 20, questionid: 34, probability: 40  },
    { userid: 20, questionid: 35, probability: 65  },
    { userid: 20, questionid: 36, probability: 40  },
    { userid: 20, questionid: 37, probability: 45  },
    { userid: 20, questionid: 38, probability: 35  },
    { userid: 20, questionid: 39, probability: 75  },
    { userid: 20, questionid: 40, probability: 70  },
    { userid: 20, questionid: 41, probability: 60  },
    { userid: 20, questionid: 42, probability: 20  },
    { userid: 20, questionid: 43, probability: 13  }, // 12.5 → 13

    // userid 22 — Michelle Fisher
    { userid: 22, questionid: 28, probability: 5   },
    { userid: 22, questionid: 29, probability: 5   },
    { userid: 22, questionid: 30, probability: 3   },
    { userid: 22, questionid: 31, probability: 85  },
    { userid: 22, questionid: 32, probability: 75  },
    { userid: 22, questionid: 33, probability: 85  },
    { userid: 22, questionid: 34, probability: 90  },
    { userid: 22, questionid: 35, probability: 50  },
    { userid: 22, questionid: 36, probability: 95  },
    { userid: 22, questionid: 37, probability: 58  },
    { userid: 22, questionid: 38, probability: 40  },
    { userid: 22, questionid: 39, probability: 90  },
    { userid: 22, questionid: 40, probability: 85  },
    { userid: 22, questionid: 41, probability: 88  },
    { userid: 22, questionid: 42, probability: 30  },
    { userid: 22, questionid: 43, probability: 65  },

    // userid 25 — Debra Fine
    { userid: 25, questionid: 28, probability: 5   },
    { userid: 25, questionid: 29, probability: 10  },
    { userid: 25, questionid: 30, probability: 50  },
    { userid: 25, questionid: 31, probability: 30  },
    { userid: 25, questionid: 32, probability: 90  },
    { userid: 25, questionid: 33, probability: 50  },
    { userid: 25, questionid: 34, probability: 30  },
    // q35: blank — skip
    { userid: 25, questionid: 36, probability: 90  },
    { userid: 25, questionid: 37, probability: 43  },
    { userid: 25, questionid: 38, probability: 10  },
    // q39: Option 1 — skip
    { userid: 25, questionid: 40, probability: 90  },
    { userid: 25, questionid: 41, probability: 85  },
    { userid: 25, questionid: 42, probability: 50  },
    { userid: 25, questionid: 43, probability: 90  },

    // userid 26 — Elana Farbiarz
    { userid: 26, questionid: 28, probability: 8   },
    { userid: 26, questionid: 29, probability: 57  },
    { userid: 26, questionid: 30, probability: 50  },
    { userid: 26, questionid: 31, probability: 69  },
    { userid: 26, questionid: 32, probability: 55  },
    { userid: 26, questionid: 33, probability: 38  },
    { userid: 26, questionid: 34, probability: 37  },
    // q35: "Didn't do last year!" — skip
    // q36: blank — skip
    { userid: 26, questionid: 37, probability: 42  },
    { userid: 26, questionid: 38, probability: 39  },
    // q39: Option 1 — skip
    { userid: 26, questionid: 40, probability: 58  },
    { userid: 26, questionid: 41, probability: 64  },
    { userid: 26, questionid: 42, probability: 20  },
    { userid: 26, questionid: 43, probability: 42  },

    // userid 12 — Dan Cohen
    { userid: 12, questionid: 28, probability: 20  },
    { userid: 12, questionid: 29, probability: 5   },
    { userid: 12, questionid: 30, probability: 75  },
    { userid: 12, questionid: 31, probability: 10  },
    { userid: 12, questionid: 32, probability: 90  },
    { userid: 12, questionid: 33, probability: 50  },
    { userid: 12, questionid: 34, probability: 30  },
    { userid: 12, questionid: 35, probability: 50  },
    { userid: 12, questionid: 36, probability: 50  },
    { userid: 12, questionid: 37, probability: 90  },
    { userid: 12, questionid: 38, probability: 25  },
    { userid: 12, questionid: 39, probability: 80  },
    { userid: 12, questionid: 40, probability: 90  },
    { userid: 12, questionid: 41, probability: 90  },
    { userid: 12, questionid: 42, probability: 5   },
    { userid: 12, questionid: 43, probability: 90  },

    // userid 7 — Naftaly Minsky
    { userid: 7,  questionid: 28, probability: 25  },
    { userid: 7,  questionid: 29, probability: 30  },
    { userid: 7,  questionid: 30, probability: 70  },
    { userid: 7,  questionid: 31, probability: 30  },
    { userid: 7,  questionid: 32, probability: 50  },
    { userid: 7,  questionid: 33, probability: 40  },
    { userid: 7,  questionid: 34, probability: 80  },
    { userid: 7,  questionid: 35, probability: 50  },
    { userid: 7,  questionid: 36, probability: 90  },
    { userid: 7,  questionid: 37, probability: 60  },
    { userid: 7,  questionid: 38, probability: 30  },
    // q39: Option 1 — skip
    { userid: 7,  questionid: 40, probability: 90  },
    { userid: 7,  questionid: 41, probability: 50  },
    { userid: 7,  questionid: 42, probability: 20  },
    { userid: 7,  questionid: 43, probability: 70  },

    // userid 27 — Jacob Gorenburg
    { userid: 27, questionid: 28, probability: 70  },
    { userid: 27, questionid: 29, probability: 65  },
    { userid: 27, questionid: 30, probability: 50  },
    { userid: 27, questionid: 31, probability: 30  },
    { userid: 27, questionid: 32, probability: 55  },
    { userid: 27, questionid: 33, probability: 60  },
    { userid: 27, questionid: 34, probability: 35  },
    { userid: 27, questionid: 35, probability: 50  },
    { userid: 27, questionid: 36, probability: 40  },
    { userid: 27, questionid: 37, probability: 40  },
    { userid: 27, questionid: 38, probability: 40  },
    { userid: 27, questionid: 39, probability: 65  },
    { userid: 27, questionid: 40, probability: 85  },
    { userid: 27, questionid: 41, probability: 50  },
    { userid: 27, questionid: 42, probability: 20  },
    { userid: 27, questionid: 43, probability: 50  },

    // userid 28 — Lois
    { userid: 28, questionid: 28, probability: 75  },
    { userid: 28, questionid: 29, probability: 60  },
    { userid: 28, questionid: 30, probability: 30  },
    { userid: 28, questionid: 31, probability: 30  },
    { userid: 28, questionid: 32, probability: 30  },
    { userid: 28, questionid: 33, probability: 50  },
    { userid: 28, questionid: 34, probability: 60  },
    // q35: blank — skip
    { userid: 28, questionid: 36, probability: 85  },
    { userid: 28, questionid: 37, probability: 30  },
    { userid: 28, questionid: 38, probability: 40  },
    { userid: 28, questionid: 39, probability: 65  },
    { userid: 28, questionid: 40, probability: 95  },
    { userid: 28, questionid: 41, probability: 90  },
    { userid: 28, questionid: 42, probability: 40  },
    { userid: 28, questionid: 43, probability: 65  },

    // userid 29 — Shula Minsky
    { userid: 29, questionid: 28, probability: 75  },
    { userid: 29, questionid: 29, probability: 80  },
    { userid: 29, questionid: 30, probability: 50  },
    // q31: blank — skip
    { userid: 29, questionid: 32, probability: 20  },
    { userid: 29, questionid: 33, probability: 50  },
    { userid: 29, questionid: 34, probability: 80  },
    // q35: blank — skip
    { userid: 29, questionid: 36, probability: 75  },
    { userid: 29, questionid: 37, probability: 50  },
    { userid: 29, questionid: 38, probability: 30  },
    { userid: 29, questionid: 39, probability: 60  },
    { userid: 29, questionid: 40, probability: 80  },
    { userid: 29, questionid: 41, probability: 50  },
    { userid: 29, questionid: 42, probability: 30  },
    { userid: 29, questionid: 43, probability: 20  },

    // userid 30 — Ada Fenick
    { userid: 30, questionid: 28, probability: 75  },
    { userid: 30, questionid: 29, probability: 40  },
    { userid: 30, questionid: 30, probability: 40  },
    { userid: 30, questionid: 31, probability: 50  },
    { userid: 30, questionid: 32, probability: 60  },
    { userid: 30, questionid: 33, probability: 60  },
    { userid: 30, questionid: 34, probability: 40  },
    { userid: 30, questionid: 35, probability: 45  },
    { userid: 30, questionid: 36, probability: 40  },
    { userid: 30, questionid: 37, probability: 60  },
    { userid: 30, questionid: 38, probability: 45  },
    { userid: 30, questionid: 39, probability: 65  },
    { userid: 30, questionid: 40, probability: 70  },
    { userid: 30, questionid: 41, probability: 65  },
    { userid: 30, questionid: 42, probability: 3   },
    { userid: 30, questionid: 43, probability: 40  },

    // userid 31 — Sanjyot Dunung
    { userid: 31, questionid: 28, probability: 75  },
    { userid: 31, questionid: 29, probability: 85  },
    { userid: 31, questionid: 30, probability: 60  },
    { userid: 31, questionid: 31, probability: 75  },
    { userid: 31, questionid: 32, probability: 10  },
    { userid: 31, questionid: 33, probability: 90  },
    { userid: 31, questionid: 34, probability: 15  },
    { userid: 31, questionid: 35, probability: 65  },
    { userid: 31, questionid: 36, probability: 20  },
    { userid: 31, questionid: 37, probability: 65  },
    { userid: 31, questionid: 38, probability: 40  },
    { userid: 31, questionid: 39, probability: 75  },
    { userid: 31, questionid: 40, probability: 65  },
    { userid: 31, questionid: 41, probability: 98  },
    { userid: 31, questionid: 42, probability: 25  },
    { userid: 31, questionid: 43, probability: 40  },

    // userid 32 — Sarah Farbiarz
    { userid: 32, questionid: 28, probability: 78  },
    { userid: 32, questionid: 29, probability: 43  },
    { userid: 32, questionid: 30, probability: 64  },
    { userid: 32, questionid: 31, probability: 50  },
    { userid: 32, questionid: 32, probability: 46  },
    { userid: 32, questionid: 33, probability: 58  },
    { userid: 32, questionid: 34, probability: 44  },
    { userid: 32, questionid: 35, probability: 42  },
    { userid: 32, questionid: 36, probability: 23  },
    { userid: 32, questionid: 37, probability: 38  },
    { userid: 32, questionid: 38, probability: 52  },
    // q39: Option 1 — skip
    { userid: 32, questionid: 40, probability: 71  },
    { userid: 32, questionid: 41, probability: 50  },
    { userid: 32, questionid: 42, probability: 17  },
    { userid: 32, questionid: 43, probability: 61  },

    // userid 33 — Sarah Williams
    { userid: 33, questionid: 28, probability: 80  },
    { userid: 33, questionid: 29, probability: 60  },
    { userid: 33, questionid: 30, probability: 70  },
    { userid: 33, questionid: 31, probability: 55  },
    { userid: 33, questionid: 32, probability: 90  },
    { userid: 33, questionid: 33, probability: 50  },
    { userid: 33, questionid: 34, probability: 30  },
    // q35: blank — skip
    { userid: 33, questionid: 36, probability: 90  },
    { userid: 33, questionid: 37, probability: 70  },
    { userid: 33, questionid: 38, probability: 30  },
    { userid: 33, questionid: 39, probability: 80  },
    { userid: 33, questionid: 40, probability: 60  },
    { userid: 33, questionid: 41, probability: 90  },
    { userid: 33, questionid: 42, probability: 40  },
    { userid: 33, questionid: 43, probability: 60  },

    // userid 15 — Richard Primus
    { userid: 15, questionid: 28, probability: 80  },
    { userid: 15, questionid: 29, probability: 60  },
    { userid: 15, questionid: 30, probability: 70  },
    { userid: 15, questionid: 31, probability: 60  },
    { userid: 15, questionid: 32, probability: 50  },
    { userid: 15, questionid: 33, probability: 60  },
    { userid: 15, questionid: 34, probability: 60  },
    { userid: 15, questionid: 35, probability: 30  },
    { userid: 15, questionid: 36, probability: 75  },
    { userid: 15, questionid: 37, probability: 35  },
    { userid: 15, questionid: 38, probability: 20  },
    { userid: 15, questionid: 39, probability: 80  },
    { userid: 15, questionid: 40, probability: 80  },
    { userid: 15, questionid: 41, probability: 90  },
    { userid: 15, questionid: 42, probability: 40  },
    { userid: 15, questionid: 43, probability: 35  },

    // userid 13 — Martha Escobar
    { userid: 13, questionid: 28, probability: 80  },
    { userid: 13, questionid: 29, probability: 70  },
    { userid: 13, questionid: 30, probability: 20  },
    { userid: 13, questionid: 31, probability: 30  },
    { userid: 13, questionid: 32, probability: 30  },
    { userid: 13, questionid: 33, probability: 20  },
    { userid: 13, questionid: 34, probability: 85  },
    { userid: 13, questionid: 35, probability: 40  },
    { userid: 13, questionid: 36, probability: 45  },
    { userid: 13, questionid: 37, probability: 70  },
    { userid: 13, questionid: 38, probability: 35  },
    { userid: 13, questionid: 39, probability: 30  },
    { userid: 13, questionid: 40, probability: 40  },
    { userid: 13, questionid: 41, probability: 80  },
    { userid: 13, questionid: 42, probability: 30  },
    { userid: 13, questionid: 43, probability: 15  },

    // userid 34 — Eitan Minsky-Fenick
    { userid: 34, questionid: 28, probability: 80  },
    { userid: 34, questionid: 29, probability: 60  },
    { userid: 34, questionid: 30, probability: 40  },
    { userid: 34, questionid: 31, probability: 20  },
    { userid: 34, questionid: 32, probability: 40  },
    { userid: 34, questionid: 33, probability: 40  },
    { userid: 34, questionid: 34, probability: 30  },
    { userid: 34, questionid: 35, probability: 40  },
    { userid: 34, questionid: 36, probability: 20  },
    { userid: 34, questionid: 37, probability: 40  },
    { userid: 34, questionid: 38, probability: 65  },
    { userid: 34, questionid: 39, probability: 90  },
    { userid: 34, questionid: 40, probability: 80  },
    { userid: 34, questionid: 41, probability: 70  },
    { userid: 34, questionid: 42, probability: 40  },
    { userid: 34, questionid: 43, probability: 30  },

    // userid 35 — Megan Lewis
    { userid: 35, questionid: 28, probability: 80  },
    { userid: 35, questionid: 29, probability: 50  },
    { userid: 35, questionid: 30, probability: 45  },
    { userid: 35, questionid: 31, probability: 50  },
    { userid: 35, questionid: 32, probability: 80  },
    { userid: 35, questionid: 33, probability: 75  },
    { userid: 35, questionid: 34, probability: 76  },
    { userid: 35, questionid: 35, probability: 50  }, // 50-50 → 50
    { userid: 35, questionid: 36, probability: 80  },
    { userid: 35, questionid: 37, probability: 50  },
    { userid: 35, questionid: 38, probability: 10  },
    // q39: Option 1 — skip
    { userid: 35, questionid: 40, probability: 30  },
    { userid: 35, questionid: 41, probability: 50  }, // 50-50 → 50
    { userid: 35, questionid: 42, probability: 20  },
    { userid: 35, questionid: 43, probability: 60  },

    // userid 36 — Blanca
    { userid: 36, questionid: 28, probability: 80  },
    { userid: 36, questionid: 29, probability: 20  },
    { userid: 36, questionid: 30, probability: 1   },
    { userid: 36, questionid: 31, probability: 20  },
    // q32: blank — skip
    { userid: 36, questionid: 33, probability: 10  },
    { userid: 36, questionid: 34, probability: 20  },
    { userid: 36, questionid: 35, probability: 20  },
    { userid: 36, questionid: 36, probability: 70  },
    { userid: 36, questionid: 37, probability: 50  },
    { userid: 36, questionid: 38, probability: 20  },
    { userid: 36, questionid: 39, probability: 30  },
    { userid: 36, questionid: 40, probability: 75  },
    { userid: 36, questionid: 41, probability: 80  },
    { userid: 36, questionid: 42, probability: 50  },
    { userid: 36, questionid: 43, probability: 30  },

    // userid 37 — Alan Promer
    { userid: 37, questionid: 28, probability: 80  },
    { userid: 37, questionid: 29, probability: 53  },
    { userid: 37, questionid: 30, probability: 55  },
    { userid: 37, questionid: 31, probability: 33  },
    { userid: 37, questionid: 32, probability: 45  },
    { userid: 37, questionid: 33, probability: 55  },
    { userid: 37, questionid: 34, probability: 55  },
    { userid: 37, questionid: 35, probability: 40  },
    { userid: 37, questionid: 36, probability: 40  },
    { userid: 37, questionid: 37, probability: 47  },
    { userid: 37, questionid: 38, probability: 33  },
    { userid: 37, questionid: 39, probability: 67  },
    { userid: 37, questionid: 40, probability: 67  },
    { userid: 37, questionid: 41, probability: 60  },
    { userid: 37, questionid: 42, probability: 33  },
    { userid: 37, questionid: 43, probability: 45  },

    // userid 10 — Yair Minsky
    { userid: 10, questionid: 28, probability: 80  },
    { userid: 10, questionid: 29, probability: 30  },
    { userid: 10, questionid: 30, probability: 60  },
    { userid: 10, questionid: 31, probability: 70  },
    // q32-q34: blank — skip
    { userid: 10, questionid: 35, probability: 30  },
    { userid: 10, questionid: 36, probability: 70  },
    { userid: 10, questionid: 37, probability: 60  },
    { userid: 10, questionid: 38, probability: 40  },
    { userid: 10, questionid: 39, probability: 80  },
    { userid: 10, questionid: 40, probability: 80  },
    // q41-q42: blank — skip
    { userid: 10, questionid: 43, probability: 30  },

    // userid 38 — Belinda Birnbaum
    { userid: 38, questionid: 28, probability: 80  },
    { userid: 38, questionid: 29, probability: 20  },
    { userid: 38, questionid: 30, probability: 20  },
    { userid: 38, questionid: 31, probability: 80  },
    { userid: 38, questionid: 32, probability: 80  },
    { userid: 38, questionid: 33, probability: 20  },
    { userid: 38, questionid: 34, probability: 80  },
    // q35: blank — skip
    { userid: 38, questionid: 36, probability: 20  },
    { userid: 38, questionid: 37, probability: 80  },
    { userid: 38, questionid: 38, probability: 80  },
    // q39: blank — skip
    { userid: 38, questionid: 40, probability: 80  },
    { userid: 38, questionid: 41, probability: 20  },
    { userid: 38, questionid: 42, probability: 80  },
    { userid: 38, questionid: 43, probability: 20  },

    // userid 39 — Sharon Fenick
    { userid: 39, questionid: 28, probability: 85  },
    { userid: 39, questionid: 29, probability: 40  },
    { userid: 39, questionid: 30, probability: 40  },
    { userid: 39, questionid: 31, probability: 40  },
    { userid: 39, questionid: 32, probability: 70  },
    { userid: 39, questionid: 33, probability: 65  },
    { userid: 39, questionid: 34, probability: 85  },
    { userid: 39, questionid: 35, probability: 45  },
    { userid: 39, questionid: 36, probability: 65  },
    { userid: 39, questionid: 37, probability: 40  },
    { userid: 39, questionid: 38, probability: 40  },
    { userid: 39, questionid: 39, probability: 60  },
    { userid: 39, questionid: 40, probability: 75  },
    { userid: 39, questionid: 41, probability: 85  },
    { userid: 39, questionid: 42, probability: 20  },
    { userid: 39, questionid: 43, probability: 40  },

    // userid 40 — Sally Gottesman
    { userid: 40, questionid: 28, probability: 85  },
    { userid: 40, questionid: 29, probability: 70  },
    { userid: 40, questionid: 30, probability: 68  },
    { userid: 40, questionid: 31, probability: 75  },
    { userid: 40, questionid: 32, probability: 45  },
    { userid: 40, questionid: 33, probability: 40  },
    { userid: 40, questionid: 34, probability: 60  },
    // q35: blank — skip
    { userid: 40, questionid: 36, probability: 80  },
    { userid: 40, questionid: 37, probability: 70  },
    { userid: 40, questionid: 38, probability: 50  },
    { userid: 40, questionid: 39, probability: 30  },
    { userid: 40, questionid: 40, probability: 70  },
    { userid: 40, questionid: 41, probability: 85  },
    { userid: 40, questionid: 42, probability: 40  },
    { userid: 40, questionid: 43, probability: 40  },

    // userid 6 — Romana Primus
    { userid: 6,  questionid: 28, probability: 90  },
    { userid: 6,  questionid: 29, probability: 30  },
    { userid: 6,  questionid: 30, probability: 25  },
    { userid: 6,  questionid: 31, probability: 25  },
    { userid: 6,  questionid: 32, probability: 25  },
    { userid: 6,  questionid: 33, probability: 80  },
    { userid: 6,  questionid: 34, probability: 20  },
    { userid: 6,  questionid: 35, probability: 40  },
    { userid: 6,  questionid: 36, probability: 65  },
    { userid: 6,  questionid: 37, probability: 75  },
    { userid: 6,  questionid: 38, probability: 25  },
    { userid: 6,  questionid: 39, probability: 85  },
    { userid: 6,  questionid: 40, probability: 80  },
    { userid: 6,  questionid: 41, probability: 90  },
    { userid: 6,  questionid: 42, probability: 35  },
    { userid: 6,  questionid: 43, probability: 35  },

    // userid 41 — Dianne Newman
    { userid: 41, questionid: 28, probability: 90  },
    { userid: 41, questionid: 29, probability: 1   },
    { userid: 41, questionid: 30, probability: 60  },
    { userid: 41, questionid: 31, probability: 45  },
    { userid: 41, questionid: 32, probability: 55  },
    { userid: 41, questionid: 33, probability: 25  },
    { userid: 41, questionid: 34, probability: 65  },
    { userid: 41, questionid: 35, probability: 40  },
    { userid: 41, questionid: 36, probability: 40  },
    { userid: 41, questionid: 37, probability: 85  },
    { userid: 41, questionid: 38, probability: 25  },
    { userid: 41, questionid: 39, probability: 65  },
    { userid: 41, questionid: 40, probability: 99  },
    { userid: 41, questionid: 41, probability: 70  },
    { userid: 41, questionid: 42, probability: 10  },
    { userid: 41, questionid: 43, probability: 10  },

    // userid 42 — Lucas Kimball
    { userid: 42, questionid: 28, probability: 90  },
    { userid: 42, questionid: 29, probability: 70  },
    { userid: 42, questionid: 30, probability: 60  },
    { userid: 42, questionid: 31, probability: 30  },
    { userid: 42, questionid: 32, probability: 60  },
    { userid: 42, questionid: 33, probability: 70  },
    { userid: 42, questionid: 34, probability: 80  },
    // q35: blank — skip
    { userid: 42, questionid: 36, probability: 90  },
    { userid: 42, questionid: 37, probability: 60  },
    { userid: 42, questionid: 38, probability: 60  },
    { userid: 42, questionid: 39, probability: 90  },
    { userid: 42, questionid: 40, probability: 90  },
    { userid: 42, questionid: 41, probability: 95  },
    { userid: 42, questionid: 42, probability: 20  },
    { userid: 42, questionid: 43, probability: 70  },

    // userid 43 — Nick Salter
    { userid: 43, questionid: 28, probability: 90  },
    { userid: 43, questionid: 29, probability: 5   },
    { userid: 43, questionid: 30, probability: 65  },
    { userid: 43, questionid: 31, probability: 30  },
    { userid: 43, questionid: 32, probability: 85  },
    { userid: 43, questionid: 33, probability: 50  },
    { userid: 43, questionid: 34, probability: 35  },
    { userid: 43, questionid: 35, probability: 25  },
    { userid: 43, questionid: 36, probability: 90  },
    { userid: 43, questionid: 37, probability: 70  },
    { userid: 43, questionid: 38, probability: 35  },
    { userid: 43, questionid: 39, probability: 95  },
    { userid: 43, questionid: 40, probability: 70  },
    { userid: 43, questionid: 41, probability: 95  },
    { userid: 43, questionid: 42, probability: 25  },
    { userid: 43, questionid: 43, probability: 60  },

    // userid 44 — Sam Wurzel
    { userid: 44, questionid: 28, probability: 90  },
    { userid: 44, questionid: 29, probability: 25  },
    { userid: 44, questionid: 30, probability: 33  },
    { userid: 44, questionid: 31, probability: 66  },
    { userid: 44, questionid: 32, probability: 50  },
    { userid: 44, questionid: 33, probability: 50  },
    { userid: 44, questionid: 34, probability: 20  },
    { userid: 44, questionid: 35, probability: 50  },
    { userid: 44, questionid: 36, probability: 50  },
    { userid: 44, questionid: 37, probability: 50  },
    { userid: 44, questionid: 38, probability: 30  },
    { userid: 44, questionid: 39, probability: 40  },
    { userid: 44, questionid: 40, probability: 80  },
    { userid: 44, questionid: 41, probability: 50  },
    { userid: 44, questionid: 42, probability: 50  },
    { userid: 44, questionid: 43, probability: 60  },

    // userid 45 — Jonas Peters
    { userid: 45, questionid: 28, probability: 90  },
    { userid: 45, questionid: 29, probability: 70  },
    { userid: 45, questionid: 30, probability: 30  },
    { userid: 45, questionid: 31, probability: 50  },
    { userid: 45, questionid: 32, probability: 60  },
    { userid: 45, questionid: 33, probability: 25  },
    { userid: 45, questionid: 34, probability: 30  },
    { userid: 45, questionid: 35, probability: 20  },
    { userid: 45, questionid: 36, probability: 70  },
    { userid: 45, questionid: 37, probability: 35  },
    { userid: 45, questionid: 38, probability: 20  },
    // q39: Option 1 — skip
    { userid: 45, questionid: 40, probability: 90  },
    { userid: 45, questionid: 41, probability: 95  },
    { userid: 45, questionid: 42, probability: 30  },
    { userid: 45, questionid: 43, probability: 30  },

    // userid 23 — Jeremy Dauber (2022)
    { userid: 23, questionid: 28, probability: 90  },
    { userid: 23, questionid: 29, probability: 20  },
    { userid: 23, questionid: 30, probability: 20  },
    // q31: blank — skip
    { userid: 23, questionid: 32, probability: 75  },
    { userid: 23, questionid: 33, probability: 75  },
    { userid: 23, questionid: 34, probability: 70  },
    { userid: 23, questionid: 35, probability: 80  },
    { userid: 23, questionid: 36, probability: 80  },
    { userid: 23, questionid: 37, probability: 65  },
    { userid: 23, questionid: 38, probability: 25  },
    // q39: Option 1 — skip
    { userid: 23, questionid: 40, probability: 20  },
    // q41-q42: blank — skip
    { userid: 23, questionid: 43, probability: 35  },

    // userid 46 — Eyal Minsky-Fenick
    { userid: 46, questionid: 28, probability: 90  },
    { userid: 46, questionid: 29, probability: 13  },
    { userid: 46, questionid: 30, probability: 70  },
    { userid: 46, questionid: 31, probability: 27  },
    { userid: 46, questionid: 32, probability: 60  },
    { userid: 46, questionid: 33, probability: 50  },
    { userid: 46, questionid: 34, probability: 67  },
    { userid: 46, questionid: 35, probability: 37  },
    { userid: 46, questionid: 36, probability: 40  },
    { userid: 46, questionid: 37, probability: 60  },
    { userid: 46, questionid: 38, probability: 71  },
    { userid: 46, questionid: 39, probability: 50  },
    { userid: 46, questionid: 40, probability: 60  },
    { userid: 46, questionid: 41, probability: 86  },
    { userid: 46, questionid: 42, probability: 20  },
    { userid: 46, questionid: 43, probability: 15  },

    // userid 47 — Gabriel Farbiarz
    { userid: 47, questionid: 28, probability: 93  },
    { userid: 47, questionid: 29, probability: 63  },
    { userid: 47, questionid: 30, probability: 37  },
    { userid: 47, questionid: 31, probability: 67  },
    { userid: 47, questionid: 32, probability: 58  },
    { userid: 47, questionid: 33, probability: 38  },
    { userid: 47, questionid: 34, probability: 71  },
    { userid: 47, questionid: 35, probability: 49  },
    { userid: 47, questionid: 36, probability: 43  },
    { userid: 47, questionid: 37, probability: 38  },
    { userid: 47, questionid: 38, probability: 38  },
    // q39: Option 1 — skip
    { userid: 47, questionid: 40, probability: 98  },
    { userid: 47, questionid: 41, probability: 89  },
    { userid: 47, questionid: 42, probability: 18  },
    { userid: 47, questionid: 43, probability: 44  },

    // userid 17 — Zev Minsky-Primus (2022)
    { userid: 17, questionid: 28, probability: 95  },
    { userid: 17, questionid: 29, probability: 35  },
    { userid: 17, questionid: 30, probability: 60  },
    { userid: 17, questionid: 31, probability: 50  },
    { userid: 17, questionid: 32, probability: 85  },
    { userid: 17, questionid: 33, probability: 50  },
    { userid: 17, questionid: 34, probability: 30  },
    { userid: 17, questionid: 35, probability: 17  },
    { userid: 17, questionid: 36, probability: 40  },
    { userid: 17, questionid: 37, probability: 40  },
    { userid: 17, questionid: 38, probability: 45  },
    { userid: 17, questionid: 39, probability: 76  },
    { userid: 17, questionid: 40, probability: 83  },
    { userid: 17, questionid: 41, probability: 89  },
    { userid: 17, questionid: 42, probability: 28  },
    { userid: 17, questionid: 43, probability: 40  },

    // userid 48 — Franco Baseggio
    { userid: 48, questionid: 28, probability: 93  },
    { userid: 48, questionid: 29, probability: 25  },
    { userid: 48, questionid: 30, probability: 65  },
    { userid: 48, questionid: 31, probability: 50  },
    { userid: 48, questionid: 32, probability: 85  },
    { userid: 48, questionid: 33, probability: 50  },
    { userid: 48, questionid: 34, probability: 25  },
    { userid: 48, questionid: 35, probability: 25  },
    { userid: 48, questionid: 36, probability: 70  },
    { userid: 48, questionid: 37, probability: 7   },
    { userid: 48, questionid: 38, probability: 30  },
    { userid: 48, questionid: 39, probability: 90  },
    { userid: 48, questionid: 40, probability: 80  },
    { userid: 48, questionid: 41, probability: 93  },
    { userid: 48, questionid: 42, probability: 10  },
    { userid: 48, questionid: 43, probability: 25  },

    // userid 24 — Ida Gorenburg (2022)
    { userid: 24, questionid: 28, probability: 95  },
    { userid: 24, questionid: 29, probability: 25  },
    { userid: 24, questionid: 30, probability: 40  },
    { userid: 24, questionid: 31, probability: 50  },
    { userid: 24, questionid: 32, probability: 30  },
    { userid: 24, questionid: 33, probability: 50  },
    { userid: 24, questionid: 34, probability: 30  },
    { userid: 24, questionid: 35, probability: 30  },
    { userid: 24, questionid: 36, probability: 60  },
    { userid: 24, questionid: 37, probability: 60  },
    { userid: 24, questionid: 38, probability: 50  },
    { userid: 24, questionid: 39, probability: 70  },
    { userid: 24, questionid: 40, probability: 95  },
    { userid: 24, questionid: 41, probability: 85  },
    { userid: 24, questionid: 42, probability: 35  },
    { userid: 24, questionid: 43, probability: 20  },

    // userid 49 — Michael Farbiarz
    { userid: 49, questionid: 28, probability: 95  },
    { userid: 49, questionid: 29, probability: 65  },
    { userid: 49, questionid: 30, probability: 15  },
    { userid: 49, questionid: 31, probability: 50  },
    { userid: 49, questionid: 32, probability: 70  },
    { userid: 49, questionid: 33, probability: 50  },
    { userid: 49, questionid: 34, probability: 65  },
    { userid: 49, questionid: 35, probability: 50  },
    { userid: 49, questionid: 36, probability: 60  },
    { userid: 49, questionid: 37, probability: 45  },
    { userid: 49, questionid: 38, probability: 30  },
    { userid: 49, questionid: 39, probability: 60  },
    { userid: 49, questionid: 40, probability: 85  },
    { userid: 49, questionid: 41, probability: 90  },
    { userid: 49, questionid: 42, probability: 5   },
    { userid: 49, questionid: 43, probability: 50  },

    // userid 50 — David R H Miller
    { userid: 50, questionid: 28, probability: 95  },
    { userid: 50, questionid: 29, probability: 30  },
    { userid: 50, questionid: 30, probability: 95  },
    { userid: 50, questionid: 31, probability: 50  },
    { userid: 50, questionid: 32, probability: 80  },
    { userid: 50, questionid: 33, probability: 80  },
    { userid: 50, questionid: 34, probability: 90  },
    { userid: 50, questionid: 35, probability: 50  },
    { userid: 50, questionid: 36, probability: 80  },
    { userid: 50, questionid: 37, probability: 60  },
    { userid: 50, questionid: 38, probability: 30  },
    { userid: 50, questionid: 39, probability: 70  },
    { userid: 50, questionid: 40, probability: 20  },
    { userid: 50, questionid: 41, probability: 90  },
    { userid: 50, questionid: 42, probability: 5   },
    { userid: 50, questionid: 43, probability: 10  },

    // userid 16 — Lisa Primus (2022)
    { userid: 16, questionid: 28, probability: 95  },
    { userid: 16, questionid: 29, probability: 25  },
    { userid: 16, questionid: 30, probability: 50  },
    { userid: 16, questionid: 31, probability: 30  },
    { userid: 16, questionid: 32, probability: 85  },
    { userid: 16, questionid: 33, probability: 80  },
    { userid: 16, questionid: 34, probability: 50  },
    { userid: 16, questionid: 35, probability: 40  },
    { userid: 16, questionid: 36, probability: 30  },
    { userid: 16, questionid: 37, probability: 60  },
    { userid: 16, questionid: 38, probability: 55  },
    { userid: 16, questionid: 39, probability: 95  },
    { userid: 16, questionid: 40, probability: 96  },
    { userid: 16, questionid: 41, probability: 50  },
    { userid: 16, questionid: 42, probability: 30  },
    { userid: 16, questionid: 43, probability: 50  },

    // userid 18 — Dima Gorenburg (2022)
    { userid: 18, questionid: 28, probability: 95  },
    { userid: 18, questionid: 29, probability: 10  },
    { userid: 18, questionid: 30, probability: 70  },
    { userid: 18, questionid: 31, probability: 35  },
    { userid: 18, questionid: 32, probability: 80  },
    { userid: 18, questionid: 33, probability: 30  },
    { userid: 18, questionid: 34, probability: 40  },
    { userid: 18, questionid: 35, probability: 30  },
    { userid: 18, questionid: 36, probability: 40  },
    { userid: 18, questionid: 37, probability: 40  },
    { userid: 18, questionid: 38, probability: 40  },
    { userid: 18, questionid: 39, probability: 80  },
    { userid: 18, questionid: 40, probability: 70  },
    { userid: 18, questionid: 41, probability: 70  },
    { userid: 18, questionid: 42, probability: 30  },
    { userid: 18, questionid: 43, probability: 25  },

    // userid 51 — Sigal Minsky-Primus
    { userid: 51, questionid: 28, probability: 97.5  },
    { userid: 51, questionid: 29, probability: 20  },
    // q30: blank — skip
    { userid: 51, questionid: 31, probability: 15  },
    // q32-q34: blank — skip
    { userid: 51, questionid: 35, probability: 40  },
    // q36: blank — skip
    { userid: 51, questionid: 37, probability: 65  },
    { userid: 51, questionid: 38, probability: 30  },
    // q39-q43: blank — skip

    // userid 2 — Nava Minsky-Primus (2022)
    { userid: 2,  questionid: 28, probability: 99  },
    { userid: 2,  questionid: 29, probability: 20  },
    { userid: 2,  questionid: 30, probability: 70  },
    { userid: 2,  questionid: 31, probability: 60  },
    { userid: 2,  questionid: 32, probability: 30  },
    { userid: 2,  questionid: 33, probability: 70  },
    { userid: 2,  questionid: 34, probability: 40  },
    { userid: 2,  questionid: 35, probability: 75  },
    { userid: 2,  questionid: 36, probability: 20  },
    { userid: 2,  questionid: 37, probability: 70  },
    { userid: 2,  questionid: 38, probability: 60  },
    { userid: 2,  questionid: 39, probability: 75  },
    { userid: 2,  questionid: 40, probability: 40  },
    { userid: 2,  questionid: 41, probability: 30  },
    { userid: 2,  questionid: 42, probability: 33  },
    { userid: 2,  questionid: 43, probability: 10  },

    // userid 52 — Nancy Koziol
    { userid: 52, questionid: 28, probability: 99  },
    { userid: 52, questionid: 29, probability: 85  },
    { userid: 52, questionid: 30, probability: 60  },
    { userid: 52, questionid: 31, probability: 45  },
    { userid: 52, questionid: 32, probability: 35  },
    { userid: 52, questionid: 33, probability: 75  },
    { userid: 52, questionid: 34, probability: 30  },
    { userid: 52, questionid: 35, probability: 50  },
    { userid: 52, questionid: 36, probability: 75  },
    { userid: 52, questionid: 37, probability: 100 },
    { userid: 52, questionid: 38, probability: 70  },
    { userid: 52, questionid: 39, probability: 85  },
    { userid: 52, questionid: 40, probability: 50  },
    { userid: 52, questionid: 41, probability: 85  },
    { userid: 52, questionid: 42, probability: 35  },
    { userid: 52, questionid: 43, probability: 15  },

    // userid 53 — Monse
    { userid: 53, questionid: 28, probability: 100 }, // 99.9 → 100
    { userid: 53, questionid: 29, probability: 20  },
    // q30: blank — skip
    { userid: 53, questionid: 31, probability: 15  },
    { userid: 53, questionid: 32, probability: 70  },
    { userid: 53, questionid: 33, probability: 85  },
    // q34-q35: blank — skip
    { userid: 53, questionid: 36, probability: 75  },
    { userid: 53, questionid: 37, probability: 45  },
    { userid: 53, questionid: 38, probability: 60  },
    { userid: 53, questionid: 39, probability: 75  },
    { userid: 53, questionid: 40, probability: 55  },
    { userid: 53, questionid: 41, probability: 30  },
    { userid: 53, questionid: 42, probability: 65  },
    // q43: blank — skip

    // userid 54 — Eli Cohen
    { userid: 54, questionid: 28, probability: 80  },
    { userid: 54, questionid: 29, probability: 10  },
    { userid: 54, questionid: 30, probability: 70  },
    { userid: 54, questionid: 31, probability: 98  },
    { userid: 54, questionid: 32, probability: 40  },
    { userid: 54, questionid: 33, probability: 80  },
    { userid: 54, questionid: 34, probability: 80  },
    // q35: blank — skip
    { userid: 54, questionid: 36, probability: 90  },
    { userid: 54, questionid: 37, probability: 30  },
    { userid: 54, questionid: 38, probability: 30  },
    { userid: 54, questionid: 39, probability: 20  },
    { userid: 54, questionid: 40, probability: 80  },
    { userid: 54, questionid: 41, probability: 80  },
    { userid: 54, questionid: 42, probability: 40  },
    { userid: 54, questionid: 43, probability: 30  },
];


// Seed the database and update sequences
const { Client } = require('pg');

async function seedAndUpdateSequences() {
    await seedDatabase(users, questions, answers, settings, results);
    const client = new Client({
        user: process.env.DB_USER || 'localuser',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'localdb',
        password: process.env.DB_PASSWORD || 'localpass',
        port: process.env.DB_PORT || 5432,
    });

    try {
        await client.connect();
        // Set the sequence to start after our seeded data
        await client.query(`SELECT setval('"Users_UserID_seq"', 100, true);`);
        console.log('Updated Users sequence to start at 101');
        await client.query(`SELECT setval('"Question_Id_seq"', 100, true);`);
        console.log('Updated question sequence to start at 101');
        await client.end();
    } catch (err) {
        console.error('Error updating sequence:', err);
        throw err;
    }
}

seedAndUpdateSequences()
    .then(() => {
        console.log('Local data seeded successfully (users, questions, answers)');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Failed to seed test data:', err);
        process.exit(1);
    });
