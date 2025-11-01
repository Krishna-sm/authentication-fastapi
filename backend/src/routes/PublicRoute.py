from fastapi import APIRouter

route = APIRouter(prefix="/api/v1/health")

@route.get("/")
def indexView():
    return {
        "msg":"Server is Running on My  ❤️"
    }