# Chronizo OET Changelog

## v3.10 — Delete/Create Lock Hotfix

- Added defensive repair after event deletion, bulk deletion, loading, merging, startup, and refresh.
- Cleans stale UI state after deleted events:
  - stale selected IDs,
  - stale edit-panel event ID,
  - stale connect source,
  - dead connections pointing to deleted events,
  - empty bulk-edit dialog state.
- Release-order media blocks are now treated as view-only synthetic blocks and cannot be bulk-selected/deleted as if they were real events.
- All module cache-busting query strings updated to `v=3.10`.

## v3.9 — Release Grouping Fix

- Release Order groups by release date + universe + media label.
- Micro-event `type` values such as event/clue/background no longer split one episode into multiple release blocks.
# 4.0.0-alpha.1

## alpha.31

- Source and event dates are now descriptive text and accept values such as `1260 BC`, `10 AD`, `początek czasu` or an ISO date.
- Recognized historical labels, including BC/BCE and AD/CE, are sorted chronologically on Road.
- Added an inline world creation button to the event form.
- A world created from an event is immediately selected as that event's host world.

## alpha.30

- Temporarily hidden the Atlas from navigation without removing its implementation.
- Road source order and event chronology now render as a horizontally scrollable TVA-style branching track.
- Added project export to a portable, versioned Chronizo JSON file.
- Added JSON import as a separate restored project, preserving the existing local project.
- Prepared the project data format for a future authenticated server sync.

## alpha.29

- Reality designations are now free text and accept both canonical forms such as Earth-616 and temporary Marvel labels such as TRN414.
- Added selectable Captain shield, Chronizo green, neutral dark and light themes with the choice saved locally.
- Characters now support multiple alter egos and alternative names, all searchable and visible in event assignment.
- Existing single alter ego values are migrated transparently when a character is edited.

## alpha.28

- Project worlds now store the Marvel reality number separately from their short description.
- Worlds are displayed consistently as `Earth-{number}` with a readable label such as MCU or X-Men Fox.
- World selectors show both the canonical identifier and description while preserving older saved worlds.

## alpha.27

- Added a dedicated character registry with only name, alter ego, world, birth date and death date.
- Characters are assigned directly to events rather than sources, and one event can contain many characters.
- Character cards show connections inferred from shared events; event cards show their participants.
- Character names and alter egos are included in event relationship search.
- Added character editing and deletion, including safe removal from existing events.

## alpha.26

- Added editing and deletion for sources and events.
- One event can now cite a primary source plus multiple additional sources.
- Added project worlds, a host world and additional participating worlds for convergence events.
- Atlas now shows every project world and bridges created by meetings between worlds.
- Source and event lists use a right-growing TVA-style tree and metric values are centered.

## alpha.25

- Added a required event picker for before, after and parallel relationships.
- Events can be searched by title, source, character/tag, world, place and notes and are grouped by source.
- Road can switch between source order and event chronology.
- Sources have an optional approximate date; an event may override it for flashbacks and other exceptions.

## alpha.24

- Replaced the visual-first demo with the empty Chronizo 2 chronicler workbench.
- Added projects, Road sources, rapid consecutive event capture and an inbox for uncertain facts.
- Moved Atlas into an empty experimental view generated from user data.
- Removed all example worlds, characters, places and events from the active interface and isolated storage from the previous prototype.

## alpha.23
- Added an always-visible Chronizo place shortcut inside the detailed map.
- The fictional Parker home can now be opened directly in Forest Hills at building zoom.
- Fictional locations use the violet Chronizo marker instead of pretending to be OpenStreetMap data.

## alpha.22

- Dokładna mapa działa wewnątrz Chronizo jako własny widok kafelkowy.
- OpenStreetMap jest podkładem, a lokalizacje Chronizo tworzą niezależną klikalną warstwę POI.
- Warstwa pokazuje także miejsca fikcyjne i lokalizacje dodane przez użytkownika.
- Widok szczegółowy ma niezależne przybliżanie od poziomu kraju do ulicy.

## alpha.21

- Ikona dokładnej mapy jest teraz zwykłym linkiem zamiast blokowanego wywołania popup.
- Link ma od razu adres Nowego Jorku i zmienia się wraz z wybraną lokalizacją.

## alpha.20

- Dokładna mapa otwiera się jako pełna strona OpenStreetMap, ponieważ osadzona ramka była blokowana.
- Antarktyda ma własny bezpieczny kontur bez błędnego połączenia przez południk 180°.

## alpha.19

- Nowy Jork jest domyślnym przykładem dokładnej mapy, a ikona mapy jest aktywna od razu.
- Wybranie kolejnego wydarzenia lub miejsca nadal automatycznie zmienia cel dokładnej mapy.

## alpha.18

- Etykiety wydarzeń, miejsc i postaci mają większy stały rozmiar ekranowy oraz nadal cienki obrys.
- Ikona dokładnej mapy jest zawsze widoczna w panelu zoomu; aktywuje się po wyborze miejsca i od 4×.
- World Shift, rozgałęzienie i linia wspomnienia zostały dopasowane do frontalnego rzutu mapy.

## alpha.17

- Etykiety zachowują czytelny rozmiar podczas przybliżania, a ich ciemny obrys jest znacznie cieńszy.
- Od powiększenia 10× po wybraniu miejsca pojawia się przycisk „Pokaż mapę miejsca”.
- Dokładna mapa uliczna OpenStreetMap jest ładowana dopiero po kliknięciu i zawiera wymagane oznaczenie autorów.
- Przyciski plus/minus korzystają teraz z pełnego zakresu powiększenia do 20×.
- Rzut mapy jest bardziej frontalny i tylko lekko ukośny, dzięki czemu geografia pozostaje łatwiejsza do odczytania.

## alpha.16

- Oś czasu została odsunięta ponad mapę, więc wydarzenia nie udają już punktów geograficznych w przypadkowych krajach.
- Kliknięcie wydarzenia podnosi mapę o różnicę między pozycją czasu a rzeczywistą pozycją miejsca.
- Punkt Nowego Jorku trafia dokładnie pod wydarzenia Kapitana Ameryki i bitwy o Nowy Jork.

## alpha.15

- Istniejące lokalizacje są pozycjonowane z długości i szerokości geograficznej na tej samej projekcji co mapa.
- Nowy Jork, USA, Queens, Forest Hills, Ingram Street i dom Parkerów korzystają z rzeczywistych współrzędnych.
- Fikcyjne Sokovia i Wakanda otrzymały jawne umowne kotwice, a Kamar-Taj umieszczono w rejonie Katmandu.
- Linie postaci są cieńsze i prowadzone łagodnymi krzywymi; pogrubiają się dopiero podczas filtrowania.

## alpha.14

- Zastąpiono umowny rysunek kontynentów pełną mapą świata opartą na danych geograficznych.
- Równoleżniki i południki są rozmieszczone co 30° w odwzorowaniu równokątnym, a dopiero potem poddane rzutowi izometrycznemu.
- Usunięto dodatkowe proceduralne plamy kontynentów i ukośne linie, które fałszowały geografię.

## alpha.13

- Hierarchiczny model: świat, kontynent, kraj, miasto, dzielnica, ulica, budynek i pomieszczenie.
- Semantyczny zoom odsłania dokładniejsze lokalizacje wraz ze wzrostem powiększenia.
- Nowe lokalizacje otrzymują automatycznie najbliższego logicznego rodzica.
- Panel pokazuje pełną ścieżkę lokalizacji.

## alpha.12

- Usunięta stała kolumna rezerwowana wcześniej dla inspektora.
- Inspektor jest nakładką i nigdy nie zmniejsza obszaru mapy.

## alpha.11

- Naprawiona kolizja reguł dotykowych z mobilną siatką.
- Mapa i obszar roboczy zajmują pełną szerokość telefonu.
- Dolna nawigacja pozostaje nakładką i nie zwęża sceny.

## alpha.10

- Maksymalne powiększenie zwiększone do 20× z szybszą obsługą rolki.
- Podnoszenie mapy wykonuje bezpośrednią transformację istniejącej płaszczyzny SVG.

## alpha.9

- Inspektor jest zamknięty już w początkowym HTML na każdym urządzeniu.
- Urządzenia dotykowe zawsze używają mobilnego arkusza niezależnie od szerokości viewportu.
- Próg układu nakładkowego zwiększony do 1100 px.

## alpha.8

- Panel szczegółów na telefonie działa jako zamykany arkusz od dołu.
- Panel mobilny jest domyślnie schowany i otwiera się dopiero po wybraniu elementu.
- Naprawiona globalna klasa ukrywania oraz działanie przycisku zamknięcia.

## alpha.7

- Punkty wydarzeń nie są przechwytywane przez mechanizm przeciągania.
- Kliknięcie wydarzenia niezawodnie podnosi mapę do jego wysokości.
- Przeciąganie pustego tła nadal przesuwa cały widok.

## alpha.6

- Siatka szerokości i długości geograficznej na mapie.
- Zoom pod kursorem rolką myszy oraz przesuwanie i pinch na ekranie dotykowym.
- Kliknięcie wydarzenia podnosi mapę do jego wysokości; Dopasuj przywraca podstawę.
- Stały znacznik wersji przy logo Chronizo.

## alpha.5

- Przejście do innego świata jest punktem nad wydarzeniem zamiast linią wychodzącą poza mapę.

## alpha.4

- Domyślna tekstura Ziemi osadzona na izometrycznej mapie.
- Dodawanie własnych lokalizacji przez wskazanie punktu na mapie.
- Wszystkie linie postaci są bazowo zielone; indywidualny kolor pojawia się po filtrowaniu.

## alpha.3

- Prostokątna mapa osadzona na izometrycznej płaszczyźnie.
- Niezawodny wybór pliku tekstury przez natywną etykietę pola plikowego.
- Cieńsze linie postaci; pogrubienie wyłącznie dla aktywnego filtra.
- Mniejsze punkty wydarzeń i odświeżony cache zasobów.

- Nowy interfejs mapy-drzewa z czasem na osi pionowej.
- Jeden aktywny świat i górne zakładki do przełączania rzeczywistości.
- Linie postaci, hashtagi, interaktywny inspektor i filtrowanie.
- Regiony poza mapą Ziemi nadal należące do aktywnego świata.
- World Shift jako półprzezroczysta, nowa płaszczyzna mapy.
- Kolorowe przejścia do innych światów i klikalne punkty rozgałęzienia.
- Cienka linia wstecz dla wydarzeń wspomnianych lub ujawnionych później.
- Responsywny układ komputerowy i mobilny.
# α32

- Dodano do źródeł osobną datę premiery lub wydania, niezależną od daty akcji.
- Data premiery jest zachowywana w JSON-ie i widoczna na Road oraz liście źródeł.
- Pole chronologiczne źródła otrzymało jednoznaczną nazwę „Data akcji źródła”.

# α33

- Uproszczono rodzaje źródeł do: Film, Serial, Komiks, Książka, Gra i Inne.
- Odcinek nie jest już osobnym rodzajem źródła; wydarzenia pozostają przypisane bezpośrednio do całego źródła.
- Istniejące projekty zachowują wcześniej zapisane dane bez automatycznego usuwania lub migracji.

# α34

- Naprawiono otwieranie formularza „Dodaj postać” w pustym projekcie.
- Kartoteka postaci nie zależy już od wcześniejszego otwarcia formularza wydarzenia.

# α35

- Dodano szybkie tworzenie powiązanych elementów bez opuszczania rozpoczętego formularza.
- Źródło może otrzymać jeden lub kilka światów, również utworzonych bezpośrednio podczas dodawania źródła.
- Z wydarzenia można od razu utworzyć brakujące źródło lub postać; nowy element zostaje automatycznie wybrany.
- Z formularza postaci można utworzyć i automatycznie przypisać świat pochodzenia.
- Formularze zachowują wcześniejsze wybory podczas odświeżania list powiązań.

# α60

- naprawiono właściwą przyczynę znikającego wydarzenia: obiekt kliknięcia nie jest już mylony z ID edytowanego rekordu
- poprawka obejmuje wszystkie wejścia do formularza wydarzenia: nagłówek, Road i pustą kartotekę
- analogicznie zabezpieczono wszystkie przyciski dodawania źródła

# α59

- obsługa zapisu wydarzenia jest podpinana przed pozostałymi opcjonalnymi elementami interfejsu
- dodano kontrolny znacznik gotowości formularza na potrzeby testów przeglądarkowych
- skrypt wersji otrzymał nową, niebuforowaną nazwę pliku

# α58

- naprawiono zapis wydarzenia, który mógł zamknąć formularz bez dodania rekordu
- zapis nie zależy już od informacji o klikniętym przycisku przekazywanej przez przeglądarkę
- światy wydarzenia otrzymały wyszukiwarkę; pierwszy wybór jest światem głównym, kolejne oznaczają spotkanie światów
- postacie mają jeden selektor z wyszukiwaniem po nazwie i alter ego
- osobne mylące pole „Postacie i tagi” zastąpiono jednoznacznym polem „Hashtagi”

# α57

- formularz używa krótkiej nazwy „Wydarzenie” bez sugestii zapisywania pełnego zdania
- data wydarzenia jest niezależna od relacji przed, po i równolegle
- jedno wydarzenie może mieć jednocześnie datę oraz wiele relacji do innych wydarzeń
- źródła wydarzenia wybiera się przez osobną wyszukiwarkę zamiast listy liczącej tysiące pozycji
- można przypisać wiele źródeł; pierwsze pozostaje źródłem głównym
- starsze wydarzenia z pojedynczym umiejscowieniem pozostają zgodne z nowym modelem

# α55

- 9 rekordów migracji Mini-Verse VOs osadzono bezpośrednio w aplikacji
- migracja nie zależy już od pobrania ani pamięci podręcznej paczki Multiversal VO
- licznik MVO po migracji istniejącego katalogu powinien wzrosnąć z 3273 do 3282

# α56

- naprawiono kolejność 9 źródeł Mini-Verse już zapisanych w istniejących projektach
- pozycje 1–9 serialu Meet Spidey trafiają bezpośrednio przed pozycje 10–11 zamiast na początek katalogu
- filtr MVO zachowuje nadrzędną kolejność arkusza tak samo jak widok Wszystkie

# α54

- projekty zawierające MVO automatycznie otrzymują 9 brakujących źródeł z Mini-Verse VOs
- migracja wykonuje się tylko raz i nie wymaga przywracania przycisku importu katalogu
- nowe źródła otrzymują status Nierozpoczęte, hashtag MVO, świat Earth-21642 i właściwą kolejność
- znacznik migracji zapobiega ponownemu dodaniu pozycji usuniętej później ręcznie

# α53

- usunięto z widocznego interfejsu przyciski importu Extended VO i Multiversal VO
- mechanizm katalogów pozostaje ukryty w kodzie na potrzeby przyszłych aktualizacji danych
- przycisk Zapisz JSON otrzymał jednoznaczną nazwę Eksportuj projekt i mocniejsze wyróżnienie
- Wczytaj JSON zmieniono na uniwersalne Importuj projekt

# α52

- odświeżono wersję cache paczki Multiversal VO
- ponowny import pobiera katalog 3282 pozycji wraz z 9 dodatkami z Mini-Verse VOs
- dodano test chroniący wersję adresu paczki przed ponownym użyciem starego katalogu

# α51

- każda robocza podstrona ma własną małą wyszukiwarkę
- Road przeszukuje źródła i wydarzenia wraz z postaciami, światami, miejscami i hashtagami
- wyszukiwarki Źródeł, Światów, Postaci i Wydarzeń obejmują całą kartotekę, nie tylko widoczną stronę
- rozpoczęcie wyszukiwania źródeł automatycznie wraca na pierwszą stronę wyników

# α50

- filtr Wszystkie korzysta z nadrzędnej kolejności wierszy Multiversal VO
- kolejność Extended VO jest używana tylko dla źródeł nieobecnych w MVO
- lista źródeł ma prawdziwe strony po 160 pozycji zamiast bezpowrotnego dokładania elementów
- dodano przyciski Wstecz i Dalej oraz bieżący numer strony

# α49

- Światy otrzymały własne podmenu w głównej nawigacji
- kartotekę światów usunięto z dołu Road, pozostawiając tam wyłącznie podsumowanie kroniki
- widok Światy pokazuje opis oraz liczbę powiązanych źródeł i wydarzeń
- nowy świat można dodać bezpośrednio z jego kartoteki

# α48

- każdy materiał z hashtagiem EMCU jest zawsze kapitańsko czerwony
- materiały należące wyłącznie do MVO są hulkowsko zielone
- EMCU ma pierwszeństwo koloru przy źródłach oznaczonych jednocześnie EMCU i MVO
- usunięto czerwono-fioletowy gradient wspólnych pozycji

# α47

- zwiększono nasycenie kart źródeł na każdym poziomie postępu
- EMCU ma teraz wyraźny kapitański czerwony kolor, odróżniający podgrupę od fioletowego MVO
- źródła należące do obu zbiorów otrzymują czerwono-fioletowy gradient

# α46

- porównano wszystkie dziesięć zakładek VO z głównym Multiversal VO
- dodano 9 rzeczywiście brakujących odcinków Meet Spidey and His Amazing Friends z Mini-Verse VOs
- pominięto pozorne różnice wynikające z interpunkcji, literówek, przesuniętej numeracji i łączenia części odcinków
- dodatkowe źródła zachowują własne pochodzenie, kolejność chronologiczną, świat Earth-21642 i datę premiery

# α45

- pełny audyt potwierdził kompletność paczek: 834 źródła Extended VO i 3273 źródła Multiversal VO
- nazwy i opisy światów są uzupełniane z zakładki Universe Index
- brakujące daty premier są uzupełniane z zakładki Release Order
- aktualizacja metadanych nie nadpisuje ręcznie wpisanych dat premier ani opisów światów
- zakładki Order z fragmentami czasowymi pozostają poza katalogiem źródeł i będą mogły zasilić wydarzenia

# α44

- wpisy z datą Outside of Time zachowują kolejność wierszy z właściwego arkusza
- kolejność arkusza jest przechowywana osobno dla EMCU i MVO, także po scaleniu duplikatów
- istniejące importy odzyskują numer wiersza automatycznie z klucza importu

# α43

- lista Źródła jest porządkowana według daty akcji podanej w arkuszu
- ta sama chronologia obowiązuje po filtrowaniu hashtagami EMCU i MVO
- źródła bez rozpoznawalnej daty pozostają na końcu listy

# α42

- wszystkie wcześniej zaimportowane źródła Extended VO automatycznie otrzymują hashtag EMCU
- migracja uruchamia się przy otwarciu Chronizo i nie wymaga ponownego importu
- statusy oraz ręczne zmiany istniejących źródeł pozostają nietknięte

# α41

- postać można wybrać z kartoteki i otworzyć jej własną chronologiczną drogę
- Road postaci pokazuje wyłącznie wydarzenia z jej udziałem oraz powiązane źródła
- filtrowanie postaci współpracuje z osobnymi pasami światów i trybami źródła/wydarzenia
- dodano pasek aktywnego focusu z szybkim powrotem do całej kroniki

# α40

- Road źródeł dzieli materiały na osobne poziome pasy dla każdego świata
- źródła obejmujące kilka światów trafiają do osobnego pasa Połączenie
- przygotowano widok pod komiksy ekranowych uniwersów z hashtagami EMCU/MVO

# α39

- ręcznie usunięte źródło może wrócić przy kolejnym imporcie katalogu
- przywrócona pozycja jest traktowana jak nowa i otrzymuje status Nierozpoczęte
- istniejące źródła nadal zachowują status, dane i ręcznie przypisane światy

# α38

- ponowny import nigdy nie nadpisuje statusu, tytułu, dat, typu ani światów już istniejącego źródła
- aktualizacja może jedynie dopisać pochodzenie katalogowe i brakujący hashtag EMCU/MVO
- Chronizo pamięta ręcznie usunięte pozycje i nie przywraca ich przy kolejnych aktualizacjach paczek
- ochrona działa także wtedy, gdy w przyszłości zmienią się numery wierszy w arkuszu

# α37

- dodano paczkę 3273 źródeł z zakładki Multiversal VO i hashtag #MVO
- źródła Extended VO otrzymały hashtag #EMCU
- identyczne źródło z obu kompendiów jest łączone i otrzymuje oba hashtagi
- dodano filtrowanie źródeł według hashtagów oraz wybór kolorowania według medium lub hashtagu
- nasycenie tła pokazuje postęp: nierozpoczęte, rozpoczęte i ukończone
- duże listy źródeł są renderowane porcjami, a Road ogranicza jednorazowy widok do 300 węzłów

# α36

- Dodano jednorazowy import kompletnej zakładki Extended VO do aktywnego projektu.
- Paczka zawiera 834 wiersze źródeł z nazwą, datą akcji i światem zgodnymi z arkuszem.
- Wszystkie importowane źródła otrzymują status „Nierozpoczęte”.
- Brakujące światy są tworzone automatycznie, a wpisy obejmujące kilka światów otrzymują wszystkie odpowiednie powiązania.
- Ponowne uruchomienie importu pomija już wczytane wiersze.
