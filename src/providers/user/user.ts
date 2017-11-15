import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../models/usuario';

@Injectable()
export class UserProvider {
  private usuario: Usuario;

  constructor(public storage: Storage) {
  }

  init(){
    this.storage.get('currentuser').then((val) => {
      this.usuario = new Usuario(val.nombre, val.avatar, val.email, val.uid, val.moneda);
    });
  }
  
  getUser(){
    return this.usuario;
  }
}
