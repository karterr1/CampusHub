# CampusHub Backend

Стартовый backend студенческой новостной платформы: C++20, Drogon, jwt-cpp.
В дальнейшем: PostgreSQL и интеграция со Strapi Community.

## Сборка

Требуются компилятор C++20, CMake >= 3.20, установленные Drogon и jwt-cpp
с CMake package config. Зависимости не скачиваются автоматически.

```bash
cmake -S . -B build
cmake --build build -j2
./build/campushub_backend
```

При установке библиотек в нестандартный каталог передайте
`-DCMAKE_PREFIX_PATH=/путь/к/префиксу` при конфигурации CMake.

## Проверка

В другом терминале:

```bash
curl --fail http://127.0.0.1:8080/api/v1/health
```

Ожидаемый JSON: `{"status":"ok","service":"CampusHub"}`.
Сервер слушает локальный адрес 127.0.0.1:8080. Остановка: Ctrl+C.

`src/` — исходники, `include/` — заголовки, `config/` — будущие настройки.
JWT пока только подключён к сборке; авторизация ещё не реализована.
