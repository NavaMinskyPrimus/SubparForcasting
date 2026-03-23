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
    { userid: 22, name: 'Michelle Fisher',    email: 'michelle@alumni.princeton.edu',  permission: 'user', sub: null },
    { userid: 23, name: 'Jeremy Dauber',      email: 'jdauber@columbia.edu',           permission: 'user', sub: null },
    { userid: 24, name: 'Ida Gorenburg',      email: 'idagorenburg@gmail.com',         permission: 'user', sub: null },
];

const settings = ['2021-01-02T00:00:00Z','2021-02-09T00:00:00Z', 2021]

const questions = [
    // 2021 questions (q15 "Facebook same company" and q19 "Major legislation passed" removed;
    // their answers merged into q19 "No court Facebook breakup" and q17 "Major legislation gets through" respectively;
    // all subsequent questionids shifted down accordingly)
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
];

const results = [
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
