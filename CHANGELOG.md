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
