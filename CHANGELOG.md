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
