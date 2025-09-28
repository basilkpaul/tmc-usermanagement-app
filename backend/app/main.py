from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud, db

models.Base.metadata.create_all(bind=db.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/users/", response_model=list[schemas.User])
def read_users(db_session: Session = Depends(db.get_db)):
    return crud.get_users(db_session)


@app.post("/users/create", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db_session: Session = Depends(db.get_db)):
    return crud.create_user(db_session, user)

@app.delete("/user")
def delete_user(user_id: int, db_session: Session = Depends(db.get_db)):
    db_user = crud.get_user(db_session, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    crud.delete_user(db_session, user_id)
    return {"message": "User deleted"}