#include <drogon/drogon.h>
#include <functional>
#include <utility>

int main()
{
    drogon::app().registerHandler(
        "/api/v1/health",
        [](const drogon::HttpRequestPtr&,
           std::function<void(const drogon::HttpResponsePtr&)>&& callback) {
            Json::Value body;
            body["status"] = "ok";
            body["service"] = "CampusHub";
            callback(drogon::HttpResponse::newHttpJsonResponse(body));
        },
        {drogon::Get});

    drogon::app().addListener("127.0.0.1", 8080).run();
}
