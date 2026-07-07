// Template structural database containing placeholders for substitution
const TEMPLATE_DB = {
  // === NOMINATIVE ===
  ich_nom: [
    { de: "___ wohne seit {years} Jahren in {city}.", en: "I have been living in {city} for {years_en} years.", clue: "Subject pronoun.", hint: "First-person singular Nominative ('I') is 'ich'." },
    { de: "___ trinke morgens gerne {drink}.", en: "I like to drink {drink_en} in the morning.", clue: "Subject of 'trinke'.", hint: "Matches ending '-e'. 'ich' fits perfectly." },
    { de: "___ kann {nameFem} {time} leider nicht beim Umzug helfen.", en: "I unfortunately cannot help {nameFem} with the move {time_en}.", clue: "Subject of modal verb 'kann'.", hint: "First-person singular is 'ich'." },
    { de: "___ lese gerade {itemNeut} im Wohnzimmer.", en: "I am currently reading {itemNeut_en} in the living room.", clue: "Subject performing the reading.", hint: "Subject pronoun representing 'I' is 'ich'." }
  ],
  du_nom: [
    { de: "Woher kommst ___ eigentlich?", en: "Where do you actually come from?", clue: "Subject of 'kommst'.", hint: "The verb ending '-st' points to the informal singular 'du'." },
    { de: "Hast ___ {time} Zeit für ein schnelles Treffen?", en: "Do you have time for a quick meeting {time_en}?", clue: "Subject in a question block.", hint: "Verb 'hast' matches 'du' (informal you)." },
    { de: "Bist ___ {time} auch so unglaublich müde?", en: "Are you also so incredibly tired {time_en}?", clue: "Subject of auxiliary 'bist'.", hint: "Conjugation of 'sein' for informal singular 'you' is 'du'." },
    { de: "Lernst ___ gerne Deutsch in {city}?", en: "Do you like learning German in {city}?", clue: "Subject of study verb 'lernst'.", hint: "Verb ends in '-st', requiring 'du'." }
  ],
  er_nom: [
    { de: "{nameMasc} arbeitet in {city}. ___ ist sehr fleißig.", en: "{nameMasc} works in {city}. He is very hardworking.", clue: "Subject replacing masculine name.", hint: "Replacing a masculine singular noun ('he') in nominative yields 'er'." },
    { de: "Wo ist der Hund? ___ spielt {time} im Garten.", en: "Where is the dog? He/It is playing in the garden {time_en}.", clue: "Replacing masculine subject 'der Hund'.", hint: "German nouns have gender. 'Hund' is masculine (der), so it is replaced by 'er'." },
    { de: "Mein Vater kommt {time}. ___ bringt {food} mit.", en: "My father is coming {time_en}. He is bringing {food_en} along.", clue: "Subject replacing 'mein Vater'.", hint: "Masculine nominative singular pronoun is 'er'." },
    { de: "Der heiße Kaffee schmeckt gut. ___ ist perfekt für den Morgen.", en: "The hot coffee tastes good. It is perfect for the morning.", clue: "Replacing masculine 'der Kaffee'.", hint: "'Kaffee' is masculine in German. We use 'er' to mean 'it' here." }
  ],
  sie_sg_nom: [
    { de: "{nameFem} lernt fleißig Deutsch. ___ wohnt in {city}.", en: "{nameFem} is studying German hard. She lives in {city}.", clue: "Subject replacing feminine name.", hint: "Replacing a female single person ('she') is 'sie' (lowercase)." },
    { de: "Frau Müller ist eine tolle Lehrerin. ___ arbeitet in {city}.", en: "Mrs. Müller is a great teacher. She works in {city}.", clue: "Subject replacing 'Frau Müller'.", hint: "Feminine singular nominative pronoun is 'sie'." },
    { de: "Wo ist {itemFem}? ___ liegt bestimmt auf dem Küchentisch.", en: "Where is {itemFem_en}? It is certainly lying on the kitchen table.", clue: "Replacing feminine noun '{itemFem}'.", hint: "'{itemFem}' is grammatically feminine (die). We replace it with 'sie' ('it/she')." },
    { de: "Meine Mutter backt gerade. ___ macht {food}.", en: "My mother is baking right now. She is making {food_en}.", clue: "Subject replacing feminine singular relative.", hint: "We use 'sie' to represent 'she'." }
  ],
  es_nom: [
    { de: "Das Kind schläft. ___ ist {time} extrem müde.", en: "The child is sleeping. It is extremely tired {time_en}.", clue: "Replacing neuter subject 'das Kind'.", hint: "'Kind' is neuter (das Kind). The matching nominative pronoun is 'es'." },
    { de: "Wie findest du {itemNeut}? ___ ist wirklich sehr spannend.", en: "How do you like {itemNeut_en}? It is really very exciting.", clue: "Replacing neuter subject '{itemNeut}'.", hint: "'{itemNeut}' is neuter (das). The replacement subject is 'es'." },
    { de: "Draußen regnet ___. Wir bleiben lieber zu Hause.", en: "Outside it is raining. We'd rather stay at home.", clue: "Dummy subject for weather.", hint: "German weather verbs use the dummy pronoun 'es' ('es regnet')." },
    { de: "Das Baby weint laut. ___ möchte bestimmt {drink}.", en: "The baby is crying loudly. It certainly wants {drink_en}.", clue: "Replacing neuter subject 'das Baby'.", hint: "'Baby' is neuter in German. Use 'es' for 'it'." }
  ],
  wir_nom: [
    { de: "Am kommenden Wochenende fahren ___ nach {city}.", en: "On the upcoming weekend we are driving to {city}.", clue: "Subject matching verb plural 'fahren'.", hint: "The speaker is part of the group. 'We' in German is 'wir'." },
    { de: "Können ___ {time} zusammen in der Bibliothek lernen?", en: "Can we study together in the library {time_en}?", clue: "Subject of plural question.", hint: "Subject matching 'können' meaning 'we' is 'wir'." },
    { de: "___ haben heute leider keine Zeit für {itemNeut}.", en: "We unfortunately have no time for {itemNeut_en} today.", clue: "Subject of 'haben'.", hint: "1st person plural pronoun is 'wir'." },
    { de: "In der Küche kochen ___ gemeinsam {food}.", en: "In the kitchen we are cooking {food_en} together.", clue: "Subject of 'kochen'.", hint: "1st person plural pronoun meaning 'we' is 'wir'." }
  ],
  ihr_nom: [
    { de: "Kinder, habt ___ {time} eure Hausaufgaben ordentlich gemacht?", en: "Children, have you guys done your homework properly {time_en}?", clue: "Addressing multiple children informally.", hint: "Informal plural 'you guys' in nominative is 'ihr'." },
    { de: "Was wollt ___ {time} am liebsten in {city} essen?", en: "What do you guys want to eat most in {city} {time_en}?", clue: "Subject of modal plural 'wollt'.", hint: "2nd person plural informal ('you all') is 'ihr'." },
    { de: "Kommt ___ auch zur großen Party {time}?", en: "Are you guys also coming to the big party {time_en}?", clue: "Subject of verb 'kommt'.", hint: "2nd person plural pronoun is 'ihr'." },
    { de: "Habt ___ {itemNeut} schon im Kino gesehen?", en: "Have you guys already seen {itemNeut_en} in the cinema?", clue: "Subject of auxiliary 'habt' (plural).", hint: "Informal plural group addressed as 'ihr'." }
  ],
  sie_pl_nom: [
    { de: "Meine Eltern sind im Urlaub. ___ reisen {time} nach {city}.", en: "My parents are on vacation. They are traveling to {city} {time_en}.", clue: "Subject replacing plural 'meine Eltern'.", hint: "3rd person plural subject ('they') is 'sie' (lowercase)." },
    { de: "Wo sind die Schlüssel? ___ liegen bestimmt in der Küche.", en: "Where are the keys? They are certainly lying in the kitchen.", clue: "Replacing plural noun 'die Schlüssel'.", hint: "Plural nouns are replaced by 'sie' in nominative." },
    { de: "Die Kinder spielen draußen. ___ essen gerade {food}.", en: "The children are playing outside. They are currently eating {food_en}.", clue: "Replacing plural subject.", hint: "Third person plural ('they') is 'sie'." },
    { de: "Thomas und Julia kommen später. ___ müssen noch arbeiten.", en: "Thomas and Julia are coming later. They still have to work.", clue: "Subject representing multiple third-person actors.", hint: "Plural subject pronoun is 'sie' (they)." }
  ],
  sie_formal_nom: [
    { de: "Herr Schmidt, arbeiten ___ schon lange in {city}?", en: "Mr. Schmidt, do you work in {city} for a long time? (formal)", clue: "Formal addressing singular subject.", hint: "The formal 'You' is always capitalized 'Sie' and takes plural verb endings." },
    { de: "Frau Becker, möchten ___ {food} bestellen?", en: "Mrs. Becker, would you like to order {food_en}? (formal)", clue: "Formal addressing singular subject.", hint: "Capitalized 'Sie' for formal address." },
    { de: "Können ___ mir {time} kurz den Weg erklären?", en: "Can you explain the way to me briefly {time_en}? (formal)", clue: "Formal request to a stranger.", hint: "Capitalized polite form: 'Sie'." },
    { de: "Sehr geehrte Gäste, haben ___ noch Fragen zu {itemNeut}?", en: "Dear guests, do you have any more questions about {itemNeut_en}? (formal)", clue: "Formal addressing plural audience.", hint: "Polite formal pronoun, capitalized 'Sie'." }
  ],

  // === ACCUSATIVE ===
  mich_akk: [
    { de: "Mein kleiner Hund liebt ___ über alles.", en: "My small dog loves me above everything.", clue: "Direct object of 'lieben'.", hint: "Accusative of 'ich' (me) is 'mich'." },
    { de: "Kannst du ___ {time} bitte vom Bahnhof abholen?", en: "Can you please pick me up from the station {time_en}?", clue: "Direct object of transitve verb 'abholen'.", hint: "1st person singular accusative is 'mich'." },
    { de: "Warum rufst du ___ mitten in der Nacht an?", en: "Why are you calling me in the middle of the night?", clue: "Direct object of transitive verb 'anrufen'.", hint: "Accusative of 'ich' is 'mich'." },
    { de: "Der Abteilungsleiter sucht ___ für ein dringendes Gespräch.", en: "The department manager is looking for me for an urgent meeting.", clue: "Direct object of 'suchen'.", hint: "First person accusative pronoun is 'mich'." }
  ],
  dich_akk: [
    { de: "Ich liebe ___, mein Schatz!", en: "I love you, my darling!", clue: "Direct object of transitive 'lieben'.", hint: "Accusative of 'du' (you) is 'dich'." },
    { de: "Ich habe ___ seit einer ganzen Stunde in {city} gesucht.", en: "I have looked for you for a whole hour in {city}.", clue: "Direct object of 'suchen'.", hint: "2nd person singular accusative is 'dich'." },
    { de: "Kann ich ___ {time} kurz in {city} besuchen?", en: "Can I visit you briefly in {city} {time_en}?", clue: "Direct object of 'besuchen'.", hint: "The accusative singular of 'du' is 'dich'." },
    { de: "Wir wollen ___ {time} herzlich zu unserem Abendessen einladen.", en: "We want to invite you warmly to our dinner {time_en}.", clue: "Direct object of split transitive verb 'einladen'.", hint: "Accusative singular of 'du' is 'dich'." }
  ],
  ihn_akk: [
    { de: "Ich habe einen neuen Laptop. Ich benutze ___ jeden Tag.", en: "I have a new laptop. I use it every day.", clue: "Direct object replacing masculine 'der Laptop'.", hint: "Accusative of masculine singular 'er' is 'ihn' (him/it)." },
    { de: "Wo ist dein Bruder {nameMasc}? Ich habe ___ gestern nicht gesehen.", en: "Where is your brother {nameMasc}? I did not see him yesterday.", clue: "Direct object of 'sehen' replacing male relative.", hint: "Masculine singular accusative is 'ihn'." },
    { de: "Der Salat schmeckt super, ich esse ___ sehr gerne.", en: "The salad tastes great, I like to eat it.", clue: "Direct object replacing masculine 'der Salat'.", hint: "Accusative of masculine is 'ihn' (representing 'it')." },
    { de: "Wir rufen {nameMasc} an und laden ___ ein.", en: "We are calling {nameMasc} and inviting him.", clue: "Direct object of 'einladen'.", hint: "Accusative singular masculine is 'ihn'." }
  ],
  sie_sg_akk: [
    { de: "Das ist meine Freundin {nameFem}. Ich lade ___ ins Kino ein.", en: "That is my girlfriend {nameFem}. I am inviting her to the cinema.", clue: "Direct object replacing female relative.", hint: "Accusative singular feminine is 'sie' (identical to nominative)." },
    { de: "Meine Mutter kocht eine Suppe. Wir essen ___ gleich.", en: "My mother is cooking a soup. We will eat it soon.", clue: "Direct object replacing feminine 'die Suppe'.", hint: "Accusative singular feminine is 'sie'." },
    { de: "Deine Tasche ist echt schön. Wo hast du ___ gekauft?", en: "Your bag is really beautiful. Where did you buy it?", clue: "Direct object of 'kaufen' replacing 'die Tasche'.", hint: "Replacing feminine accusative object with 'sie'." },
    { de: "Ich kenne Frau Müller schon lange. Ich treffe ___ {time} in {city}.", en: "I have known Mrs. Müller for a long time. I am meeting her {time_en} in {city}.", clue: "Direct object of transitive 'treffen'.", hint: "Feminine singular accusative is 'sie'." }
  ],
  es_akk: [
    { de: "Das Baby weint. Kannst du ___ bitte für einen Moment halten?", en: "The baby is crying. Can you please hold it for a moment?", clue: "Direct object of 'halten' replacing 'das Baby'.", hint: "Neuter accusative singular is 'es' (identical to nominative)." },
    { de: "Ich mag dein neues Auto sehr. Hast du ___ selbst bezahlt?", en: "I like your new car very much. Did you pay for it yourself?", clue: "Direct object of 'bezahlen' replacing 'das Auto'.", hint: "Accusative singular neuter is 'es'." },
    { de: "Das Buch ist spannend. Ich lese ___ {time} zu Ende.", en: "The book is exciting. I am reading it to the end {time_en}.", clue: "Direct object replacing neuter 'das Buch'.", hint: "Neuter singular accusative is 'es'." },
    { de: "Das Kind schläft tief. Wir wollen ___ jetzt nicht stören.", en: "The child is sleeping deeply. We do not want to disturb it now.", clue: "Direct object of 'stören' replacing 'das Kind'.", hint: "Neuter singular accusative is 'es'." }
  ],
  uns_akk: [
    { de: "Unser netter Onkel besucht ___ am kommenden Wochenende.", en: "Our nice uncle is visiting us on the upcoming weekend.", clue: "Direct object of 'besuchen' (us).", hint: "Accusative of 'wir' (us) is 'uns'." },
    { de: "Der Lehrer hört ___ nicht, weil wir so unglaublich leise sprechen.", en: "The teacher doesn't hear us because we speak so incredibly quietly.", clue: "Direct object of 'hören'.", hint: "Accusative of 'wir' is 'uns'." },
    { de: "Er hat ___ gestern zufällig auf dem Markt in {city} getroffen.", en: "He ran into us yesterday by chance at the market in {city}.", clue: "Direct object of transitive 'treffen'.", hint: "Accusative plural for 'us' is 'uns'." },
    { de: "Der nette Busfahrer fährt ___ direkt nach {city}.", en: "The nice bus driver is driving us directly to {city}.", clue: "Direct object of 'fahren'.", hint: "1st person plural accusative is 'uns'." }
  ],
  euch_akk: [
    { de: "Kinder, ich fahre ___ morgen früh pünktlich zur Schule.", en: "Children, I will drive you guys to school early tomorrow morning.", clue: "Direct object addressing children informally.", hint: "Accusative plural of 'ihr' is 'euch' (you guys)." },
    { de: "Der Chef möchte ___ heute Nachmittag dringend in seinem Büro sprechen.", en: "The boss wants to speak to you guys urgently in his office this afternoon.", clue: "Direct object of transitive verbal construct.", hint: "Accusative plural of 'ihr' is 'euch'." },
    { de: "Ich lade ___ herzlich zu meiner großen Party ein, meine Freunde!", en: "I invite you guys warmly to my big party, my friends!", clue: "Direct object of 'einladen' addressing friends.", hint: "Accusative plural of 'ihr' is 'euch'." },
    { de: "Wir haben ___ gestern beim Sport in {city} gesehen.", en: "We saw you guys yesterday at sports in {city}.", clue: "Direct object of 'sehen'.", hint: "Accusative plural of 'ihr' is 'euch'." }
  ],
  sie_pl_akk: [
    { de: "Das sind meine Großeltern. Ich besuche ___ sehr oft.", en: "Those are my grandparents. I visit them very often.", clue: "Direct object replacing plural relative.", hint: "3rd person plural accusative is 'sie' (identical to nominative)." },
    { de: "Die Hausaufgaben sind schwer, aber ich mache ___ jetzt schnell.", en: "The homework assignments are difficult, but I am doing them quickly now.", clue: "Direct object replacing plural 'die Hausaufgaben'.", hint: "Plural accusative is 'sie' (them)." },
    { de: "Wo sind meine Schlüssel? Ich suche ___ schon den ganzen Morgen.", en: "Where are my keys? I am looking for them all morning.", clue: "Direct object of 'suchen' replacing plural.", hint: "Plural accusative is 'sie'." },
    { de: "Ich mag diese schönen Blumen. Ich kaufe ___ {time}.", en: "I like these beautiful flowers. I am buying them {time_en}.", clue: "Direct object of 'kaufen'.", hint: "Plural accusative is 'sie' (them)." }
  ],
  sie_formal_akk: [
    { de: "Frau Müller, ich möchte ___ morgen Vormittag kurz anrufen.", en: "Mrs. Müller, I want to call you briefly tomorrow morning. (formal)", clue: "Formal direct object of 'anrufen'.", hint: "Formal accusative 'You' is always capitalized 'Sie'." },
    { de: "Herr Schmidt, der Direktor sucht ___ heute dringend.", en: "Mr. Schmidt, the director is looking for you urgently today. (formal)", clue: "Formal direct object of 'suchen'.", hint: "Capitalized 'Sie' for formal address." },
    { de: "Sehr geehrte Gäste, wir begrüßen ___ ganz herzlich in {city}.", en: "Dear guests, we welcome you very warmly in {city}. (formal)", clue: "Formal direct object of greeting.", hint: "Capitalized polite pronoun: 'Sie'." },
    { de: "Kann ich ___ {time} kurz stören, Herr Dr. Weber?", en: "Can I disturb you briefly {time_en}, Dr. Weber? (formal)", clue: "Direct object of transitive 'stören'.", hint: "Capitalized polite form: 'Sie'." }
  ],

  // === DATIVE ===
  mir_dat: [
    { de: "Kannst du ___ bitte {itemNeut} für einen Moment geben?", en: "Can you please give me {itemNeut_en} for a moment?", clue: "Indirect object of giving verb 'geben'.", hint: "Dative of 'ich' (to me) is 'mir'." },
    { de: "Das frisch gekochte Essen schmeckt ___ heute fantastisch!", en: "The freshly cooked food tastes fantastic to me today!", clue: "Object of dative-taking verb 'schmecken'.", hint: "1st person singular dative is 'mir'." },
    { de: "Kopfschmerzen tun ___ heute wieder extrem weh.", en: "Headaches hurt me extremely again today.", clue: "Object of dative idiom 'weh tun'.", hint: "Dative singular of 'ich' is 'mir'." },
    { de: "{itemNeut} gefällt ___ unglaublich gut. Ich will es kaufen.", en: "{itemNeut_en} pleases me incredibly well. I want to buy it.", clue: "Object of dative verb 'gefallen'.", hint: "Dative singular of 'ich' is 'mir'." }
  ],
  dir_dat: [
    { de: "Wie geht es ___ {time}?", en: "How are you doing {time_en}?", clue: "Object of dative idiom 'Wie geht es...'.", hint: "Dative singular of 'du' is 'dir'." },
    { de: "Ich danke ___ von ganzem Herzen für deine Hilfe.", en: "I thank you from the bottom of my heart for your help.", clue: "Object of dative-taking verb 'danken'.", hint: "Dative singular of 'du' is 'dir'." },
    { de: "Gehört {itemNeut} eigentlich ___?", en: "Does {itemNeut_en} actually belong to you?", clue: "Object of dative verb 'gehören'.", hint: "Dative singular of 'du' is 'dir'." },
    { de: "Ich helfe ___ gerne bei deiner schweren Arbeit.", en: "I gladly help you with your heavy work.", clue: "Object of dative verb 'helfen'.", hint: "Dative singular of 'du' is 'dir'." }
  ],
  ihm_masc_dat: [
    { de: "Er hat Geburtstag, ich schenke ___ {itemNeut}.", en: "It's his birthday, I'm giving him {itemNeut_en}.", clue: "Indirect object of 'schenken' for a male.", hint: "Dative singular masculine is 'ihm'." },
    { de: "Sein Vater ist sehr krank. Wie geht es ___?", en: "His father is very sick. How is he doing?", clue: "Object of dative idiom for male subject.", hint: "Dative of 'er' is 'ihm'." },
    { de: "Der Hund ist weggelaufen. Folge ___ schnell!", en: "The dog ran away. Follow him/it quickly!", clue: "Object of dative verb 'folgen'.", hint: "Replacing masculine noun. Masculine singular dative is 'ihm'." },
    { de: "{nameMasc} ist hungrig. Ich bringe ___ {food}.", en: "{nameMasc} is hungry. I am bringing him {food_en}.", clue: "Indirect object of bringing verb 'bringen'.", hint: "Masculine singular dative is 'ihm'." }
  ],
  ihr_dat: [
    { de: "Das Auto gehört meiner Mutter. Es gehört ___.", en: "The car belongs to my mother. It belongs to her.", clue: "Object of dative verb 'gehören' replacing a female.", hint: "Dative singular feminine is 'ihr'." },
    { de: "Ich antworte ___ morgen ganz ausführlich per E-Mail.", en: "I will answer her very comprehensively tomorrow via email.", clue: "Object of dative verb 'antworten' for female.", hint: "Dative singular feminine is 'ihr'." },
    { de: "Meine Schwester feiert. Ich helfe ___ gerne beim Kochen.", en: "Meine sister is celebrating. I gladly help her with cooking.", clue: "Object of dative verb 'helfen'.", hint: "Dative singular feminine is 'ihr'." },
    { de: "{nameFem} hat großen Durst. Ich gebe ___ {drink}.", en: "{nameFem} is very thirsty. I am giving her {drink_en}.", clue: "Indirect object of 'geben' for a female.", hint: "Feminine singular dative is 'ihr'." }
  ],
  ihm_neut_dat: [
    { de: "Das Kind weint bitterlich. Was fehlt ___ nur?", en: "The child is crying bitterly. What is wrong with it?", clue: "Object of dative verb 'fehlen' for a child.", hint: "Neuter singular dative is 'ihm' (same as masculine)." },
    { de: "Das Baby hat Hunger. Ich gebe ___ eine warme Milch.", en: "The baby is hungry. I give it warm milk.", clue: "Indirect object of 'geben' for neuter baby.", hint: "Neuter singular dative is 'ihm'." },
    { de: "Das Mädchen liebt ein Pferd. Es gehört ___.", en: "The girl loves a horse. It belongs to her/it.", clue: "Object of dative 'gehören' replacing neuter 'Mädchen'.", hint: "CRITICAL: 'Mädchen' is neuter (das). Therefore, the pronoun MUST be 'ihm' (not 'ihr')." },
    { de: "Das Kalb friert im Stall. Wir bringen ___ trockenes Stroh.", en: "The calf is freezing in the stable. We are bringing it dry straw.", clue: "Indirect object replacing neuter animal 'das Kalb'.", hint: "Neuter singular dative is 'ihm'." }
  ],
  uns_dat: [
    { de: "{itemNeut} gefällt ___ sehr. Wir wollen es kaufen.", en: "We like {itemNeut_en} very much. We want to buy it.", clue: "Object of dative 'gefallen' for us.", hint: "Dative plural of 'wir' (to us) is 'uns'." },
    { de: "Können Sie ___ bitte den Weg zeigen? Wir haben uns verirrt.", en: "Can you please show us the way? We got lost. (formal)", clue: "Indirect object of 'zeigen' (to us).", hint: "Dative plural of 'wir' is 'uns'." },
    { de: "Der Lehrer antwortet ___ immer sehr geduldig.", en: "The teacher always answers us very patiently.", clue: "Object of dative verb 'antworten'.", hint: "Dative plural of 'wir' is 'uns'." },
    { de: "{nameMasc} bringt ___ gleich {food}.", en: "{nameMasc} is bringing us {food_en} soon.", clue: "Indirect object of 'bringen'.", hint: "Dative plural of 'wir' is 'uns'." }
  ],
  euch_dat: [
    { de: "Schmeckt ___ {food}, Kinder?", en: "Does {food_en} taste good to you guys, children?", clue: "Object of dative verb 'schmecken' for multiple kids.", hint: "Dative plural of 'ihr' is 'euch' (to you guys)." },
    { de: "Ich danke ___ für das schöne Geschenk, liebe Freunde!", en: "I thank you guys for the beautiful present, dear friends!", clue: "Object of dative 'danken' for friends.", hint: "Dative plural of 'ihr' is 'euch'." },
    { de: "Gehört dieses Buch ___?", en: "Does this book belong to you guys?", clue: "Object of dative 'gehören' for a group.", hint: "Dative plural of 'ihr' is 'euch'." },
    { de: "Ich helfe ___ morgen gerne beim großen Aufräumen.", en: "I gladly help you guys with the big cleanup tomorrow.", clue: "Object of dative 'helfen' for multiple peers.", hint: "Dative plural of 'ihr' is 'euch'." }
  ],
  ihnen_dat: [
    { de: "Meine Freunde ziehen um, ich helfe ___ gerne.", en: "My friends are moving, I gladly help them.", clue: "Object of dative 'helfen' replacing plural friends.", hint: "3rd person plural dative is 'ihnen' (lowercase)." },
    { de: "Die Kinder sind traurig. Was ist ___ gestern passiert?", en: "The children are sad. What happened to them yesterday?", clue: "Object of dative 'passieren' replacing plural children.", hint: "Dative plural 'them' is 'ihnen'." },
    { de: "Ich habe meinen Eltern geschrieben. Ich wünsche ___ schönen Urlaub.", en: "I wrote to my parents. I wish them a nice vacation.", clue: "Indirect object of 'wünschen' replacing plural relatives.", hint: "Dative plural 'them' is 'ihnen'." },
    { de: "Die Nachbarn feiern laut. Ich bringe ___ {food}.", en: "The neighbors are celebrating loudly. I am bringing them {food_en}.", clue: "Indirect object of bringing to a plural group.", hint: "Dative plural 'them' is 'ihnen'." }
  ],
  sie_formal_dat: [
    { de: "Herr Schmidt, wie geht es ___ heute?", en: "Mr. Schmidt, how are you today? (formal)", clue: "Object of formal dative idiom.", hint: "Formal dative 'You' is always capitalized 'Ihnen'." },
    { de: "Frau Becker, ich danke ___ herzlich für das nette Gespräch.", en: "Mrs. Becker, I thank you warmly for the nice conversation. (formal)", clue: "Object of dative 'danken' in formal speech.", hint: "Capitalized 'Ihnen' for formal address." },
    { de: "Sehr geehrte Damen, kann ich ___ einen Tee anbieten?", en: "Dear Ladies, can I offer you some tea? (formal)", clue: "Indirect object in formal speech.", hint: "Capitalized formal dative is 'Ihnen'." },
    { de: "Ich wünsche ___ einen angenehmen Tag in {city}.", en: "I wish you a pleasant day in {city}. (formal)", clue: "Indirect object of 'wünschen' in formal speech.", hint: "Capitalized formal dative is 'Ihnen'." }
  ]
};