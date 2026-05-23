from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
import shutil
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from sqlalchemy.orm import Session
import models
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Dźwigi PL - Panel Sterowania API",
    description="Nowoczesne i bezpieczne API dla panelu sterowania.",
    version="0.1.0",
)

# Konfiguracja CORS, aby frontend w React mógł łączyć się z tym API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # W produkcji zmień na konkretną domenę, np. ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Witaj w API Panelu Sterowania Dźwigi PL!"}

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "Dzwigi PL Backend"}

@app.on_event("startup")
def startup_event():
    db = next(get_db())
    if db.query(models.Crane).count() == 0:
        for crane_data in cranes_db:
            crane = models.Crane(**crane_data)
            db.add(crane)
        db.commit()

cranes_db = [
  {
    "id": "ltm-1200",
    "name": "LTM 1200-5.1",
    "capacity": "200 t",
    "reach": "72 m + 16 m",
    "image": "images/ltm-1200.jpg",
    "pdf": "LTM_1200-5.1.pdf",
    "featured": True
  },
  {
    "id": "ltm-1160",
    "name": "LTM 1160-5.1",
    "capacity": "160 t",
    "reach": "62 m + 22 m",
    "image": "images/ltm-1160.jpg",
    "pdf": "LiebherrLTM1160-5.1.pdf",
    "featured": True
  },
  {
    "id": "ltm-1130",
    "name": "LTM 1130-5.1",
    "capacity": "130 t",
    "reach": "60 m + 19 m",
    "image": "images/ltm-1130.jpg",
    "pdf": "LTM_1130-5.1.pdf",
    "featured": True
  },
  {
    "id": "ltm-1100",
    "name": "LTM 1100-4.1",
    "capacity": "100 t",
    "reach": "52 m + 19 m",
    "image": "images/ltm-1100.jpg",
    "pdf": "LTM 1100-4.1.pdf",
    "featured": False
  },
  {
    "id": "ltm-1095",
    "name": "LTM 1095-5.1",
    "capacity": "95 t",
    "reach": "58 m + 26 m",
    "image": "images/ltm-1095.jpg",
    "pdf": "LTM 1095-5.1.pdf",
    "featured": False
  },
  {
    "id": "ltm-1090",
    "name": "LTM 1090-4.1",
    "capacity": "90 t",
    "reach": "50 m + 26 m",
    "image": "images/ltm-1090.jpg",
    "pdf": "LTM 1090-4.1.pdf",
    "featured": False
  },
  {
    "id": "ltm-1070",
    "name": "LTM 1070-4.1",
    "capacity": "70 t",
    "reach": "50 m + 17 m",
    "image": "images/ltm-1070.jpg",
    "pdf": "LTM 1070-4.1.pdf",
    "featured": False
  },
  {
    "id": "ltm-1060",
    "name": "LTM 1060/2",
    "capacity": "60 t",
    "reach": "42 m + 18 m",
    "image": "images/ltm-1060.png",
    "pdf": "LTM-1060-2.pdf",
    "featured": False
  },
  {
    "id": "ltm-1055",
    "name": "LTM 1055-3.2",
    "capacity": "55 t",
    "reach": "40 m + 16 m",
    "image": "images/ltm-1055.jpg",
    "pdf": "LTM 1055-3.2.pdf",
    "featured": False
  },
  {
    "id": "ltm-1050",
    "name": "LTM 1050-3.1",
    "capacity": "50 t",
    "reach": "38 m + 16 m",
    "image": "images/ltm-1050.jpg",
    "pdf": "LTM 1050-3.1.pdf",
    "featured": False
  },
  {
    "id": "ltm-1040",
    "name": "LTM 1040-2.1",
    "capacity": "40 t",
    "reach": "35 m + 10 m",
    "image": "images/ltm-1040.jpg",
    "pdf": "LTM 1040-2.1.pdf",
    "featured": False
  },
  {
    "id": "ltm-1030",
    "name": "LTM 1030-2.1",
    "capacity": "35 t",
    "reach": "30 m + 15 m",
    "image": "images/ltm-1030.jpg",
    "pdf": "LTM 1030-2.1.pdf",
    "featured": False
  }
]

class CraneUpdate(BaseModel):
    id: Optional[str] = None
    name: str
    capacity: str
    reach: str
    featured: bool
    pdf: str
    image: str = "images/ltm-placeholder.jpg"

class OrderCreate(BaseModel):
    crane_id: str
    crane_name: str
    customer_name: str
    phone: str
    email: Optional[str] = None
    rental_date: str
    details: Optional[str] = None

@app.get("/api/cranes")
def get_cranes(db: Session = Depends(get_db)):
    return db.query(models.Crane).all()

@app.post("/api/cranes")
def create_crane(crane_data: CraneUpdate, db: Session = Depends(get_db)):
    # Jeśli id nie podane, generuj proste id z nazwy
    crane_id = crane_data.id or crane_data.name.lower().replace(" ", "-").replace("/", "-")
    
    new_crane = models.Crane(
        id=crane_id,
        name=crane_data.name,
        capacity=crane_data.capacity,
        reach=crane_data.reach,
        image=crane_data.image,
        pdf=crane_data.pdf,
        featured=crane_data.featured
    )
    db.add(new_crane)
    db.commit()
    db.refresh(new_crane)
    return {"message": "Dźwig dodany", "crane": new_crane}

@app.put("/api/cranes/{crane_id}")
def update_crane(crane_id: str, crane_data: CraneUpdate, db: Session = Depends(get_db)):
    crane = db.query(models.Crane).filter(models.Crane.id == crane_id).first()
    if not crane:
        raise HTTPException(status_code=404, detail="Nie znaleziono dźwigu")
    
    crane.name = crane_data.name
    crane.capacity = crane_data.capacity
    crane.reach = crane_data.reach
    crane.featured = crane_data.featured
    crane.pdf = crane_data.pdf
    
    db.commit()
    db.refresh(crane)
    return {"message": "Dźwig zaktualizowany", "crane": crane}

@app.delete("/api/cranes/{crane_id}")
def delete_crane(crane_id: str, db: Session = Depends(get_db)):
    crane = db.query(models.Crane).filter(models.Crane.id == crane_id).first()
    if not crane:
        raise HTTPException(status_code=404, detail="Nie znaleziono dźwigu")
    db.delete(crane)
    db.commit()
    return {"message": "Dźwig usunięty"}

@app.get("/api/orders")
def get_orders(db: Session = Depends(get_db)):
    return db.query(models.Order).order_by(models.Order.created_at.desc()).all()

@app.post("/api/orders")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    new_order = models.Order(
        id=f"ord-{int(datetime.now().timestamp())}",
        crane_id=order.crane_id,
        crane_name=order.crane_name,
        customer_name=order.customer_name,
        phone=order.phone,
        email=order.email,
        rental_date=order.rental_date,
        details=order.details,
        status="Nowe",
        created_at=datetime.now().isoformat()
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return {"message": "Zamówienie przyjęte", "order": new_order}

@app.get("/api/messages")
def get_messages(db: Session = Depends(get_db)):
    return db.query(models.Message).order_by(models.Message.created_at.desc()).all()

@app.post("/api/upload/pdf")
def upload_pdf(file: UploadFile = File(...)):
    # Ścieżka do folderu public/pdfs we frontendzie
    target_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "pdfs")
    os.makedirs(target_dir, exist_ok=True)
    
    file_path = os.path.join(target_dir, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {"filename": file.filename, "message": "Plik zaktualizowany pomyślnie"}

