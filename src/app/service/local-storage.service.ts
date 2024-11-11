import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  //sauvegarder les données sous une clé specifique dans le localstrage
  saveData<T>(Key: string, data: T):void {
    localStorage.setItem(Key, JSON.stringify(data));
  }


  //Récuperer les données depuis une clé spécifique dans le localStorage
  getData<T>(Key: string): T | null {
    const data = localStorage.getItem(Key);
    return data ? JSON.parse(data) : null;
  }

  //Supprimer des donées depuis une clé specifique
  removeData(Key: string):void {
    localStorage.removeItem(Key);
  }
}

