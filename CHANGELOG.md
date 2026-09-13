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

- Nowy interfejs mapy-drzewa z czasem na osi pionowej.
- Jeden aktywny świat i górne zakładki do przełączania rzeczywistości.
- Linie postaci, hashtagi, interaktywny inspektor i filtrowanie.
- Regiony poza mapą Ziemi nadal należące do aktywnego świata.
- World Shift jako półprzezroczysta, nowa płaszczyzna mapy.
- Kolorowe przejścia do innych światów i klikalne punkty rozgałęzienia.
- Cienka linia wstecz dla wydarzeń wspomnianych lub ujawnionych później.
- Responsywny układ komputerowy i mobilny.
