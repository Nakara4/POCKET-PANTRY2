from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recipes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://nakara4.github.io"],  # Adjusted origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recipes.router)

@app.get("/")
def root():
    return {"message": "🍽️ Pocket Pantry API is live!"}
