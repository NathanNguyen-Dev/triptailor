from app.main import app

# Import and include routers here
# from routers import example_router
# app.include_router(example_router)

@app.get("/")
def read_root():
    return {"message": "triptailor backend is running"} 