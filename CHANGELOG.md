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
