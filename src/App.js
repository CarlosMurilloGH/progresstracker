import React,{useEffect, useState} from 'react';
import { app } from './fb';
import './App.css';

const App =()=> {

  const [docus,setDocus]=useState([]);


  const submitHandler = async (e) => {
    e.preventDefault();
    const labelfecha = e.target.fecha.value;
    const labelcadera=e.target.cadera.value;
    const labelcintura=e.target.cintura.value;
    const labelumbilical=e.target.umbilical.value;
    const labelbrazo=e.target.brazo.value;
    const labeltoracica=e.target.toracica.value;
    const labelpierna=e.target.pierna.value;
    const labelpeso=e.target.peso.value;

    if (!labelfecha) {
      alert("coloca una fecha");
      return;
    }
    const coleccionRef = app.firestore().collection("medidas");
    const docu = await coleccionRef
      .doc(labelfecha)
      .set({ 
        fecha:  labelfecha,
        medidacadera:Number (labelcadera),
        medidacintura:Number (labelcintura),
        medidaumbilical:Number (labelumbilical),
        medidabrazo:Number (labelbrazo),
        medidatoracica:Number (labeltoracica),
        medidapierna:Number (labelpierna),
        peso:Number (labelpeso),
      });
    window.location = "/";

  };

  useEffect(async()=>{
    const docuList=await app.firestore().collection("medidas").get();
    setDocus(docuList.docs.map((doc)=>doc.data() ));
  },[])

  return (
    <div className="App">
      <h1>App de trackeo de progreso</h1>
      <div className="formcontainer">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label >¿Qué dia es?</label>
            <input type="date" className="form-control" name="fecha"/>
          </div>

          <div className="form-group">
            <label >Cadera</label>
            <input type="number" className="form-control" placeholder="Cadera" name="cadera"/>
          </div>

          <div className="form-group">
            <label >Cintura</label>
            <input type="number" className="form-control" placeholder="Cintura" name="cintura"/>
          </div>

          <div className="form-group">
            <label >Umbilical</label>
            <input type="number" className="form-control" placeholder="Umbilical" name="umbilical"/>
          </div>

          <div className="form-group">
            <label >Brazo</label>
            <input type="number" className="form-control" placeholder="Brazo" name="brazo"/>
          </div>

          <div className="form-group">
            <label >Toracica</label>
            <input type="number" className="form-control" placeholder="Toracica" name="toracica"/>
          </div>

          <div className="form-group">
            <label >Pierna</label>
            <input type="number" className="form-control" placeholder="Pierna" name="pierna"/>
          </div>

          <div className="form-group">
            <label >Peso</label>
            <input type="number" className="form-control" placeholder="lbs" name="peso"/>
          </div>

 
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>

      <hr></hr>
      <div>
        <div>
          {
            docus.map((doc)=>{
              return(
                <div>
                  <p>Fecha:{doc.fecha}</p>
                  <p>Cadera:{doc.medidacadera}</p>
                  <p>Cintura:{doc.medidacintura}</p>
                  <p>Umbilical:{doc.medidaumbilical}</p>
                  <p>Brazo:{doc.medidabrazo}</p>
                  <p>Toracica:{doc.medidatoracica}</p>
                  <p>Pierna:{doc.medidapierna}</p>
                  <p>Peso:{doc.peso}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;


