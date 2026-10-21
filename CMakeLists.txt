cmake_minimum_required(VERSION 3.20)
project(CampusHubBackend VERSION 0.1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

find_package(Drogon CONFIG REQUIRED)
find_package(jwt-cpp CONFIG REQUIRED)

add_executable(campushub_backend src/main.cpp)
target_include_directories(campushub_backend PRIVATE include)
target_link_libraries(campushub_backend PRIVATE Drogon::Drogon jwt-cpp::jwt-cpp)
